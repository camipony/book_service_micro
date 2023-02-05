const mongoose = require('mongoose');

const provider = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        telefono: {
            type: String
        },
        ubicacion: {
            type: String
        },
        e_mail: {
            type: String
        }
    }
)

module.exports = mongoose.model('provider', provider)