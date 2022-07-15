const fs = require('fs');
const router = require('express').Router();
const productos = require('../models/productos');

class Contenedor {
    static id = 0;
    productosArray = [];
    constructor(fileName) {
        this.fileName = fileName
    }
    async save(producto) {
        try {
            const productList = await productos.find();

            if (productList.length <= 0) {
                Contenedor.id = 1;
            } else {
                this.productosArray = productList;
                Contenedor.id = productList.length + 1;
            }
            producto.id = Contenedor.id;
            producto.timestamp = Date.now();
        } catch (err) {
            console.log(err);
        }
        try {
            const productSaveModel = new productos(producto);
            let productoSave = await productSaveModel.save();

        } catch (err) {
            console.log(err);
        }
        return Contenedor.id;
    }
    async getById(id) {

        try {
            const result = await productos.find({id});
            if(result.length<=0){
                console.log('El id ingresado no corresponde a un producto');
            }else{
                return result;
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getAll() {
        try {
            const productList = await productos.find();
            return productList;
        } catch (err) {
            console.log(err);
        }
    }
    async deleteById(id) {
        try { 
        const result = await productos.find({id});
        if(result.length<=0){
            console.log('El id ingresado no corresponde a un producto');
        }else{
            let productoDelete = await productos.deleteOne({id});
        }
        } catch (err) {
            console.log(err);
        }
    }
    async modify(product, idChange) {
        try {
            const productList = await productos.find();
            const result = productList.find(e => e.id === idChange);
            console.log(result);
            if (result === undefined) {
                console.log('El ID ingresado no corresponde a un producto');
            } else {
                try {
                    let productoUpdate = await productos.updateOne({id:idChange}, product)
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    router,
    Contenedor
}