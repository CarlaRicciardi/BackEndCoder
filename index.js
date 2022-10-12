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

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
        return this.mascotas;
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
        return this.libros;
    }

    getBookNames() {
        return this.libros.map((busqueda) => busqueda.name)
    }
    
}

const usuario = new Usuario ('carla','ricciardi', [{nombre: 'Harry Potter y la piedra filosofal', autor: 'J. K. Rowling'}], ['perro', 'gato', 'tortuga'])

// console.log(usuario)

console.log(usuario.addMascota("pez"));


console.log(usuario.countMascotas());
console.log(usuario.addBook("Las cronicas de Narnia", "C. S. Lewis"));