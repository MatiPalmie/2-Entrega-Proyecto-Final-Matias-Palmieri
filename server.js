const express = require('express');
const app = express();
const productos = require('./routes/products');
const carrito = require('./routes/carrito');
const {mongoConnect} = require('./models/databaseConnection');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use('/api/', productos, carrito);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnect();
    console.log(`Server running on PORT: ${PORT}`);
});