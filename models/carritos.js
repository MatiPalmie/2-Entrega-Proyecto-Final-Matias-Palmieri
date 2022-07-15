const mongoose = require('mongoose');

const carritoCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    
    timestamp:{ type: Date, required:true, default: Date.now },
    productos:[]
});


module.exports = new mongoose.model(carritoCollection,carritoSchema);