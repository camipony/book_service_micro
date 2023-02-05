const category = require('../database/models/Category');

const get_categories = async (req, res) => {
    try {
        category.find({}, (err, docs) => {
            if (err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return
            }
            res.json({
                categories: docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const add_category = async (req, res) => {
    try {
        const datos = req.body;
        category.create(
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
                    msg: "Categoria agregado con exito",
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

const update_category = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        let docs = category.updateOne({_id: id}, data)
        res.status(200).json({
            msg: "Categoria actualizado",
            category: docs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const delete_category = async (req, res) => {
    try {
        const {id} = req.params;
        category.deleteOne({_id: id}, (err) => {
            if(err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return 
            }
            res.status(200).json({
                msg: "La categoria fue eliminado"
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
    get_categories,
    add_category, 
    update_category,
    delete_category
}