
import './styles.css';
import { Todo, TodoList } from './classes/index.js'; // './classes' También lo podemos dejar así y busca por defecto el index.js
import { crearTodoHtml } from './js/componentes';

// import { Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtml( todo ) );
todoList.todos.forEach( crearTodoHtml ); // Es lo mismo que la linea de arriba. Cuando es un sólo argumento se puede eliminar la función de flecha y el escribir el argumento
console.log('todos', todoList.todos);