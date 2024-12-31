// Select DOM elements
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add event listeners for buttons
        taskItem.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
        taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));

        taskList.appendChild(taskItem);
    });

    // Save tasks to LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();

    if (title === '') {
        alert('Task title is required!');
        return;
    }

    tasks.push({ title, description, completed: false });
    taskTitleInput.value = '';
    taskDescInput.value = '';
    renderTasks();
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    taskTitleInput.value = task.title;
    taskDescInput.value = task.description;
    tasks.splice(index, 1);
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);

// Initial render
renderTasks();
