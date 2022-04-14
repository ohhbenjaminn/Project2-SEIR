const Recipes = require('../models/recipes');

module.exports = {
    index,
    new: newRecipe,
    all,
    profile,
    create,
    one,
    two
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

function create(req, res){
    Recipes.create(req.body, function(err, recipes){
        if(err) console.log(err)
        // console.log(createSave);
        res.render("recipes/all", {recipes})
    })
}

function profile(req, res){
    res.render('recipes/profile')
}

function one(req, res){
    Recipes.find({_id: req.params.id}, function(err, recipe){
        if(err) console.log(err)
        res.render("recipes/individual", {recipe})
    })
}

function two(req, res){
    Recipes.find({_id: req.params.id}, function(err, recipe){
        console.log(recipe)
        if (err) console.log(err)

        recipe[0].comments.push({name: req.user.name, comment: req.body.comment, date: new Date()});
        recipe[0].save()
        if(err) console.log(err)
        res.render("recipes/individual", {recipe})
    })
}