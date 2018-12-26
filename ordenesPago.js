var mongoose = require('mongoose');

var ordenSchema = new mongoose.Schema({
    idProyecto: String,
    idFactura: String,
    idComServicios: String,
    concepto: String,
    cantidad: number,
    beneficiario: string,
    iban: string
});

ordenSchema.methods.cleanup = function() {
    return {
        idProyecto: this.idProyecto,
        idFactura: this.idFactura,
        idComServicios: this.idComServicios,
        concepto: this.concepto,
        cantidad: this.cantidad,
        beneficiario: this.beneficiario,
        iban: this.iban
    };
}

var OrdenPago = mongoose.model('OrdenPago', ordenSchema);

module.exports = OrdenPago;