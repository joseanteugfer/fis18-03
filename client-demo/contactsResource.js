var urljoin = require('url-join');
var request = require('request-promise-native').defaults({json: true});
var CommandFactory = require('hystrixjs').commandFactory;
var ordenesPagoServer = (process.env.ORDENES_URL || 'http://localhost:3000/api/v1');
var ordenesPagoKey = (process.env.ORDENES_APIKEY || 'aaf88607d0-52ad-41ae-887c-34c029d48242');

function ordenesPagoResource(url) {
    return urljoin(ordenesPagoServer, url, '?apikey='+ordenesPagoKey);
}

function getAllOrdenesPagoBase() {
    var url = ordenesPagoResource("/ordenesPago");
    console.log(url);
    return request.get(url);
}


var getAllOrdenesPagoCommand = CommandFactory.getOrCreate("Get OrdenesPago")
    .run(getAllOrdenesPagoBase)
    .timeout(100)
    .build()

function getAllOrdenesPago() {
    return getAllOrdenesPagoCommand.execute();
}

module.exports = {
    getAllOrdenesPago
}