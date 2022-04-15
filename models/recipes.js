const mongoose = require('mongoose');
const data = require('./data.json');

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
    userID: {
        type: mongoose.Schema.Types.ObjectId
    }
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

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    likedRecipes: [Number],
    originalRecipes: [ { name: String, id: mongoose.Schema.Types.ObjectId } ],
});

const Recipes = mongoose.model('recipes', recipesSchema);
const User = mongoose.model('User', userSchema);
const Comments = mongoose.model('Comments', commentsSchema);

const seed = () => {
    Recipes.insertMany(data)
        .then(() => console.log('data seeded'))
        .then(() => mongoose.connection.close())
        .catch((err) => console.log(err))
}

// mongoose.connection.collections['recipes'].drop(function(err) {
//     console.log('collection dropped')
// })
// mongoose.connection.collections['users'].drop(function(err) {
//     console.log('collection dropped')
// })
// mongoose.connection.collections['comments'].drop(function(err) {
//     console.log('collection dropped')
// })
// console.log(mongoose.connection.collections)

// seed() 

module.exports = {
    Recipes,
    User, 
    Comments
}