const { Recipes, User, Comments } = require('../models/recipes');

module.exports = {
    new: newRecipe,
    create: createRecipe,
    one,
    all,
    comment: addComment,
    filter: filterRecipes,
    edit: editRecipe,
    findEdit,
    delete: deleteComment,
};
function deleteComment(req,res){
    console.log('=====> ', req.params)

    Recipes.findOne({_id: req.params.id}, async function (err, recipe) {
        if(err) console.log(err)
        const updatedComments = recipe.comments.filter((r) => r._id != req.params.commentId)
        recipe.comments = updatedComments;
        recipe.save()
        res.redirect(`/recipes/${recipe._id}`)
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
    const userID = req.user._id
    const date = new Date();
    Recipes.findById(req.params.id, function(err, recipe){
        if (err) console.log(err)
        const data = { name, userID, date, ...req.body }
        recipe.comments.push(data)
        recipe.save()
        res.redirect(`/recipes/${recipe._id}`)
    })
}
