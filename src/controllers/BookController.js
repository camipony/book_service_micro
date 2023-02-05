const book = require('../database/models/Book');
const category = require('../database/models/Category');

const get_books = async (req, res) => {
    try {
        book.find({}, (err, docs) => {
            if(err){
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return
            }

            res.json({
                book:docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const get_book = async (req, res) => {
    try {
        const codigo = req.params;
        book.findOne(codigo, (err, docs) => {
            if(err){
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return
            }
            res.json({
                book: docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const add_book = async (req, res) => {
    try {
        const datos = req.body;
        book.create(
            datos,
            (err, docs) => {
                if( err ){
                    res.status(400).json({
                        msg: "Ha ocurrido un error",
                        error: err
                    })
                    return
                }
                res.status(201).json({
                    msg: "Libro agregado con exito",
                    data: docs
                })
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const change_cover = async (req, res) => {
    try {
        const codigo = req.params;
        const portada = req.urlFile;
        book.findOne(codigo, (err, docs) => {
            if(err){
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return
            }
            docs.portada = portada
            docs.save((error, docs) => {
                if(error){
                    res.status(400).json({
                        msg: "Ha ocurrido un error",
                        error: error
                    })
                    return
                }
                res.status(200).json({
                    msg: "Libro actualizado",
                    book: docs
                })
            })
        } )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
} 

const delete_book = async (req, res) => {
    try {
        const codigo = req.params;
        book.deleteOne(codigo, (err) => {
            if(err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return 
            }
            res.status(200).json({
                msg: "El libro fue eliminado"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
} 

const update_book = async (req, res) => {
    try {
        const codigo = req.params;
        const data = req.body;
        data.calificaciones = data.calificaciones.map( calif => {
            calif.usuario = parseInt(calif.usuario.username)
            return calif
        } )
        let docs = await book.updateOne(codigo, data);
        res.status(200).json({
            msg: "Libro actualizado",
            book: docs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
} 

module.exports = {
    get_books,
    get_book,
    add_book,
    change_cover,
    delete_book,
    update_book
}