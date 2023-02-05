const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const body_parser = require('body-parser');

const {
    upload,
    storage
} = require('./middleware/uploanImage')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
//app.set('view engine', 'ejs');
app.use(
    body_parser.json({
        limit: '20mb'
    })
)
app.use(
    body_parser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

app.use(require('./routers/bookRouter'));
app.use(require('./routers/authorRouter'));
app.use(require('./routers/categoryRouter'));
app.use(require('./routers/providerRouter'));

app.use(
    '/upload',
    storage.single('file'),
    upload, 
    (req, res) => {
        res.status.json({
            url: req.urlFile
        })
    }
)

app.use('/test', (res, req) => {
    res.json("test")
})
//app.use(require('./router'));

/* Rutas no exitentes */
//app.use(express.static('public'));
//app.use('/*', express.static('public'));

module.exports = app;