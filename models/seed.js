const mongoose = require('mongoose');
const data = require('./data.json');
const Recipes = require('./recipes');


const seed = () => {
    Recipes.insertMany(data)
        .then(() => console.log('data seeded'))
        .then(() => mongoose.connection.close())
        .catch((err) => console.log(err))
}

seed() 