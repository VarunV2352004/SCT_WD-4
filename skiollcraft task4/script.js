// Select HTML elements
const newListBtn = document.getElementById('newListBtn');
const listModal = document.getElementById('listModal');
const closeModal = document.getElementById('closeModal');
const saveListBtn = document.getElementById('saveListBtn');
const listContainer = document.getElementById('listContainer');
const taskListContent = document.getElementById('taskListContent');
const newListNameInput = document.getElementById('newListName');

let lists = [];
let selectedListId = null;

// Show modal to create a new list
newListBtn.addEventListener('click', () => {
    listModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
    listModal.style.display = 'none';
});

// Save new list
saveListBtn.addEventListener('click', () => {
    const listName = newListNameInput.value.trim();
    if (listName) {
        const list = { id: Date.now().toString(), name: listName, tasks: [] };
        lists.push(list);
        selectedListId = list.id;
        newListNameInput.value = '';
        listModal.style.display = 'none';
        render();
    }
});

// Render the app UI
function render() {
    clearElement(listContainer);
    clearElement(taskListContent);
    renderLists();
    const selectedList = lists.find(list => list.id === selectedListId);
    if (selectedList) {
        renderTasks(selectedList);
    }
}

// Render lists in the sidebar
function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.textContent = list.name;
        listElement.classList.add('list-name');
        listElement.dataset.listId = list.id;
        listContainer.appendChild(listElement);

        listElement.addEventListener('click', () => {
            selectedListId = list.id;
            render();
        });
    });
}

// Render tasks in the main content area
function renderTasks(list) {
    const taskHeading = document.createElement('h2');
    taskHeading.textContent = list.name;
    taskListContent.appendChild(taskHeading);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    taskListContent.appendChild(addTaskBtn);

    addTaskBtn.addEventListener('click', () => {
        const taskName = prompt("Enter task name:");
        const taskDate = prompt("Enter task date (yyyy-mm-dd):");
        const taskTime = prompt("Enter task time (hh:mm):");
        if (taskName) {
            const task = { id: Date.now().toString(), name: taskName, completed: false, date: taskDate, time: taskTime };
            list.tasks.push(task);
            render();
        }
    });

    const taskList = document.createElement('ul');
    list.tasks.forEach(task => {
        const taskElement = document.createElement('li');
        const taskLabel = document.createElement('span');
        const taskDate = document.createElement('span');
        taskLabel.textContent = task.name;
        taskDate.textContent = ` (Due: ${task.date} ${task.time})`;
        
        if (task.completed) {
            taskLabel.style.textDecoration = 'line-through';
        }

        taskElement.appendChild(taskLabel);
        taskElement.appendChild(taskDate);
        taskList.appendChild(taskElement);

        taskLabel.addEventListener('click', () => {
            task.completed = !task.completed;
            render();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        taskElement.appendChild(editBtn);

        editBtn.addEventListener('click', () => {
            const newName = prompt("Edit task name:", task.name);
            const newDate = prompt("Edit task date (yyyy-mm-dd):", task.date);
            const newTime = prompt("Edit task time (hh:mm):", task.time);
            if (newName) {
                task.name = newName;
                task.date = newDate;
                task.time = newTime;
                render();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        taskElement.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            list.tasks = list.tasks.filter(t => t.id !== task.id);
            render();
        });
    });

    taskListContent.appendChild(taskList);
}

// Helper function to clear elements
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial render
render();
