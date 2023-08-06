document.addEventListener('DOMContentLoaded', function() {
  const tasksList = document.getElementById('tasks');
  const newTaskDescription = document.getElementById('new-task-description');
  const priorityDropdown = document.getElementById('priority-dropdown');
  const sortDropdown = document.getElementById('sort-dropdown');
  const addUserInput = document.getElementById('add-user');
  const addDurationInput = document.getElementById('add-duration');
  const addDateDueInput = document.getElementById('add-date-due');
  const editTaskInput = document.getElementById('edit-task');
  const editButton = document.getElementById('edit-button');

  let taskList = [];

  tasksList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
          const listItem = event.target.parentNode;
          const index = taskList.indexOf(listItem.taskData);
          taskList.splice(index, 1);
          listItem.remove();
      }
  });

  const createTaskForm = document.getElementById('create-task-form');

  createTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const taskDescription = newTaskDescription.value;
      const selectedPriority = priorityDropdown.value;
      const user = addUserInput.value;
      const duration = addDurationInput.value;
      const dateDue = addDateDueInput.value;

      if (taskDescription.trim() !== '') {
          const taskData = {
              description: taskDescription,
              priority: selectedPriority,
              user: user,
              duration: duration,
              dateDue: dateDue
          };

          taskList.push(taskData);
          renderTasks();
      }

      newTaskDescription.value = '';
      addUserInput.value = '';
      addDurationInput.value = '';
      addDateDueInput.value = '';
  });

  sortDropdown.addEventListener('change', function() {
      const sortOrder = sortDropdown.value;
      taskList.sort((a, b) => {
          if (sortOrder === 'asc') {
              return a.priority.localeCompare(b.priority);
          } else {
              return b.priority.localeCompare(a.priority);
          }
      });
      renderTasks();
  });

  editButton.addEventListener('click', function() {
      const index = taskList.findIndex(task => task.description === editTaskInput.value);
      if (index !== -1) {
          const editedTask = taskList[index];
          editedTask.description = newTaskDescription.value;
          editedTask.priority = priorityDropdown.value;
          editedTask.user = addUserInput.value;
          editedTask.duration = addDurationInput.value;
          editedTask.dateDue = addDateDueInput.value;
          renderTasks();
          newTaskDescription.value = '';
          addUserInput.value = '';
          addDurationInput.value = '';
          addDateDueInput.value = '';
          editTaskInput.value = '';
          editButton.style.display = 'none';
      }
  });

  function renderTasks() {
      tasksList.innerHTML = '';
      taskList.forEach(taskData => {
          const taskItem = document.createElement('li');
          taskItem.innerHTML = `
              <strong>${taskData.description}</strong><br>
              Priority: ${taskData.priority}<br>
              User: ${taskData.user}<br>
              Duration: ${taskData.duration}<br>
              Due Date: ${taskData.dateDue}<br>
          `;

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.classList.add('delete-button');

          const editButton = document.createElement('button');
          editButton.innerText = 'Edit';
          editButton.classList.add('edit-button');
          editButton.addEventListener('click', function() {
              newTaskDescription.value = taskData.description;
              priorityDropdown.value = taskData.priority;
              addUserInput.value = taskData.user;
              addDurationInput.value = taskData.duration;
              addDateDueInput.value = taskData.dateDue;
              editTaskInput.value = taskData.description;
              editButton.style.display = 'block';
          });

          taskItem.appendChild(deleteButton);
          taskItem.appendChild(editButton);

          taskItem.taskData = taskData;
          taskItem.style.color = getColorByPriority(taskData.priority);

          tasksList.appendChild(taskItem);
      });
  }

  function getColorByPriority(priority) {
      switch (priority) {
          case 'high':
              return 'red';
          case 'medium':
              return 'yellow';
          case 'low':
              return 'green';
          default:
              return 'black';
      }
  }
});

