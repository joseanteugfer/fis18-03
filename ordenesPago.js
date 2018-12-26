var mongoose = require('mongoose');

var ordenSchema = new mongoose.Schema({
    idproyecto: String,
    idfactura: String,
    idcomservicios: String,
    concepto: String,
    cantidad: number,
    beneficiario: string,
    iban: string
});

ordenSchema.methods.cleanup = function() {
    return {
        idproyecto: this.idproyecto,
        idfactura: this.idfactura,
        idcomservicios: this.idcomservicios,
        concepto: this.concepto,
        cantidad: this.cantidad,
        beneficiario: this.beneficiario,
        iban: this.iban
    };
}

var OrdenPago = mongoose.model('OrdenPago', ordenSchema);

module.exports = OrdenPago;