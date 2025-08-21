console.log("Hello, Wolrd!");

let listTodo = [];

/// Validate Inputs
function validateForm() {
    /// DOM Form Elements
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date-input");

    if (taskInput.value === "" || dueDateInput.value === "") {
        alert("Task cannot be empty.");
        return false;
    } else {
        addTodo(taskInput.value, dueDateInput.value);
    }
}

function addTodo(task, dueDate) {
    listTodo.push({
        task: task,
        dueDate: dueDate
    });

    renderList()
}

function renderList() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing list

    for (let i =0; i < listTodo.length; i++) {
        taskList.innerHTML += `<li class="border-b py-2">${listTodo[i].task} - Due: ${listTodo[i].dueDate}</li>`;
    }
}

/// Delete all Todos
function deleteAll() {
    listTodo = [];
    renderList();
}