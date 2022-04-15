const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

//app routes

// delete comment
router.post('/delete/:id/:commentId', recipesController.delete);
//create recipes
router.get('/new', recipesController.new);
//all recipes
router.get('/all', recipesController.all); 
//searched recipes
router.get('/search/:query', recipesController.filter)
//individual recipe
router.get('/:id', recipesController.one);
//post recipe
router.post('/', recipesController.create);
//posting comment
router.post('/comment/:id', recipesController.comment);
//get find recipe to edit
router.get('/edit/:id', recipesController.findEdit);
//post edit recipe
router.post('/edit/:id', recipesController.edit);



module.exports = router;