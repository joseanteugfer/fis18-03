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


app.delete(BASE_API_PATH + "/ordenesPago",
    //passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        console.log(Date() + " - DELETE /ordenesPago");

        OrdenPago.delete((err, ordenesPago) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            }
        });

    }
);



app.get(BASE_API_PATH + "/ordenesPago",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        console.log(Date() + " - GET /ordenesPago");

        OrdenPago.find((err, ordenesPago) => {
            if (err) {
                console.error("Error accessing database");
                res.sendStatus(500);
            } else {
                if (ordenesPago.length == 0) {
                    res.sendStatus(404);
                } else {
                    res.send(ordenesPago.map((orden) => {
                        return orden.cleanup();
                    }));
                }
            }
        });
    }
);

app.get(BASE_API_PATH + "/ordenesPago/idproyecto/:idproyecto",
    (req, res) => {
        // Get orden desde Proyecto
        var name = req.params.idproyecto;
        console.log(Date() + " - GET /ordenesPago/idproyecto" + name);

        OrdenPago.find({ "idproyecto": name }, (err, ordenPago) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (ordenPago.length == 0) {
                    res.sendStatus(404);
                } else {
                    return res.send(ordenPago[0].cleanup());
                    //return orden.cleanup();
                }
            }
        });
    });

app.get(BASE_API_PATH + "/ordenesPago/idfactura/:idfactura",
    (req, res) => {
        // Get orden desde Proyecto
        var name = req.params.idfactura;
        console.log(Date() + " - GET /ordenesPago/idfactura" + name);

        OrdenPago.find({ "idfactura": name }, (err, ordenPago) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (ordenPago.length == 0) {
                    res.sendStatus(404);
                } else {
                    return res.send(ordenPago[0].cleanup());
                }
            }
        });
    });

app.get(BASE_API_PATH + "/ordenesPago/idcomservicios/:idcomservicios",
    (req, res) => {
        // Get orden desde Proyecto
        var name = req.params.idcomservicios;
        console.log(Date() + " - GET /ordenesPago/idcomservicios/idcomservicios" + name);

        OrdenPago.find({ "idcomservicios": name }, (err, ordenPago) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            } else {
                if (ordenPago.length == 0) {
                    res.sendStatus(404);
                } else {
                    return res.send(ordenPago[0].cleanup());
                }
            }
        });
    });





app.post(BASE_API_PATH + "/ordenesPago",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
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


app.delete(BASE_API_PATH + "/ordenesPago/idcomservicio/:idcomservicio", (req, res) => {
    // Delete a single orden
    var name = req.params.idcomservicio;
    console.log(Date() + " - DELETE /ordenesPago/idcomservicio" + name);

    OrdenPago.findOneAndDelete({ "idcomservicios": name }, {}, (err, numRemoved) => {
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


app.delete(BASE_API_PATH + "/ordenesPago/idfactura/:idfactura",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Delete a single orden
        var name = req.params.idfactura;
        console.log(Date() + " - DELETE /ordenesPago/idfactura" + name);

        OrdenPago.findOneAndDelete({ "idfactura": name }, {}, (err, numRemoved) => {
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

app.put(BASE_API_PATH + "/ordenesPago/idproyecto/:idproyecto", 
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        // Update orden
        var name = req.params.idproyecto;
        var updatedOrdenPago = req.body;
        console.log(Date() + " - PUT /ordenesPago/idproyecto" + name);

        if (name != updatedOrdenPago.idproyecto) {
            res.sendStatus(409);
            return;
        }

        OrdenPago.update({ "idproyecto": name }, updatedOrdenPago, (err, numUpdated) => {
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