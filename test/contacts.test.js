var chai = require('chai');
var mongoose = require('mongoose');
var OrdenPago = require('../ordenesPago');
var expect = chai.expect;


describe('OrdenPago DB connection', () => {

    before((done) => {
        var dbUrl = (process.env.DB || 'mongodb://localhost/test');

        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            done();
        });
    });

    beforeEach((done) => {
        OrdenPago.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a orden in the DB', (done) => {
        var orden = new OrdenPago({ "idproyecto": "01", "idfactura":"001","idcomservcios":"001",
        "concepto":"prueba","cantidad":50,"beneficiario":"Fulano","iba":"123456789","estado":"aceptado" });
        orden.save((err, orden) => {
            expect(err).is.not.null;
            OrdenPago.find({}, (err, ordenesPago) => {
                expect(ordenesPago).to.have.lengthOf(1);
                // More "expects" could be done
                done();
            });
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
})