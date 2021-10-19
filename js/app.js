class TodoObject {
  constructor({ todoList, lastIdx }) {
    this.todoList = todoList;
    this.lastIdx = lastIdx;
    this.todoCnt = this.getCnt(false);
    this.doneCnt = this.getCnt(true);
  }

  setTodoObject(object) {
    return new TodoObject(object);
  }

  postTodo(item) {
    this.todoList.push(item);
    this.lastIdx++;
    this.todoCnt = this.getCnt(false);
    this.doneCnt = this.getCnt(true);
  }

  putTodo({ id, value, status }) {
    this.todoList = this.todoList.map((todo) => {
      if ("" + todo.id === id) {
        return { 
          id: todo.id, 
          value: value === undefined ? todo.value : value, 
          status: status === undefined ? todo.status : status 
        };
      } else {
        return todo;
      }
    });
    this.todoCnt = this.getCnt(false);
    this.doneCnt = this.getCnt(true);
  }

  deleteTodo(id) {
    this.todoList = this.todoList.filter((todo) => "" + todo.id !== id);
    this.todoCnt = this.getCnt(false);
    this.doneCnt = this.getCnt(true);
  }

  getCnt(status){
    let cnt = 0;

    this.todoList.forEach(todo => {
      if(todo.status === status){
        cnt++;
      }
    });

    return cnt;
  }
}

const todoList = [{ id: 0, value: "산책하기", status: false }];
const todos = new TodoObject({ todoList, lastIdx: 1 });
const input = document.querySelectorAll(".inputBox input")[0];
const enterButton = document.querySelectorAll(".inputBox button")[0];

changeTodoList();
init();

function init(){
  input.addEventListener("keypress", (e) => {
    if(e.code !== "Enter" && e.code !== "NumpadEnter") {
      return;
    } else if (input.value.length === 0) {
      alert("할 일을 입력하세요.");
      return;
    }

    todos.postTodo({
      id: todos.lastIdx,
      value: input.value,
      status: false,
    });

    input.value = "";
    input.focus();
    changeTodoList();
  });

  enterButton.addEventListener("click", (e) => {
    input.classList.toggle('hidden');
    e.currentTarget.classList.toggle('rotate');
  });
}

function setPercent() {
  const todoStatus = document.querySelectorAll(".status")[0];
  let result = Math.floor(todos.doneCnt * 100/(todos.todoCnt + todos.doneCnt));
  todoStatus.innerText = `${isNaN(result) ? 0 : result} %`;
}

function addUpdateEvent() {
  document.querySelectorAll(".update").forEach((updateButton) => {
    updateButton.addEventListener("click", (e) => {
      const value = prompt("수정할 내용을 입력하세요.");

      if (value.length > 0) {
        todos.putTodo({ 
          id: e.currentTarget.parentElement.id, 
          value, 
        });
      }

      changeTodoList();
    });
  });
};

function addRemoveEvent() {
  document.querySelectorAll(".remove").forEach((removeButton) => {
    removeButton.addEventListener("click", (e) => {
      todos.deleteTodo(e.currentTarget.parentElement.id);

      changeTodoList();
    });
  });
};

function addCheckedEvent(){
  document.querySelectorAll(".todoItemBox span").forEach((text) => {
    text.addEventListener("click", (e) => {
      const nextStatus = e.target.classList.toggle('done');

      todos.putTodo({ 
        id: e.target.parentElement.id, 
        status: nextStatus,
      });

      changeTodoList();
    });
  });
}

function changeTodoList(){
  const todoListBox = document.querySelectorAll(".todoListBox")[0];
  todoListBox.innerHTML = "";

  todos.todoList.forEach((todo) => {
    const todoItemBox = document.createElement("div");
    todoItemBox.className = 'todoItemBox';
    todoItemBox.id = todo.id;

    const todoItem = `<span class="${todo.status && 'done'}">${todo.value}</span>`;
    const updateButton = `<button class='update'><i class="fas fa-pen"></i></button>`;
    const removeButton = `<button class='remove'><i class="fas fa-trash"></i></button>`;

    todoListBox.append(todoItemBox);
    todoItemBox.innerHTML = todoItem + updateButton + removeButton;
  });

  addCheckedEvent();
  addUpdateEvent();
  addRemoveEvent();
  setPercent();
};
