console.log("Hello, Wolrd!");

let listTodo = [];

function validateForm() {
    /// DOM Form Elements
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date-input");

    /// Validate Inputs
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
    ///console.log("Task added:", task);
}

function renderList() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing list

    
}

function deleteAll() {
    
}