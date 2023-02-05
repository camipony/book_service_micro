const autor = require('../database/models/Autor');

const get_authors = async (req, res) => {
    try {
        autor.find({}, (err, docs) => {
            if (err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return
            }
            res.json({
                autores: docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const add_author = async (req, res) => {
    try {
        const datos = req.body;
        autor.create(
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
                    msg: "Autor agregado con exito",
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

const update_author = async (req, res) => {
    try {
        const {codigo} = req.params;
        const data = req.body;
        let docs = await autor.updateOne({_id: codigo}, data);
        res.status(200).json({
            msg: "Autor actualizado",
            autor: docs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const delete_author = async (req, res) => {
    try {
        const codigo = req.params;
        autor.deleteOne(codigo, (err) => {
            if(err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return 
            }
            res.status(200).json({
                msg: "El autor fue eliminado"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

module.exports = {
    get_authors,
    add_author,
    update_author,
    delete_author
}