const {
    faker
} = require('@faker-js/faker');
faker.locale = 'es';

const mockCarrito = (cant) => {
    console.log(cant);
    const carrito = [];
    for (let i = 0; i < cant; i++) {
        carrito.push({
            id: faker.database.mongodbObjectId(),
            timestamp: faker.date.recent(),
            productos: [
                mockProducto(),
                mockProducto()
            ]
        });
    };
    return carrito;
};
const mockProducto = () => ({

    id: faker.datatype.number({
        'min': 10,
        'max': 50
    }),
    nombre: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    codigo: faker.random.alphaNumeric(7),
    foto: faker.image.imageUrl(),
    precio: faker.commerce.price(),
    stock: faker.datatype.number({
        min: 0,
        max: 100
    }),
})

module.exports = {
    mockCarrito,
    mockProducto
}