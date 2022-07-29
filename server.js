const express = require('express');
const app = express();
const productos = require('./routes/products');
const carrito = require('./routes/carrito');
const session = require('express-session');
const {
    mongoConnect
} = require('./models/databaseConnection');
const PORT = 8080;
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized: true,
    cookie:{
        maxAge:60000
    }
}));
const {
    mockCarrito,
    mockProducto
} = require('./mocks/mocks');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/mock-carrito', (req, res) => {
        const {
            cant
        } = req.query;
        const result = mockCarrito(cant);
        res.status(200).send(result);
    }),

    app.use(express.static('public'));

app.use('/api/', productos, carrito);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnect();
    console.log(`Server running on PORT: ${PORT}`);
});