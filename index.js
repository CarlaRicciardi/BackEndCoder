const fs = require('fs');

class Contenedor{
    constructor(file) {
        this.file = file;
    }
    
    async save(objectProduct) {
        //primero leemos el archivo
        const data = await fs.promises.readFile('productos.json', 'utf-8')
        //la data viene en formato texto plano, por eso la parseamos
        const dataParse = JSON.parse(data);
        console.log(dataParse);

        const id = dataParse.length + 1

        //asignamos el id al objeto
        objectProduct.id = id

        //pusheamos el objeto producto que ingresamos abajo
        dataParse.push(objectProduct);
        console.log(dataParse);

        //tenemos que guardar dataParse pero tenemos que volver a pasarlo a texto plano
        const dataString = JSON.stringify(dataParse);
        await fs.promises.writeFile('productos.json', dataString);
        }

        async getById(id) {
            const data = await fs.promises.readFile('productos.json', 'utf-8')
            const dataParse = JSON.parse(data);
            //lo parseo para convertirlo en array y asi obtener el id mediante find 
            const product = dataParse.find((product) => product == id);
            
             if(product) {
                 return product;
             } else {
                 return "product not find"
             }
        }

        async getAll() {
            const data = await fs.promises.readFile('productos.json', 'utf-8')
            return JSON.parse(data);

        }

        async deleteById() {
            const data = await fs.promises.readFile('productos.json', 'utf-8');
            const dataParse = JSON.parse(data);
            const filtradoId = products.filter(({id}) => id !== id);
            const idFound = products.find(({id}) => id === id);

                if(idFound) {
                    console.log(`Se eliminó el objeto que tenía el id:${id}`);
                    const updateFile = JSON.stringify(filtradoId);
                    fs.writeFile('productos.json', updateFile);
                } else {
                    console.log(`No se encontró el objeto con id: ${id}`);
            }
        }

        async deleteAll() {
            await fs.writeFileSync('productos.json', '[]');
            console.log("Se han eliminado todos los productos");
        }

    }

    async function start() {
    const prodData = new Contenedor("data")
    prodData.save({title: "lavarropas", price: "500"});
    const products = await prodData.getAll();
    console.log(products);

    const product = await prodData.getById(1);
    console.log(product);

    // const borrarTodo = await prodData.deleteAll();
    // console.log(borrarTodo);

    // const borrarPorId = await prodData.deleteById(1);
    // console.log(borrarPorId);
}

start();

