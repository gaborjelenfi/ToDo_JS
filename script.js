const userInput = document.querySelector('#user-input');
const createBtn = document.querySelector('.create');
const tasks = document.querySelector('.content__tasks');

createBtn.addEventListener('click', addToDo);
userInput.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
      e.preventDefault();
      addToDo();
  }
});

function addToDo() {
  tasks.insertAdjacentHTML('afterbegin', `<p>${userInput.value}</p>`);
  userInput.value = '';
}
