const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

//app routes

//homepage
router.get('/', recipesController.index); 
//create recipes
router.get('/new', recipesController.new);
router.post('/', recipesController.create);
//all recipes
router.get('/all', recipesController.all); 
//your recipes
router.get('/profile', recipesController.profile);
//unique ID
router.get('/:id', recipesController.one);
router.post('/:id', recipesController.two);


module.exports = router;