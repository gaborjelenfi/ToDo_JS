const userInput = document.querySelector('#userInput');
const createBtn = document.querySelector('.create');
const tasks = document.querySelector('.content__tasks');
const dueDate = document.querySelector('.due');
const radioBtns = document.getElementsByName('prior');
const form = document.getElementById('form');
const filterBtn = document.querySelector('.filter');
const priorityFilter = document.querySelector('#priorityFilter');

let tasksHolder = [];
const minChar = 6;
let savedTasks;
let id = null;
createBtn.disabled = true;
let currentEl = -1;
filterBtn.disabled = true;
filterValue = priorityFilter.value;

getLocalStorage();

createBtn.addEventListener('click', e => addToDo(e));
userInput.addEventListener('keyup', isValid);
userInput.addEventListener('keypress', e => addWithEnter(e));
tasks.addEventListener('click', e => deleteTask(e));
tasks.addEventListener('click', e => editTask(e));
tasks.addEventListener('click', e => toggleMarkAsFinished(e));
dueDate.setAttribute('min', getCurrentDate());
filterBtn.addEventListener('click', filter);

function getFormData() {
  id = (Date.now() + '').slice(-10);
  const priority = addPriority();
  const html = `
    <ul class="box__tasks" data-id="${id}">
      <button type="button" class="button edit">✎</button>
      <li class="due-string">${dueDate.value}</li>
      <li class="task ${priority}Label">${userInput.value}</li>
      <button class="button delete">✖</button>
    </ul>`;

  return {
    dueDate: dueDate.value,
    userInputValue: userInput.value,
    priority,
    id,
    html
  };
}

function filter() {
  filterValue = priorityFilter.value;
  filteredTasks = tasksHolder.filter(element => element.priority === filterValue);
  removeAllTasks();
  if(filterValue === "all task") showAllTasks();
  filteredTasks.forEach(filteredEl => tasks.insertAdjacentHTML('afterbegin', filteredEl.html));
  setLocalStorage();

}

function checkTasksHolderLength() {
  if(tasksHolder.length < 1) {
    filterBtn.classList.add('disabled');
    filterBtn.disabled = true;
  }

  if(tasksHolder.length > 0) {
    filterBtn.classList.remove('disabled');
    filterBtn.disabled = false;
  }
}

function removeAllTasks() {
  const allTasks = document.querySelectorAll('.box__tasks');
  [...allTasks].forEach(el => el.remove());
}

function addToDo(e) {
  const data = getFormData();
  filterBtn.classList.remove('disabled');
  filterBtn.disabled = false;

  if (e.target.classList.contains('create')) {
    tasks.insertAdjacentHTML('afterbegin', data.html);
    tasksHolder.push(data);
  }

  if (e.target.classList.contains('save')) {
    if (currentEl < 0) return;
    tasksHolder[currentEl] = data;
    removeAllTasks();
    showAllTasks();

    createBtn.textContent = 'create';
    createBtn.classList.remove('save');
    createBtn.classList.add('create');
  }

  form.reset();
  isValid();
  addPriority();
  setLocalStorage();
}

function isValid() {
  if (
    userInput.value === '' ||
    userInput.value === null ||
    userInput.value.length < minChar
  ) {
    toggleValidation(true, '#dd3434');
    return false;
  } else {
    toggleValidation(false, '#1d9b51');
    return true;
  }
}

function addWithEnter(e) {
  if (!isValid()) return;
  if (e.keyCode === 13) {
    e.preventDefault();
    addToDo();
  }
}

function toggleValidation(isDisabled, color) {
  createBtn.disabled = isDisabled;
  userInput.style.border = `1px solid ${color}`;
  // prettier-ignore
  isDisabled ? createBtn.classList.add('disabled') : createBtn.classList.remove('disabled');
}

function toggleMarkAsFinished(e) {
  if (!e.target.classList.contains('box__tasks')) return;
  e.target.classList.toggle('done');
}



function addPriority() {
  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      return radioBtns[i].value;
    }
  }
}

function editTask(e) {
  if (!e.target.classList.contains('edit')) return;

  const taskEl = e.target.closest('.box__tasks');

  if (!taskEl) return;
  const [edit] = tasksHolder.filter(el => el.id === taskEl.dataset.id);
  userInput.value = edit.userInputValue;
  dueDate.value = edit.dueDate;
  document.querySelector(`#${edit.priority}`).checked = true;
  currentEl = tasksHolder.indexOf(edit);
  createBtn.textContent = 'save';
  createBtn.classList.remove('create');
  createBtn.classList.add('save');
  isValid();
  setLocalStorage();
}

function deleteTask(e) {
  if (!e.target.classList.contains('delete')) return;

  const taskEl = e.target.closest('.box__tasks');

  if (!taskEl) return;
  taskEl.remove();
  tasksHolder = tasksHolder.filter(del => del.id !== taskEl.dataset.id);
  setLocalStorage();
  checkTasksHolderLength();
}

function showAllTasks () {
  tasksHolder.forEach(element => tasks.insertAdjacentHTML('afterbegin', element.html));
}

function getCurrentDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

function setLocalStorage() {
  localStorage.clear();
  localStorage.setItem('tasks', JSON.stringify(tasksHolder));
  localStorage.setItem('filter', JSON.stringify(filterValue));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('tasks'));
  const filterData = JSON.parse(localStorage.getItem('filter'));

  if (!data) return;
  tasksHolder = data;
  filterValue = filterData;
  priorityFilter.value = filterData
  showAllTasks();
  checkTasksHolderLength();
  filter();
}
