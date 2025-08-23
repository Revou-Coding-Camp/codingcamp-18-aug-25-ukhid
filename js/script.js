let listTodo = [];
let currentFilter = "all";
let dropdownVisible = false;

/// Validate Inputs
function validateForm() {
    /// DOM Form Elements
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date-input");

    if (taskInput.value.trim() === "" || dueDateInput.value === "") {
        alert("Task cannot be empty.");
        return false;
    } else {
        addTodo(taskInput.value.trim(), dueDateInput.value);
        taskInput.value = "";
        dueDateInput.value = "";
    }
}

// Add New Todo
function addTodo(task, dueDate) {
    listTodo.push({
        id: Date.now(),
        task: task,
        dueDate: dueDate,
        completed: false
    });
    renderList();
}

// Toggle Dropdown
function toggleDropDown() {
    const dropdown = document.getElementById("filter-dropdown");
    const arrow = document.getElementById("dropdown-arrow");

    dropdownOpen = !dropdownOpen;

    if (dropdownOpen) {
        dropdown.classList.remove("hidden");
        arrow.classList.add("rotate");
    } else {
        dropdown.classList.add("hidden");
        arrow.classList.remove("rotate");
    }
}

// Filter
function setFilter(filter) {
    currentFilter = filter;

    const filterText = document.getElementById("filter-text");
    const filterName = {
        "all": "All",
        "pending": "Pending",
        "completed": "Completed"
    };
    filterText.textContent = filterName[filter];

    document.getElementById("filter-dropdown").classList.add("hidden");
    document.getElementById("dropdown-arrow").classList.remove("rotate");
    dropdownOpen = false;

    renderList();
}

// Filtered Todos
function getFilteredTodos() {
    switch (currentFilter) {
        case "pending":
            return listTodo.filter(todo => !todo.completed);
        case "completed":
            return listTodo.filter(todo => todo.completed);
        default:
            return listTodo;
    }
}
// Status
function toggleTask(id) {
    const todo = listTodo.find(item => item.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderList();
    }
}

// Format Date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {month: 'short', day: 'numeric' });
}

// Render List
function renderList() {
    const taskList = document.getElementById("task-list");
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        let message = "No task found.";
        if (currentFilter === "completed") {
            message = "No completed tasks.";
        } else if (currentFilter === "pending") {
            message = "No pending tasks.";
        }
        
        taskList.innerHTML = `<div class="text-center text-gray-400 py-8">${message}</div>`;
        return;
    }

    taskList.innerHTML = ""; // Clear existing list

    filteredTodos.forEach(todo => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded-lg hover:bg-gray-700 hover:bg-opacity-50 transition-colors duration-200`;

        taskElement.innerHTML = `
            <div class="flex-1 ${todo.completed ? 'line-through opacity-60' : ''}">
                <span class="text-white">${todo.task}</span>
            </div>
            <div class="w-20 text-center text-sm text-gray-400">
                ${formatDate(todo.dueDate)}
            </div>
            <div class="w-16 text-center">
                <button 
                    onclick="toggleTask(${todo.id})"
                    class="w-5 h-5 rounded border-2 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'} transition-colors duration-200"
                >
                    ${todo.completed ? '✓' : ''}
                </button>
            </div>
            <div class="w-16 text-center">
                <button 
                    onclick="deleteTask(${todo.id})"
                    class="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                    🗑️
                </button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    for (let i =0; i < listTodo.length; i++) {
        taskList.innerHTML += `<li class="border-b py-2">${listTodo[i].task} - Due: ${listTodo[i].dueDate}</li>`;
    }
}

/// Delete Todos
function deleteTodo(id) {
    listTodo = listTodo.filter(item => item.id !== id);
    renderList();
} // singele task
function deleteAll() {
    if (listTodo.length > 0 && confirm("Are you sure to delete all tasks?")) {
        listTodo = [];
        renderList();
    }
} // all tasks

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event){
        const filterButton = document.getElementById("filter-button");
        const dropdown = document.getElementById("filter-dropdown");

        if (!filterButton.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
            document.getElementById("dropdown-arrow").classList.remove("rotate");
            dropdownOpen = false;
        }
    });

    const taskInput = document.getElementById("task-input");
    if (taskInput) {
        taskInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                validateForm();
            }
        });
    }
});

/// console.log("Hello, Wolrd!");
// Console for debugging
console.log("Todo List App Loaded Successfully");