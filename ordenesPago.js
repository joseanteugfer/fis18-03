var mongoose = require('mongoose');

var ordenSchema = new mongoose.Schema({
    name: String,
    phone: Number
});

ordenSchema.methods.cleanup = function() {
    return {name: this.name, phone: this.phone};
}

var OrdenPago = mongoose.model('OrdenPago', ordenSchema);

module.exports = OrdenPago;