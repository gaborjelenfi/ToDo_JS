const userInput = document.querySelector('#user-input');
const createBtn = document.querySelector('.create');
const tasks = document.querySelector('.content__tasks');
const deleteBtn = document.querySelector('.delete');

const tasksHolder = [];

createBtn.addEventListener('click', addToDo);
userInput.addEventListener('keypress', e => checkInput(e));
tasks.addEventListener('click', e => deleteTask(e));

function addToDo() {
  const html = `<div class="box__tasks">
      <button class="button delete">X</button>
      <p class="task">${userInput.value}</p>
     </div>`;
  tasks.insertAdjacentHTML('afterbegin', html);
  userInput.value = '';
  tasksHolder.push(html);
  console.log(id);
}

function checkInput(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    addToDo();
  }
}

function deleteTask(e) {
  if (!e.target.classList.contains('delete')) return

  const taskEl = e.target.closest('.box__tasks');

  if (!taskEl) return;
  taskEl.remove();
}
