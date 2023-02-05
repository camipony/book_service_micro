const mongoose = require('mongoose');

const book = new mongoose.Schema(
    {
        codigo: {
            type: String,
            unique: true,
            required: true
        },
        titulo: { type: String, default: "" },
        descripcion: { type: String, default: "" },
        portada: { type: String, default: 'https://i.postimg.cc/XJ9Kyhb9/libros.png' },
        imagenes: [], // -> Recibe las ruta
        precio: {
            type: Number,
            default: 0
        },
        estado: { type: String, default: "disponible" },
        categoria: [], // -> Recibe el id de la colecion category
        calificaciones: [], // -> Recibe {usuario: id, calificacion: 1-5, comentario: "", fecha_crecion: Now()}
        formato: [],  // -> Recibe el id {formato: '', idiomas: [{idioma:'', cantidad_stock: 0}...] }
        autores: [], // -> Recibe el id de la colecion Autor
        proveedores: [], // -> recibe el id de la colecion Provider
        fecha_publicacion: Date,
        fecha_actualizacion: {
            type: Date,
            default: new Date().toISOString()
        },
        fecha_creacion: {
            type: Date,
            default: new Date().toISOString()
        }
    },
    {
        versionKey: false,
        timestamps: false
    }
)

module.exports = mongoose.model('book', book)