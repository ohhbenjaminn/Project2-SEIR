const mongoose = require('mongoose');
const data = require('./data.json');

// Create your User Model
const commentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});

const recipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: [String],
        required: true
    },
    prepTime: {
        type: Number,
        min: 1,
        max: 9999,
        required: true
    },
    cookTime: {
        type: Number,
        min: 1,
        max: 9999,
        required: true
    },
    comments: [commentsSchema],

});


const Recipes = mongoose.model('recipes', recipesSchema);

const seed = () => {
    Recipes.insertMany(data)
        .then(() => console.log('data seeded'))
        .then(() => mongoose.connection.close())
        .catch((err) => console.log(err))
}

// seed() 

module.exports = Recipes;