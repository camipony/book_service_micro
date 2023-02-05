const {
    Router
} = require('express');
const category_router = Router();

const {
    get_categories,
    add_category, 
    update_category,
    delete_category
} = require('../controllers/CategoryController')

category_router.get('/categorias', get_categories);

category_router.post('/categoria', add_category);

category_router.put('/categoria/:id', update_category);

category_router.delete('/categoria/:id', delete_category);

module.exports = category_router