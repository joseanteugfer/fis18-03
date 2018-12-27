var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var OrdenPago = require('./ordenesPago');
var ApiKey = require('./apikeys');

var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

const ORDENES_APP_DIR = "/dist/FIS18-03";
var BASE_API_PATH = "/api/v1";



passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({ apikey: apikey }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown apikey ' + apikey });
            } else {
                console.log("Logged as: " + user.user);
                return done(null, user);
            }
        });
    }
));

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use(express.static(path.join(__dirname, ORDENES_APP_DIR)));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, ORDENES_APP_DIR, '/index.html'));
});


app.get(BASE_API_PATH + "/ordenesPago",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        OrdenPago.find((err, ordenesPago) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                res.send(ordenesPago.map((orden) => {
                    return orden.cleanup();
                }));
            }
        });
    }
);

app.get(BASE_API_PATH + "/ordenPago/:idProyecto", (req, res) => {
    // Get orden desde Proyecto
    var name = req.params.idfactura;
    console.log(Date() + " - GET /ordenPago/" + name);

    db.find({ "idProyecto": name }, (err, ordenPago) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            res.send(ordenPago.map((orden) => {
                delete orden._id;
                return orden;
            })[0]);
        }
    });
});

app.get(BASE_API_PATH + "/ordenPago/:idfactura", (req, res) => {
    // Get a single orden desde Factura
    var name = req.params.idfactura;
    console.log(Date() + " - GET /ordenPago/" + name);

    db.find({ "idfactura": name }, (err, ordenPago) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (ordenPago.length > 1) {
                console.warn("Incosistent DB: duplicated name");
            }
            res.send(ordenPago.map((orden) => {
                delete orden._id;
                return orden;
            })[0]);
        }
    });
});

app.get(BASE_API_PATH + "/ordenPago/:idcomision", (req, res) => {
    // Get a single orden desde Comsiiones de servicios
    var name = req.params.idcomision;
    console.log(Date() + " - GET /ordenPago/" + name);

    db.find({ "idcomservicio": name }, (err, ordenPago) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (ordenPago.length > 1) {
                console.warn("Incosistent DB: duplicated name");
            }
            res.send(ordenPago.map((orden) => {
                delete orden._id;
                return orden;
            })[0]);
        }
    });
});



app.post(BASE_API_PATH + "/ordenesPago", (req, res) => {
    // Create a new orden
    console.log(Date() + " - POST /ordenesPago");
    var orden = req.body;
    OrdenPago.create(orden, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.put(BASE_API_PATH + "/ordenesPago", (req, res) => {
    // Forbidden
    console.log(Date() + " - PUT /ordenesPago");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/ordenesPago", (req, res) => {
    // Remove all ordenesPago
    console.log(Date() + " - DELETE /ordenesPago");
    db.remove({});
    res.sendStatus(200);
});


app.post(BASE_API_PATH + "/ordenesPago/:name", (req, res) => {
    // Forbidden
    console.log(Date() + " - POST /ordenesPago");
    res.sendStatus(405);
});




app.delete(BASE_API_PATH + "/ordenesPago/:name", (req, res) => {
    // Delete a single orden
    var name = req.params.name;
    console.log(Date() + " - DELETE /ordenesPago/" + name);

    db.remove({ "name": name }, {}, (err, numRemoved) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (numRemoved > 1) {
                console.warn("Incosistent DB: duplicated name");
            } else if (numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});
app.delete(BASE_API_PATH + "/ordenesPago/:name", (req, res) => {
    // Delete a single orden
    var name = req.params.name;
    console.log(Date() + " - DELETE /ordenesPago/" + name);

    db.remove({ "name": name }, {}, (err, numRemoved) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (numRemoved > 1) {
                console.warn("Incosistent DB: duplicated name");
            } else if (numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

app.put(BASE_API_PATH + "/ordenesPago/:name", (req, res) => {
    // Update orden
    var name = req.params.name;
    var updatedOrdenPago = req.body;
    console.log(Date() + " - PUT /ordenesPago/" + name);

    if (name != updatedOrdenPago.name) {
        res.sendStatus(409);
        return;
    }

    db.update({ "name": name }, updatedOrdenPago, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (numUpdated > 1) {
                console.warn("Incosistent DB: duplicated name");
            } else if (numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

module.exports.app = app;