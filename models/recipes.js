const mongoose = require('mongoose');
const data = require('./data.json');

// Create your User Model
const commentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: Date,
        required: 'This field is required.'
    },
    comment: {
        type: String,
        required: 'This field is required.'
    },
});

const recipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    ingredients: {
        type: [String],
        required: 'This field is required.'
    },
    directions: {
        type: [String],
        required: 'This field is required.'
    },
    prepTime: {
        type: Number,
        min: 1,
        max: 9999,
        required: 'This field is required.'
    },
    cookTime: {
        type: Number,
        min: 1,
        max: 9999,
        required: 'This field is required.'
    },
    comments: [commentsSchema],

    id: {type: Number, default: 13}
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