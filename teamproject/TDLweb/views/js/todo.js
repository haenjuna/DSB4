document.addEventListener('DOMContentLoaded', function () {
  const todoList = document.getElementById('todo-list');
  const addButton = document.getElementById('add-button');
  const newTodoInput = document.getElementById('new-todo');

  addButton.addEventListener('click', function () {
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
      addTodoItem(todoText);
      newTodoInput.value = '';
    }
  });

  function addTodoItem(text) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.innerHTML = `
      <input type="checkbox">
      <span>${text}</span>
      <button>X</button>
    `
    ;

    const deleteButton = listItem.querySelector('button');
    deleteButton.addEventListener('click', function () {
      listItem.remove();
    });

    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // 체크박스가 체크되면 텍스트에 줄 추가
        setStrikeThrough(listItem, true);
      } else {
        // 체크박스가 해제되면 줄 제거
        setStrikeThrough(listItem, false);
      }
    });

     // 새로운 항목을 맨 아래에 추가
    todoList.appendChild(listItem);
}

function setStrikeThrough(element, strikeThrough) {
  // 자식 요소 중에서 삭제 버튼을 제외한 모든 텍스트에 대해 스타일을 적용
  const textElements = Array.from(element.children).filter(child => child.tagName === 'SPAN');
  textElements.forEach(textElement => {
      textElement.style.textDecoration = strikeThrough ? 'line-through' : 'none';
  });
}
});