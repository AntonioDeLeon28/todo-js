import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias al HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// se le debe entonces de poner un import no?
export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }> 
            <label>${ todo.tarea }</label> 
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); // Queremos meter el primer elemento después del "div"

    return div.firstElementChild;

}

// Eventos
txtInput.addEventListener( 'keyup', ( event ) => {
    if ( event.keyCode === 13 && txtInput.value.length >0 ) {
        const nuevoTodo = new Todo( txtInput.value ); // Creamos un objeto "todo" y lo asignamos a una variable
        todoList.nuevoTodo( nuevoTodo ); // Apilamos el objeto "todo" en el arreglo de objetos "todo"
        crearTodoHtml( nuevoTodo ); // Mostramos el "todo" en pantalla
        txtInput.value = ''; // Hacemos que después de apretar el enter aparezca el mensaje por defecto
    }
});

divTodoList.addEventListener('click', (event) => { // Al ponerle el "event" nos da mas datos

    const nombreElemento = event.target.localName; // Regresa un "input" si se dió clic en el checkbox, un "label" si se dió clic en el texto y un "button" si se dió clic en la "x" de eliminar
    const todoElemento  = event.target.parentElement.parentElement; // Entrega el objeto al que se le dio click
    const todoId         = todoElemento.getAttribute('data-id');
    // nombreElemento == 'input' También funciona esto pero usaremos un nuevo método
    if ( nombreElemento.includes('input') ) { // Si se dio clic en el checkbox 
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // Si no existe la clase "completed" la pone y si ya existe la quita, sólo del elemento que fue presionado debido al listener
    } else if ( nombreElemento.includes( 'button' ) ) { // Si se cumple debo eliminar el todo
        todoList.eliminarTodo(todoId); // Eliminamos el "todo" del arreglo
        divTodoList.removeChild( todoElemento ); // Eliminamos el elemento del HTML
    }
});

btnBorrar.addEventListener('click', () => {
    
    for ( let i = divTodoList.children.length-1; i >= 0; i-- ) { // Debemos eliminarlos del listado comenzando desde el último con nuestro ciclo for
        const elemento = divTodoList.children[i]; // Aqui elemento nos da la información como la de la linea de divTodoList "const todoElemento  = event.target.parentElement.parentElement;"
        if ( elemento.classList.contains('completed') ) { // Con estos metodos "classList.contains('completed')" podemos ver si contiene la clase 'completed'
            divTodoList.removeChild( elemento );
            todoList.eliminarCompletados(); // Eliminamos el "todo" del array
        }

    }
});

ulFiltros.addEventListener('click', ( event ) => {

    const filtro = event.target.text; // Nos indica a cual elemento de texto se diio clcic, si se da en un lugar vacio regresa "undefined"
    if ( !filtro ) { return; } // Si es "undefined" cierra el ciclo, me refiero a todo lo que esta adentro de este addEventListener
    
    anchorFiltros.forEach( elem => elem.classList.remove('selected') ); // Borramos la clase selected, que es la que hace que el contorno del botón se ponga de un color
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        
        elemento.classList.remove( 'hidden' ); // Quitamos la clase "hidden" de los "todo" que la tengan, osea mostramos todos los "todo" por un instante
        const completado = elemento.classList.contains( 'completed' ); // diferencia entre contains e includes
        
        switch ( filtro ) {

            case 'Pendientes': // Quere decir que a todos lo elementos que esten completados les vamos a agregar la clase "hidden" para esconderlos
                if ( completado ) { // completado da un true o un false
                    elemento.classList.add( 'hidden' );
                }
            break;

            case 'Completados': // Quere decir que a todos lo elementos que NO esten completados les vamos a agregar la clase "hidden" para esconderlos
                if ( !completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;

        }
    }



});