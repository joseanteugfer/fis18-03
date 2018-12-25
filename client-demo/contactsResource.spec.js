const chai = require('chai')
chai.use(require('chai-things'));
const provider = require('./mockServer/provider')
const ordenesPagoResource = require('./ordenesPagoResource')
const interactions = require('./mockServer/interactions');

const expect = chai.expect

describe('ordenesPago api', () => {
    before(() => provider.setup());

    after(() => provider.finalize());
    
    afterEach(() => provider.verify());

    describe('#getAllOrdenesPago', () => {
        before(done => {
            provider.addInteraction(interactions.getOrdenPagoList)
                .then(() => {
                    done();
                })
        });

        it('should get orden list from server', (done) => {
            ordenesPagoResource.getAllOrdenesPago()
              .then((ordenesPago) => {
                expect(ordenesPago).to.have.lengthOf(1);
                expect(ordenesPago).to.contain.an.item.with.property('name', 'Foo');
                expect(ordenesPago).to.contain.an.item.with.property('phone', 777);
                done();
              }, done);
        }) 
    })
})