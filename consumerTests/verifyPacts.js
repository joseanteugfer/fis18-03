const pact = require('@pact-foundation/pact-node')
const path = require('path')
const app = require('../server').app;
const sinon = require('sinon');
var OrdenPago = require('../ordenesPago');

var mongoose = require('mongoose');
var ApiKey = require('../apikeys');
var port = (process.env.PORT || 3000);

const opts = {
    providerBaseUrl: 'http://localhost:3000', // where your service will be running during the test, either staging or localhost on CI
    providerStatesSetupUrl: 'http://localhost:3000/test/setup', // the url to call to set up states
    pactUrls: ['http://localhost:8080/pacts/provider/OrdenPagoService/consumer/client/latest'], // the pacts to test against
    customProviderHeaders: ['apikey: test']
}

app.post('/test/setup', (req, res) => {
    const state = req.body.state
    console.log (req.body)
    switch (state) {
      case 'it has one orden':
        var orden = { name: 'Foo', phone: 777 };
        OrdenPago.deleteMany({}, (err) => {
            OrdenPago.create(orden, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        })
        break
    default:
        break
    }
    res.end()
});

console.log("Starting API server...");
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(port);
    console.log("Server ready!");


    var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
    ApiKeyStub.yields(null, new ApiKey({user: "test"}));
       
    pact.verifyPacts(opts).then(() => {
        console.log('success')
        process.exit(0)
    }).catch((error) => {
        console.log('failed', error)
        process.exit(1)
    });
});