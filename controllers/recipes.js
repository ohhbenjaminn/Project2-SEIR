const Recipes = require('../models/recipes');

module.exports = {
    index,
    new: newRecipe,
    all,
    profile
};

function index(req, res){
    res.render('recipes/index')
}

function newRecipe(req, res) {
    res.render('recipes/new')
}

function all(req, res){
    Recipes.find({}, function(err, recipes) {
        if(err) console.log(err)
        // console.log(recipes)
        res.render("recipes/all", {recipes})
    });
};


function profile(req, res){
    res.render('recipes/profile')
}

  