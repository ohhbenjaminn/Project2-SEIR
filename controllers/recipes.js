const { Recipes, User } = require('../models/recipes');

module.exports = {
    index,
    new: newRecipe,
    create: createRecipe,
    one,
    all,
    comment: addComment,
    filter: filterRecipes,
    delete: deleteRecipe,
    edit: editRecipe,
    findEdit,
    deleteRecipe,
};


function index(req, res){
    res.render('recipes/index')
}
//delete original recipede
function deleteRecipe(req, res){
    console.log("here", req.params.id)
    Recipes.deleteOne({_id: req.params.id}, function(err, recipe){
        if(err) console.log(err);
        console.log(req.user)
        // User.deleteOne({originalRecipes: req.params.id}, function(err, user){
        //     if (err) console.log(err);
        //     res.redirect(`/profile`, {recipe})
        // })
    })
}

//get to edit recipe page
function findEdit(req, res) {
    Recipes.findById(req.params.id, function(err, recipe) {
        if (err) console.log(err)
        res.render("recipes/edit", {
            recipe
        })
    })
}
//post edit recipe
function editRecipe(req, res){
    Recipes.updateOne({_id: req.params.id}, {$set: {...req.body}}, function(err, recipe){
        if(err) console.log(err);
        const userID = req.user._id;
        const user = req.user;
        const updatedRecipes = user.originalRecipes.map((r) => {
            if(r._id.toString() === req.params.id.toString()) {
                r.name = req.body.name;
            }
            return r;
        })
        User.updateOne({_id: userID}, { $set: { originalRecipes: updatedRecipes }}, function(err, user){
            if (err) console.log(err);
            res.redirect(`/recipes/${req.params.id}`)
        })
    })
}
//get filter for searched recipe thru searchbar
function filterRecipes(req, res) {
    const queryString = req.query;
        Recipes.find({ name: { "$regex": queryString.query, "$options": "i" }}, function(err, recipes){
        if(err) console.log(err)
        res.render("recipes/searched", { recipes })
    })
}
//get render new recipe page
function newRecipe(req, res) {
    res.render('recipes/new')
}
//post new recipe, reroute to all recipes page after
//first posting new recipe to recipe database, then adding that recipe to the user's database to keep track of all the recipes they've created
function createRecipe(req,res) {
    Recipes.create(req.body, function(err, recipe) {
        if (err) {
            console.log(err)
        }
        const user = req.user;
        user.originalRecipes.push(recipe);
        user.save();
        res.redirect('recipes/all')
    })
}
//get one particular recipe
function one(req,res) {
    Recipes.findById(req.params.id, function(err, recipe) {
        if (err) console.log(err)
        res.render("recipes/individual", {
            recipe
        })
    })
}
//get all recipes
function all(req, res){
    Recipes.find({}, function(err, recipes) {
        if(err) {
            console.log(err)
        }
        res.render("recipes/all", {
            recipes
        })
    });
};
//post comment to specific recipe
function addComment(req, res) {
    const name = req.user.name;
    const date = new Date();
    Recipes.findById(req.params.id, function(err, recipe){
        if (err) console.log(err)
        const data = { name, date, ...req.body }
        recipe.comments.push(data)
        recipe.save()
        res.redirect(`/recipes/${recipe._id}`)
    })
}

