class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    
    getFullName() {
        console.log(`Nombre completo del usuario: ${nombre} ${apellido}`);
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
        return this.mascotas;
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(name, autor) {
        this.libros.push({name, autor});
        return this.libros;
    }

    getBookNames() {
        return this.libros.map((busqueda) => busqueda.name)
    }
    
}

const usuario = new Usuario(
    'carla',
    'ricciardi',
    [
        {
            name: 'Harry Potter y la piedra filosofal',
            autor: 'J. K. Rowling',
        },
        {
            name: 'Los juegos del hambre',
            autor: 'Suzanne Collins',
        }
    ]
    
    ['perro', 'gato', 'tortuga']
)

console.log(usuario)
console.log(usuario.getfullName());
console.log(usuario.addMascota("pez"));
console.log(usuario.countMascotas());
console.log(usuario.addBook("Las cronicas de Narnia", "C. S. Lewis"));
console.log(usuario.getBooksNames());