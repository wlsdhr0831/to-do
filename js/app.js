class TodoObject {
  constructor({ todoList, lastIdx }) {
    this.todoList = todoList;
    this.lastIdx = lastIdx;
  }

  setTodoObject(object) {
    return new TodoObject(object);
  }

  postTodo(item) {
    this.todoList.push(item);
    this.lastIdx++;
  }

  putTodo({ id, value }) {
    this.todoList = this.todoList.map((todo) => {
      if ("" + todo.id === id) {
        return { id: todo.id, value };
      } else return todo;
    });
  }

  deleteTodo(id) {
    this.todoList = this.todoList.filter((todo) => "" + todo.id !== id);
  }
}

const app = document.getElementById("app");

const todoList = [];
const todos = new TodoObject({ todoList, lastIdx: 0 });

const inputBox = document.createElement("div");
const input = document.createElement("input");
input.addEventListener("keypress", (e) => {
  if (e.code !== "Enter" && e.code !== "NumpadEnter") return;

  button.click();
});

const button = document.createElement("button");
button.innerText = "등록";
button.addEventListener("click", () => {
  todos.postTodo({
    id: todos.lastIdx,
    value: input.value,
  });
  input.value = "";
  input.focus();
  changeTodoList();
});

app.append(inputBox);
inputBox.append(input);
inputBox.append(button);

const todoListBox = document.createElement("div");
app.append(todoListBox);

const addUpdateEvent = () => {
  document.querySelectorAll(".update").forEach((updateButton) => {
    updateButton.addEventListener("click", (e) => {
      const value = prompt("수정할 내용을 입력하세요.");

      if (value.length > 0) {
        todos.putTodo({ id: e.target.parentElement.id, value });
      }
      changeTodoList();
    });
  });
};

const addRemoveEvent = () => {
  document.querySelectorAll(".remove").forEach((removeButton) => {
    removeButton.addEventListener("click", (e) => {
      todos.deleteTodo(e.target.parentElement.id);
      changeTodoList();
    });
  });
};

const changeTodoList = () => {
  todoListBox.innerHTML = "";

  todos.todoList.forEach((todo) => {
    const todoItemBox = document.createElement("div");
    todoItemBox.id = todo.id;

    const todoItem = document.createElement("span");
    todoItem.innerText = todo.value;

    const updateButton = document.createElement("button");
    updateButton.innerText = "수정";
    updateButton.className = "update";

    const removeButton = document.createElement("button");
    removeButton.innerText = "삭제";
    removeButton.className = "remove";

    todoListBox.append(todoItemBox);
    todoItemBox.append(todoItem);
    todoItemBox.append(updateButton);
    todoItemBox.append(removeButton);
  });

  addUpdateEvent();
  addRemoveEvent();
};
