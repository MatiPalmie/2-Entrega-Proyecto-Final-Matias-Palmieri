const fs = require('fs');
const router = require('express').Router();
const carritos = require('../models/carritos');
const productos = require('../models/productos');


class Carrito {
    static id = 1;
    carts = [];
    constructor(fileName, productList) {
        this.fileName = fileName,
            this.productList = productList
    }
    async createCart() {
        try {
            const newCart = {
                timestamp: Date.now(),
                productos:[]
            }
            try {
                const carritoSaveModel = new carritos(newCart);
                let carritoSave = await carritoSaveModel.save();
    
            } catch (err) {
                console.log(err);
            }
    

        } catch (e) {
            console.log(e);
        }
    }
    async deleteCart(id) {
        try { 
            const result = await carritos.find({_id: id});
            if(result.length<=0){
                console.log('El id ingresado no corresponde a un carrito');
            }else{
                await carritos.deleteOne({_id:id});
            }
            } catch (err) {
                console.log(err);
            }
        }
    async getCart(id) {
        try {
            const result = await carritos.find({_id: id});
            if(!result){
                console.log('El id ingresado no corresponde a un carrito');
            }else{
                return result;
            }
        } catch (err) {
            console.log(err);
        }
    }
    async saveProduct(id, idProducto) {
        try {
            const product = await productos.find({id: idProducto});
            const cart = await carritos.find({_id: id});
            let carritoAdd = cart[0].productos.push(product);
            console.log(carritoAdd)

            await carritos.updateOne({_id: cart[0]._id},carritoAdd);

        } catch (e) {
            console.log(e)
        }
    }
    async deleteProduct(id, idProducto) {
        try {
            const carritos = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            const cartSelect = carritos.find(e => e.id === id);
            if (cartSelect === undefined) {
                console.log('El id ingresado no corresponde a un carrito');
            } else {
                const resultProduct = cartSelect.productos.find(e => e.id === idProducto);
                if (resultProduct === undefined) {
                    console.log('El id ingresado no corresponde a un producto');
                } else {
                    const index = cartSelect.productos.indexOf(resultProduct);
                    cartSelect.productos.splice(index, 1);
                    console.log(cartSelect);

                    const indexCart = carritos.indexOf(cartSelect);
                    carritos.splice(indexCart, 1, cartSelect);

                    this.carts = carritos;

                    await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts, null, 2));
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = {
    router,
    Carrito
};