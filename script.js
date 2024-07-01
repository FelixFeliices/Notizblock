let allNotes = {
  headlines: [],
  tasks: [],
  trashHeadlines: [],
  trashTasks: [],
};

function renderInput() {
  return `<div class="addSection">
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
}
function renderContent() {
  return `<div class="trashHeadline"><h2>Müll</h2> <button onclick="closeTrash()">X</button></div>`;
}
load();

function render() {
  let input = document.getElementById("content");
  let taskSection = document.getElementById("taskSection");
  let trashSection = document.getElementById("trashSection");

  content.innerHTML = "";
  taskSection.innerHTML = "";
  trashSection.innerHTML = "";

  trashSection.innerHTML = renderContent();

  input.innerHTML = "";
  input.innerHTML += renderInput();
  content.innerHTML += `<a onclick="showTrash()" id="trashButton" href="#">
      <img src="./img/trash.png" alt="Mülleimer"/>
    </a>`;

  renderNote();
  renderTrash();
}

function renderNoteContent(headline, task, i) {
  return `<div class="task">
      <div class="taskText">
        <b>${headline}</b> <br />
        ${task} <br />
      </div>
      <button onclick="deleteTask(${i})">In den Papierkorb</button>
    </div>`;
}

function renderNote() {
  let taskSection = document.getElementById("taskSection");
  taskSection.innerHTML = "";
  for (let i = allNotes.tasks.length - 1; i >= 0; i--) {
    const headline = allNotes.headlines[i];
    const task = allNotes.tasks[i];
    taskSection.innerHTML += renderNoteContent(headline, task, i);
  }
}

function renderTrash() {
  let trashSection = document.getElementById("trashSection");
  trashSection.innerHTML = renderContent();
  for (let i = 0; i < allNotes.trashTasks.length; i++) {
    const trashHeadline = allNotes.trashHeadlines[i];
    const trashTask = allNotes.trashTasks[i];
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
  allNotes.headlines.push(taskTitle.value);
  allNotes.tasks.push(task.value);
  render();
  save();
  return true;
}

function deleteTask(i) {
  let trashHeadline = allNotes.headlines.splice(i, 1)[0];
  let trashTask = allNotes.tasks.splice(i, 1)[0];

  allNotes.trashHeadlines.push(trashHeadline);
  allNotes.trashTasks.push(trashTask);
  render();
  save();
}

function deleteTrash(i) {
  allNotes.trashHeadlines.splice(i, 1);
  allNotes.trashTasks.splice(i, 1);
  render();
  save();
}

function restore(i) {
  let restoredHeadline = allNotes.trashHeadlines.splice(i, 1)[0];
  let restoredTask = allNotes.trashTasks.splice(i, 1)[0];

  allNotes.headlines.push(restoredHeadline);
  allNotes.tasks.push(restoredTask);
  render();
  save();
}

function save() {
  let headlineAsText = JSON.stringify(allNotes.headlines);
  localStorage.setItem("headlines", headlineAsText);

  let taskAsText = JSON.stringify(allNotes.tasks);
  localStorage.setItem("tasks", taskAsText);

  let trashHeadlineAsText = JSON.stringify(allNotes.trashHeadlines);
  localStorage.setItem("trashHeadlines", trashHeadlineAsText);

  let trashTaskAsText = JSON.stringify(allNotes.trashTasks);
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
    allNotes.headlines = JSON.parse(headlineAsText);
    allNotes.tasks = JSON.parse(taskAsText);
  }

  let trashHeadlineAsText = localStorage.getItem("trashHeadlines");
  let trashTaskAsText = localStorage.getItem("trashTasks");
  if (trashHeadlineAsText && trashTaskAsText) {
    allNotes.trashHeadlines = JSON.parse(trashHeadlineAsText);
    allNotes.trashTasks = JSON.parse(trashTaskAsText);
  }
}
