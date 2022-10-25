const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const Container = require ('./index');
const fs = require('fs');

app.get('/', (req,res) => {
    res.send("<h1 style='color:black'>Bienvenidos al servidor express</h1> <a href='/productos'>productos</a>    <a href='/productoRandom'>producto random</a>")
})

app.get('/productos', async (req,res) => {
    const contenedor = new Container();
    const allProducts = await contenedor.getAll();
    res.json(allProducts);
})

app.get('/productoRandom', async (req,res) => {
    const contenedor = new Container();
    const allProducts = await contenedor.getAll();
    const random = allProducts[Math.floor(Math.random() * allProducts.length)];
    res.json(random);
})

const server = app.listen(port, () => {
    console.log(`Server activo, escuchando en puerto http://localhost:${port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

