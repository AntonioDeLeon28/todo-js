
import { Todo } from './todo.class'; // También podemo especificar el index que es nuestro archivo de exportaciones e importaciones

export class TodoList {

    constructor() {
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    
    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {

        for (const todo of this.todos) {
            if (todo.id == id) { // Evaluamos con "==" debido a que los datos a comparar unos son string y otros son números
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    } 

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado ); // Así es como lo puso el maestro Herrera
        // this.todos = this.todos.filter( todo => todo.completado == false ); // Este tambien funciona, pero por qué funciona el del profe?
        this.guardarLocalStorage();
    }

    guardarLocalStorage () {
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) ); // Pasamos el arreglo "todos" a un JSON y queda como puro string y así ya podemos usar correctamente el localStorage.setItem
    }

    cargarLocalStorage () {
        this.todos = ( localStorage.getItem( 'todo' ) ) ? this.todos = JSON.parse( localStorage.getItem( 'todo' ) ) : [];
        // this.todos = JSON.parse( localStorage.getItem( 'todo' ) ); // Hacemos el proceso inverso de "JSON.stringify"
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); // Regresa un arreglo con los elementos mutados. Va el "Todo" con mayusculas para hacer referencia a la propiedad estática
        // Puedo usar esta tambien para reducir la linea de arriba: this.todos = this.todos.map( Todo.fromJson );
    }

}