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
        ApiKeyStub.yields(null, new ApiKey({user: "test"}));    
    })

    //Prueba de GET a la Raiz
    describe('GET /', () => {
        it('should return HTML', (done) => {
            chai.request(server.app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });        
        });
    });

    //Prueba de  GET para obtener ordenes
    describe('GET /ordenesPago', () => {
        var orden = new OrdenPago({"idproyecto": "01", "idfactura":"001","idcomservcios":"001",
        "concepto":"prueba","cantidad":50,"beneficiario":"Fulano","iba":"123456789","estado":"aceptado"});
        var ordenMock = sinon.mock(orden);
        ordenMock.expects('cleanup').returns({"idproyecto": "01", "idfactura":"001","idcomservcios":"001",
        "concepto":"prueba","cantidad":50,"beneficiario":"Fulano","iba":"123456789","estado":"aceptado"});

        var OrdenPagoStub = sinon.stub(OrdenPago, 'find');
        OrdenPagoStub.yields(null, [orden]);

        it('should return all ordenesPago', (done) => {
            chai.request(server.app)
                .get('/api/v1/ordenesPago')
                .query({apikey: "test"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    ordenMock.verify();
                    done();
                });  
        });
    });

    //Prueba de post para crear una orden
    describe('POST /ordenesPago', () => {
        it('should create a new orden', (done) => {
            var orden = {"idproyecto": "01", "idfactura":"001","idcomservcios":"001",
            "concepto":"prueba","cantidad":50,"beneficiario":"Fulano","iba":"123456789","estado":"aceptado"};
            var dbMock = sinon.mock(OrdenPago);
            dbMock.expects('create').withArgs(orden).yields(null);
            chai.request(server.app)
                .post('/api/v1/ordenesPago')
                .set('content-type', 'application/json')
                .query({apikey: "test"})
                .send(orden)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    dbMock.verify();
                    done();
                });  

        });
    });    

    //Prueba de POST para que retorna codigo de estado 500 si falla
    describe('POST /ordenesPago', () => {
        it('should return 500 if fails', (done) => {
            var orden = {"idproyecto": "01", "idfactura":"001","idcomservcios":"001",
            "concepto":"prueba","cantidad":50,"beneficiario":"Fulano","iba":"123456789","estado":"aceptado"};
            var dbMock = sinon.mock(OrdenPago);
            dbMock.expects('create').withArgs(orden).yields(true);
    
            chai.request(server.app)
                .post('/api/v1/ordenesPago')
                .send(orden)
                .query({apikey: "test"})
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });  

        });
    });
});