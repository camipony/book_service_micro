const dotenv = require('dotenv').config();
//var env = require('node-env-file'); // .env file
//env(__dirname + '../.env');
const app = require('./src/app.js');
const db = require('./src/database/db');

(async () => {
    try {

        db();
        app.set('port', process.env.PORT || 4000);
        app.listen(app.get('port'), () => {
            console.log('Servidor en puerto', app.get('port'));
        });
    
    } catch (error) {

        console.log({
            msg: "Error en la conexion",
            error: error
        })
    }
})()

