const mongoose = require('mongoose');

const category = new mongoose.Schema(
    {
        categoria: {
            type: String,
            unique: true,
        }
    }
)

module.exports = mongoose.model('category', category)