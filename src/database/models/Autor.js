const mongoose = require('mongoose');

const autor = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        pseudonimo: {
            type: String
        }
    }
)

module.exports = mongoose.model('autor', autor)