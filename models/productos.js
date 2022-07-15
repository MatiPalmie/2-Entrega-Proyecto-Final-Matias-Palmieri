const mongoose = require('mongoose');

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({

    nombre:{type: String, required: true},
    description:{type: String, required: true},
    codigo:{type: Number, required: true},
    foto:{type: String, required: true},
    precio:{type: Number, required: true},
    stock:{type: Number, required: true},
    id:{type: Number, required: true, unique:true},
    timestamp:{ type: Date, required:true, default: Date.now }

});

module.exports = new mongoose.model(productosCollection,productosSchema);