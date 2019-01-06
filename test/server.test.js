var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var OrdenPago = require('../ordenesPago');
var ApiKey = require('../apikeys');
var expect = chai.expect;

chai.use(chaiHttp);

describe('OrdenesPago API', () => {

    before(() => {
        var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
        ApiKeyStub.yields(null, new ApiKey({user: "cfedb422-7a15-4354-be01-342aef99125dt"}));    
    })

    it('hola mundo de prueba', (done) => {
        var x = 3;
        var y = 5;

        var resultado = x + y;

        expect(resultado).to.equal(8);
        done();
    });


    describe('GET /', () => {
        it('should return HTML', (done) => {
            chai.request(server.app)
                .get('/')
                .query({apikey: "cfedb422-7a15-4354-be01-342aef99125d"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });        
        });
    });

    describe('GET /ordenesPago', () => {
        var orden = new OrdenPago({"idproyecto": "001", "idfactura": "001", "idcomservicios": "001", "concepto": "viajes", "cantidad":123, "beneficiario": "Jose Juan", "iban": "653567461", "estado": "aceptado"});
        var ordenMock = sinon.mock(orden);
        ordenMock.expects('cleanup').returns({"idproyecto": "001", "idfactura": "001", "idcomservicios": "001", "concepto": "viajes", "cantidad":123, "beneficiario": "Jose Juan", "iban": "653567461", "estado": "aceptado"});

        var OrdenPagoStub = sinon.stub(OrdenPago, 'find');
        OrdenPagoStub.yields(null, [orden]);

        it('should return all ordenesPago', (done) => {
            chai.request(server.app)
                .get('/api/v1/ordenesPago')
                .query({apikey: "cfedb422-7a15-4354-be01-342aef99125d"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    ordenMock.verify();
                    done();
                });  
        });
    });

    describe('POST /ordenesPago', () => {
        it('should create a new orden', (done) => {
            var orden = {"idproyecto": "001", "idfactura": "001", "idcomservicios": "001", "concepto": "viajes", "cantidad":123, "beneficiario": "Jose Juan", "iban": "653567461", "estado": "aceptado"};
            var dbMock = sinon.mock(OrdenPago);
            dbMock.expects('create').withArgs(orden).yields(null);
    
            chai.request(server.app)
                .post('/api/v1/ordenesPago')
                .query({apikey: "cfedb422-7a15-4354-be01-342aef99125d"})
                .send(orden)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    dbMock.verify();
                    done();
                });  

        });
    });    

    describe('POST /ordenesPago', () => {
        it('should return 500 if fails', (done) => {
            var orden = {"idproyecto": "001", "idfactura": "001", "idcomservicios": "001", "concepto": "viajes", "cantidad":123, "beneficiario": "Jose Juan", "iban": "653567461", "estado": "aceptado"};
            var dbMock = sinon.mock(OrdenPago);
            dbMock.expects('create').withArgs(orden).yields(true);
    
            chai.request(server.app)
                .post('/api/v1/ordenesPago')
                .query({apikey: "cfedb422-7a15-4354-be01-342aef99125d"})
                .send(orden)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });  

        });
    });    

});