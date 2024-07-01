let headlines = [];
let tasks = [];
let trashHeadlines = [];
let trashTasks = [];
let renderInput = `<div class="addSection">
  <input
    maxlength="30"
    type="text"
    placeholder="Bitte Überschrift hinzufügen"
    id="taskTitle"
  />
  <div class="divider"></div>
  <textarea placeholder="Notiz hinzufügen" name="" id="task"></textarea>
  <button onclick="addTask()">Hinzufügen</button>
</div>`;
let renderContent = `<div class="trashHeadline"><h2>Müll</h2> <button onclick="closeTrash()">X</button></div>`;

load();
renderNote();

function render() {
  let input = document.getElementById("content");
  let taskSection = document.getElementById("taskSection");
  let trashSection = document.getElementById("trashSection");

  content.innerHTML = "";
  taskSection.innerHTML = "";
  trashSection.innerHTML = "";

  trashSection.innerHTML = renderContent;

  input.innerHTML = "";
  input.innerHTML += renderInput;
  content.innerHTML += `<a onclick="showTrash()" id="trashButton" href="#">
      <img src="./img/trash.png" alt="Mülleimer"/>
    </a>`;

  renderNote();
  renderTrash();
}

function renderNote() {
  let taskSection = document.getElementById("taskSection");
  taskSection.innerHTML = "";
  for (let i = tasks.length - 1; i >= 0; i--) {
    const headline = headlines[i];
    const task = tasks[i];
    taskSection.innerHTML += `<div class="task">
      <div class="taskText">
        <b>${headline}</b> <br />
        ${task} <br />
      </div>
      <button onclick="deleteTask(${i})">In den Papierkorb</button>
    </div>`;
  }
}

function renderTrash() {
  let trashSection = document.getElementById("trashSection");
  trashSection.innerHTML = renderContent;
  for (let i = 0; i < trashTasks.length; i++) {
    const trashHeadline = trashHeadlines[i];
    const trashTask = trashTasks[i];
    trashSection.innerHTML += `<div class="trash">
      <div class="taskText">
        <b>${trashHeadline}</b> <br />
        ${trashTask} <br />
      </div>
      <button onclick="restore(${i})">Wiederherstellen</button>
      <button onclick="deleteTrash(${i})">Endgültig löschen</button>
    </div>`;
  }
}

function addTask() {
  let taskTitle = document.getElementById("taskTitle");
  let task = document.getElementById("task");
  if (taskTitle.value.length + task.value.length == 0) {
    alert("Bitte Überschrift und Notiz Hinzufügen");
    return false;
  }
  if (taskTitle.value.length == 0) {
    alert("Bitte Überschrift Hinzufügen");
    return false;
  }
  if (task.value.length == 0) {
    alert("Bitte Notiz Hinzufügen");
    return false;
  }
  headlines.push(taskTitle.value);
  tasks.push(task.value);
  render();
  save();
  return true;
}

function deleteTask(i) {
  let trashHeadline = headlines.splice(i, 1)[0];
  let trashTask = tasks.splice(i, 1)[0];

  trashHeadlines.push(trashHeadline);
  trashTasks.push(trashTask);
  render();
  save();
}

function deleteTrash(i) {
  trashHeadlines.splice(i, 1);
  trashTasks.splice(i, 1);
  render();
  save();
}

function restore(i) {
  let restoredHeadline = trashHeadlines.splice(i, 1)[0];
  let restoredTask = trashTasks.splice(i, 1)[0];

  headlines.push(restoredHeadline);
  tasks.push(restoredTask);
  render();
  save();
}

function save() {
  let headlineAsText = JSON.stringify(headlines);
  localStorage.setItem("headlines", headlineAsText);

  let taskAsText = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskAsText);

  let trashHeadlineAsText = JSON.stringify(trashHeadlines);
  localStorage.setItem("trashHeadlines", trashHeadlineAsText);

  let trashTaskAsText = JSON.stringify(trashTasks);
  localStorage.setItem("trashTasks", trashTaskAsText);
}

function showTrash() {
  document.getElementById("trashSection").classList.remove("d-none");
  render();
}

function closeTrash() {
  document.getElementById("trashSection").classList.add("d-none");
  render();
}

function load() {
  let headlineAsText = localStorage.getItem("headlines");
  let taskAsText = localStorage.getItem("tasks");
  if (headlineAsText && taskAsText) {
    headlines = JSON.parse(headlineAsText);
    tasks = JSON.parse(taskAsText);
  }

  let trashHeadlineAsText = localStorage.getItem("trashHeadlines");
  let trashTaskAsText = localStorage.getItem("trashTasks");
  if (trashHeadlineAsText && trashTaskAsText) {
    trashHeadlines = JSON.parse(trashHeadlineAsText);
    trashTasks = JSON.parse(trashTaskAsText);
  }
}
