var mongoose = require('mongoose');

var ordenSchema = new mongoose.Schema({
    //Seguridad para no crear ordenes de pago con campos nulo
    idproyecto: {
        type: String,
        required: 'El idproyecto no puede estar vacio',
        unique: true
    },
    idfactura: {
        type: String,
        required: 'El idfactura no puede estar vacio',
        unique: true
    },
    idcomservicios: {
        type: String,
        required: 'El idcomservicios no puede estar vacio',
        unique: true
    },
    concepto: {
        type: String,
        required: 'El concepto no puede estar vacio',
        unique: true
    },
    cantidad: {
        type: Number,
        required: 'La cantidad no puede estar vacia'
    },
    beneficiario: {
        type: String,
        required: 'El beneficiario no puede estar vacio'
    },
    iban: {
        type: String,
        required: 'El iban no puede estar vacio',
        unique: true
    },
    estado: {
        type: String,
        required: 'El iban no puede estar vacio'
    }
});

ordenSchema.methods.cleanup = function() {
    return {
        idproyecto: this.idproyecto,
        idfactura: this.idfactura,
        idcomservicios: this.idcomservicios,
        concepto: this.concepto,
        cantidad: this.cantidad,
        beneficiario: this.beneficiario,
        iban: this.iban,
        estado: this.estado
    };
}

var OrdenPago = mongoose.model('OrdenPago', ordenSchema);

module.exports = OrdenPago;