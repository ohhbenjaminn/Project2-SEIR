const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

//app routes

//homepage
router.get('/', recipesController.index); 
//create recipes
router.get('/new', recipesController.new);
//all recipes
router.get('/all', recipesController.all); 
//your recipes
router.get('/profile', recipesController.profile);


module.exports = router;