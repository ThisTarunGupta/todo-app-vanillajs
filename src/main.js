let allTodos = JSON.parse(localStorage.getItem('todos'));
if (!allTodos) allTodos = [];

const button = document.querySelector('button');
const error = document.querySelector('span');
const todo = document.querySelector('input');
const todos = document.querySelector('.todos');

const addTodo = () => {
  const title = todo.value.trim();

  if (!title) {
    error.className = 'error';
    error.textContent = 'Todo cannot be empty';
    return todo.focus();
  }

  if (allTodos.find(todo => todo.title === title)) {
    error.className = 'error';
    error.textContent = 'Todo already exist';
    todo.value = '';
    return todo.focus();
  }  

  error.className = '';
  error.textContent = '';
  
  const todoData = {
    title,
    timestamp: Date.now()
  };

  allTodos.push(todoData);
  localStorage.setItem('todos', JSON.stringify(allTodos));
  listTodos();
  todo.value = '';
};

const deleteTodo = (timestamp) => {
  allTodos = allTodos.filter(todo => todo.timestamp !== timestamp);

  listTodos();
  localStorage.setItem('todos', JSON.stringify(allTodos));
};

const listTodos = () => {
  todos.textContent = '';

  if (!allTodos.length) return todos.textContent = 'Add your first todo';

  for (let index = 0; index < allTodos.length; index++) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const i = document.createElement('i');

    p.textContent = allTodos[index].title;

    i.className = 'fa fa-trash';
    i.addEventListener('click', () => deleteTodo(allTodos[index].timestamp));

    div.className = 'todo';
    div.append(p, i);

    todos.appendChild(div);
  }
};

listTodos();
todo.value = '';

todo.addEventListener('keypress', (key) => {
  if (key.code === 'Enter') addTodo();
});
button.addEventListener('click', addTodo);