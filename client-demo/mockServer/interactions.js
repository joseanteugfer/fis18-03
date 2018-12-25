const ONE_CONTACT_BODY = [{ name: 'Foo', phone: 777 }]

module.exports = {
    getOrdenPagoList: {
        state: 'it has one orden',
        uponReceiving: 'a request to retrieve ordenesPago list',
        withRequest: {
            method: 'GET',
            path: '/api/v1/ordenesPago'
        },
        willRespondWith: {
            status: 200,
            body: ONE_CONTACT_BODY
        }
    }
}