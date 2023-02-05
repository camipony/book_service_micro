const provider = require('../database/models/Provider');

const get_providers = async (req, res) => {
    try {
        provider.find({}, (err, docs) => {
            if(err){
                res.status(400).json({
                    msg: "ha ocurrido un error",
                    error: err
                })
                return
            }
            res.status(201).json({
                providers: docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const get_provider = async (req, res) => {
    try {
        const {id} = req.params;
        provider.findOne({_id: id}, (err, docs) => {
            if(err){
                res.status(400).json({
                    msg: "ha ocurrido un error",
                    error: err
                })
                return
            }
            res.status(201).json({
                provider: docs
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const add_provider = async (req, res) => {
    try {
        const datos = req.body;
        provider.create(
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
                    msg: "Proveedor agregado con exito",
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

const update_provider = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        let docs = provider.updateOne({_id: id}, data)
        res.status(200).json({
            msg: "Proveedor actualizado",
            provider: docs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ah ocurrido un error"
        })
    }
}

const delete_provider = async (req, res) => {
    try {
        const {id} = req.params;
        provider.deleteOne({_id: id}, (err) => {
            if(err) {
                res.status(400).json({
                    msg: "Ha ocurrido un error",
                    error: err
                })
                return 
            }
            res.status(200).json({
                msg: "El proveedor fue eliminado"
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
    get_providers,
    get_provider,
    add_provider,
    update_provider,
    delete_provider
}