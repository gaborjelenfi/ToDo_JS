const userInput = document.querySelector('#user-input');
const createBtn = document.querySelector('.create');
const tasks = document.querySelector('.content__tasks');

let tasksHolder = [];
const minChar = 6;
let savedTasks;
let id = 0;
createBtn.disabled = true;

getLocalStorage();

createBtn.addEventListener('click', addToDo);
userInput.addEventListener('keyup', e => checkValidation(e));
tasks.addEventListener('click', e => deleteTask(e));

function addToDo() {
  id = (Date.now() + '').slice(-10);
  const html = `<div class="box__tasks" data-id="${id}">
      <button class="button delete">X</button>
      <p class="task">${userInput.value}</p>
     </div>`;
  tasks.insertAdjacentHTML('afterbegin', html);
  userInput.value = '';
  tasksHolder.push({id, html});
  setLocalStorage();
  checkValidation();
}

function checkValidation(e) {
  if (
    userInput.value === '' ||
    userInput.value === null ||
    userInput.value.length < minChar
  ) {
    toggleValidation(true, '#dd3434');
  } else {
    toggleValidation(false, '#1d9b51');
    if (e.keyCode === 13) {
      e.preventDefault();
      addToDo();
    }
  }
}

function toggleValidation(isDisabled, color) {
  createBtn.disabled = isDisabled;
  userInput.style.border = `1px solid ${color}`;
  // prettier-ignore
  isDisabled ? createBtn.classList.add('disabled') : createBtn.classList.remove('disabled');
}

function setLocalStorage() {
  localStorage.clear();
  localStorage.setItem('tasks', JSON.stringify(tasksHolder));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('tasks'));
  
  if (!data) return;
  tasksHolder = data;
  tasksHolder.forEach(element => {
    tasks.insertAdjacentHTML('afterbegin', element.html);
  });
}

function deleteTask(e) {
  if (!e.target.classList.contains('delete')) return;

  const taskEl = e.target.closest('.box__tasks');

  if (!taskEl) return;
  taskEl.remove();
  tasksHolder = tasksHolder.filter(del => del.id !== taskEl.dataset.id)
  setLocalStorage();
}
