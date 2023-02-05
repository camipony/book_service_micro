const mongoose = require('mongoose');

const url = 'mongodb+srv://JohanDavidPR:j3HvhzbzKelaeqTi@cluster0.yq3ba.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            url,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) {
                    console.log({
                        msg: "DB: Error",
                        error: err
                    })
                }
                else {
                    console.log("Conectado")
                }
            }
        )
    }
    connect();
} 

// , {useNewUrlParser: true, useUnifiedTopology: true}