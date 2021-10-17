const app = document.getElementById("app");

let todos = [];

const inputBox = document.createElement('div');
app.append(inputBox);

const input = document.createElement('input');
const button = document.createElement('button');
button.innerText = '등록';
button.addEventListener('click', () => {
    todos.push(input.value);
    input.value = '';
    changeTodoList();
})

inputBox.append(input);
inputBox.append(button);

const todoList = document.createElement('div');
app.append(todoList);

const addUpdateEvent = () => {
    document.querySelectorAll('.update').forEach(updateButton => {
        updateButton.addEventListener('click', e => {
            const update = prompt("수정할 내용");

            if(update.length > 0){
                todos = todos.map((todo, idx) => {
                    if((idx+"") === e.target.id) {
                        return update;
                    }else return todo;
                });
            }
            changeTodoList();
        })  
    });
}

const addRemoveEvent = () => {
    document.querySelectorAll('.remove').forEach(removeButton => {
        removeButton.addEventListener('click', e => {
            todos = todos.filter((todo, idx) => (idx+"") !== e.target.id );
            changeTodoList();
        })  
    });
}

const changeTodoList = () => {
    todoList.innerHTML = '';

    todos.forEach((todo, idx) => {
        const todoItemBox = document.createElement('div');

        const todoItem = document.createElement('span');
        todoItem.innerText = todo;

        const updateButton = document.createElement('button');
        updateButton.innerText = '수정';
        updateButton.className = 'update';
        updateButton.id = idx;

        const removeButton = document.createElement('button');
        removeButton.innerText = '삭제';
        removeButton.className = 'remove';
        removeButton.id = idx;

        todoList.append(todoItemBox);
        todoItemBox.append(todoItem);
        todoItemBox.append(updateButton);
        todoItemBox.append(removeButton);
    })

    addUpdateEvent();
    addRemoveEvent();
}