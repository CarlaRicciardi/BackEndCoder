const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const multer = require('multer');
const morgan = require('morgan');

const Container = require ('./classContenedor/index');

const {Router} = express;
const routerProducts = Router();


const contenedor = new Container('./data/productos.json');

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//router
app.use('/api/productos', routerProducts);
app.use(morgan('dev'));

//form
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

  app.post("/form", (req, res) => {
    const body = req.body;
    try{
        contenedor.save(body);
        res.json({success: true, error: false})
    }catch(err){
        res.json({ error:true, e:err})
    }
  });

//config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          '.' +
          file.originalname.split('.').pop()
      );
    },
  });
  const upload = multer({ storage: storage });

  app.post('/uploadfile', upload.single('myFile'), (req, res) => {
    const file = req.file;
    if (!file) {
      res.send({ error: true });
    } else {
      res.send(file);
    }
  });
  


//rutas
app.get('/', (req,res) => {
    res.send("<h1 style='color:red'>Bienvenidos al servidor express de CR</h1>")
})

// GET '/api/productos' -> devuelve todos los productos.
routerProducts.get('/', async (req,res) => {
    const allProducts = await contenedor.getAll();
    res.json(allProducts);
})

// GET '/api/productos/:id' -> devuelve un producto según su id.
routerProducts.get('/:id', async (req,res) => {
    const {id} = req.params;
    const prodEncontrado = await contenedor.getById(id);
    if(prodEncontrado){
        res.json(prodEncontrado);
    } else {
        res.json({error: true, msg: 'no encontrado'});
    }
})

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProducts.post('/', async (req,res) => {
    const {body} = req;
    try {
        contenedor.save(body);
        res.send('producto guardado');    
    } catch {
        res.json({error: true, msg: 'No se pudo guardar el producto'});
    }
})

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProducts.put('/:id', async (req,res) =>{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    try {
        await contenedor.update(id, title, price, thumbnail);
        res.json({success: true})
    } catch(e) {
        console.log(e)
        res.json({error: true});
    }
})


// DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProducts.delete('/:id', async (req,res) => {
    const {id} = req.params;
    const products = await contenedor.getAll();

    if(id > products.length){
        res.json({error: true, msg: 'producto no encontrado'});
    } else {
        await contenedor.deleteById(id);
        res.json({success: true, msg: 'producto eliminado'})
    }
})


const server = app.listen(port, () => {
    console.log(`Server activo, escuchando en puerto http://localhost:${port}`)
})
