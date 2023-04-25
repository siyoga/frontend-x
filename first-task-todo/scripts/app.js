let todos = [];
const TODO_KEY = 'TODO_KEY';

const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day');

function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add(`todo`);
    element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
                          <div class="todo__comment">${todos[index]}</div>
                          <input type="checkbox"/>
                          <button class="todo__delete" onclick="deleteTodo(${index})">
                            <img src="./images/delete.svg" alt="Удалить дело ${
                              index + 1
                            }" />
                          </button>
                          <button class="todo__edit" onclick="renderEditInput(${index})">
                            <img src="./images/edit.svg" alt="Edit todo ${
                              index + 1
                            }" />
                          </button>
                        `;

    element.setAttribute('id', `todo${index}`);
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}

/* work with todos */
function addTodo(event) {
  event.preventDefault();

  const data = event.target['comment'].value;
  if (!data) {
    return;
  }

  todos.push(data);
  event.target['comment'].value = '';

  rerender();
  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function editTodo(event, index) {
  const newTodo = event.target['comment'].value;
  event.target['comment'].value = '';

  todos[index] = newTodo;
  rerender();
  saveData();
}

function renderEditInput(index) {
  const element = document.getElementById(`todo${index}`);
  element.innerHTML = `
              <div class="todo__day">Дело ${Number(index) + 1}</div>
              <form class="todo__form" onsubmit="editTodo(event, ${index})">
                <input name="comment" class="input_field" type="text" placeholder="${
                  todos[index]
                }" />
                <button class="todo__delete" type="submit">
                  <img src="./images/apply.svg" alt="apply todo ${index}" />
                </button>
                <button class="todo__edit" onclick="rerender()">
                  <img src="./images/cancel.svg" alt="cancel todo ${index}" />
                </button>
              </form>
          `;
}

/* init */
(() => {
  loadData();
  rerender();
})();
