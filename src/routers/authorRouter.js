const {
    Router
} = require('express');
const author_router = Router();

const {
    get_authors,
    add_author,
    update_author,
    delete_author
} = require('../controllers/AuthorController');

author_router.get('/autores', get_authors);

author_router.post('/autor', add_author);

author_router.put('/autor/:id', update_author);

author_router.delete('/autor/:id', delete_author);

module.exports = author_router;