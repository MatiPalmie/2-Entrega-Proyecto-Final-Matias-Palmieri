const mongoose = require('mongoose');

const carritoCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    id:{type:String,required:true},
    timestamp:{ type: Date, required:true, default: Date.now },
    productos:{type:[{}],required:true}
});


module.exports = new mongoose.model(carritoCollection,carritoSchema);