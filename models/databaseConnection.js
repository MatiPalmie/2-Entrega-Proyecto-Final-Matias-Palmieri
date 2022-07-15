const mongoose = require('mongoose');
const productos = require('./productos')

const mongoConnect = async () => {
    try{
        const CS = 'mongodb://localhost:27017/ecommerce';
        const connect = await mongoose.connect(CS);
        console.log('Conexión establecida con la base de datos');
    }catch(e){
        console.log(e);
    }
};

module.exports = {
    mongoConnect
};