const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('.todo-list');

// Retrieve the list from localStorage on page load
const savedList = JSON.parse(localStorage.getItem('todoList'));
if (savedList) {
  savedList.forEach(item => {
    const li = createTaskElement(item.text, item.completed);
    ul.appendChild(li);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = input.value;
  if (value !== '') {
    const li = createTaskElement(value, false);
    ul.appendChild(li);
    input.value = '';
    saveList();
  }
});

function createTaskElement(text, completed) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
    saveList();
  });
  const span = document.createElement('span');
  span.textContent = text;
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', function() {
    li.remove();
    saveList();
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  return li;
}

function saveList() {
  const list = [];
  ul.querySelectorAll('li').forEach(li => {
    list.push({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('input').checked
    });
  });
  localStorage.setItem('todoList', JSON.stringify(list));
}
