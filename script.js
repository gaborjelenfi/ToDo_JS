const userInput = document.querySelector('#user-input');
const createBtn = document.querySelector('.create');
const tasks = document.querySelector('.content__tasks');
const deleteBtn = document.querySelector('.delete');

const tasksHolder = [];
const minChar = 6;
createBtn.disabled = true;

createBtn.addEventListener('click', addToDo);
userInput.addEventListener('keyup', e => checkValidation(e));
tasks.addEventListener('click', e => deleteTask(e));

function addToDo() {
  const html = `<div class="box__tasks">
      <button class="button delete">X</button>
      <p class="task">${userInput.value}</p>
     </div>`;
  tasks.insertAdjacentHTML('afterbegin', html);
  userInput.value = '';
  tasksHolder.push(html);
  checkValidation();
}

function checkValidation(e) {
  if (
    userInput.value === '' ||
    userInput.value === null ||
    userInput.value.length < minChar
  ) {
    toggleValidation(true, '#dd3434')
    createBtn.classList.add('disabled');
  } else {
    toggleValidation(false, '#1d9b51')
    createBtn.classList.remove('disabled');
    if (e.keyCode === 13) {
      e.preventDefault();
      addToDo();
    }
  }
}

function toggleValidation(isDisabled, color) {
  createBtn.disabled = isDisabled;
  userInput.style.border =`1px solid ${color}`;
}

function deleteTask(e) {
  if (!e.target.classList.contains('delete')) return;

  const taskEl = e.target.closest('.box__tasks');

  if (!taskEl) return;
  taskEl.remove();
}
