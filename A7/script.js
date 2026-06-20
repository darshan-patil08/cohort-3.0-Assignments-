var taskTitleInput = document.getElementById("taskTitle");
var taskCategorySelect = document.getElementById("taskCategory");
var addTaskBtn = document.getElementById("addTaskBtn");
var taskContainer = document.getElementById("taskContainer");
var emptyMsg = document.getElementById("emptyMsg");
var searchInput = document.getElementById("searchInput");
var filterCategorySelect = document.getElementById("filterCategory");
var totalCountEl = document.getElementById("totalCount");
var pendingCountEl = document.getElementById("pendingCount");
var doneCountEl = document.getElementById("doneCount");
var clearAllBtn = document.getElementById("clearAllBtn");
var themeSwitch = document.getElementById("themeSwitch");
var attrDemoBtn = document.getElementById("attrDemoBtn");
var attrDemoResult = document.getElementById("attrDemoResult");
var attrTestInput = document.getElementById("attrTestInput");
var menuToggle = document.getElementById("menuToggle");
var sidebar = document.getElementById("sidebar");

// task id starts at 1
var taskIdCounter = 1;

// store all tasks in array
var allTasks = loadFromStorage();

// render saved tasks on page load
if (allTasks.length > 0) {
  allTasks.forEach(function(t) { renderTaskCard(t); });
  updateCounters();
  updateEmptyMsg();
}

// sidebar tab switching - show only the clicked section
var navLinks = document.querySelectorAll(".nav-link");
var allSections = document.querySelectorAll(".page-section");

navLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    var targetId = link.dataset.target;

    // remove active from all nav links
    navLinks.forEach(function(l) { l.classList.remove("active"); });
    link.classList.add("active");

    // hide all sections, show only the one we want
    allSections.forEach(function(sec) { sec.classList.remove("active-section"); });
    var targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add("active-section");

    // close sidebar on mobile
    sidebar.classList.remove("open");
  });
});

// mobile menu toggle
menuToggle.addEventListener("click", function() {
  sidebar.classList.toggle("open");
});


// ==============================
// ADD TASK
// ==============================
addTaskBtn.addEventListener("click", function() {
  addTask();
});

taskTitleInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  var title = taskTitleInput.value.trim();
  var category = taskCategorySelect.value;

  if (!title) {
    alert("Please enter a task title!");
    return;
  }
  if (!category) {
    alert("Please select a category!");
    return;
  }

  var task = {
    id: taskIdCounter,
    title: title,
    category: category,
    status: "pending"
  };

  allTasks.push(task);
  taskIdCounter++;
  saveToStorage();
  renderTaskCard(task);

  // reset form
  taskTitleInput.value = "";
  taskCategorySelect.value = "";

  updateCounters();
  updateEmptyMsg();
}


// ==============================
// RENDER TASK CARD
// using createElement, createTextNode, append, setAttribute
// ==============================
function renderTaskCard(task) {
  var card = document.createElement("div");
  card.className = "task-card";

  // data attributes on card
  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  if (task.status === "completed") {
    card.classList.add("completed");
  }

  // task info
  var infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  // title using createTextNode
  var titleEl = document.createElement("p");
  titleEl.className = "task-title";
  titleEl.appendChild(document.createTextNode(task.title));

  // tags row
  var metaDiv = document.createElement("div");
  metaDiv.className = "task-meta";

  var catTag = document.createElement("span");
  catTag.className = "tag tag-category";
  catTag.textContent = task.category;

  var idTag = document.createElement("span");
  idTag.className = "tag tag-id";
  idTag.textContent = "#" + task.id;

  var statusTag = document.createElement("span");
  var isDone = task.status === "completed";
  statusTag.className = "tag tag-status" + (isDone ? " done" : "");
  statusTag.textContent = task.status;

  // append() to add multiple at once
  metaDiv.append(catTag, idTag, statusTag);
  infoDiv.append(titleEl, metaDiv);

  // buttons
  var actionsDiv = document.createElement("div");
  actionsDiv.className = "task-actions";

  var editBtn = document.createElement("button");
  editBtn.className = "btn-edit";
  editBtn.innerHTML = '<i data-lucide="pencil"></i> Edit';
  editBtn.dataset.action = "edit";

  var completeBtn = document.createElement("button");
  completeBtn.className = "btn-complete";
  completeBtn.innerHTML = isDone ? '<i data-lucide="rotate-ccw"></i> Undo' : '<i data-lucide="check"></i> Done';
  completeBtn.dataset.action = "complete";

  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.innerHTML = '<i data-lucide="trash-2"></i> Delete';
  deleteBtn.dataset.action = "delete";

  actionsDiv.append(editBtn, completeBtn, deleteBtn);
  card.append(infoDiv, actionsDiv);

  taskContainer.prepend(card);
  emptyMsg.style.display = "none";

  // re-run lucide so new icons in this card are rendered
  lucide.createIcons();
}


// ==============================
// EVENT DELEGATION
// one listener on container handles all card buttons
// ==============================
taskContainer.addEventListener("click", function(e) {
  // walk up from the actual clicked element (could be SVG inside button)
  var clicked = e.target.closest("[data-action]");
  if (!clicked) return;

  var action = clicked.dataset.action;
  var card = clicked.closest(".task-card");
  if (!card) return;

  var taskId = parseInt(card.getAttribute("data-id"));

  if (action === "delete") handleDelete(card, taskId);
  else if (action === "edit") handleEdit(card, taskId);
  else if (action === "complete") handleComplete(card, taskId);
});


// ==============================
// DELETE - uses remove()
// ==============================
function handleDelete(card, taskId) {
  if (!confirm("Delete this task?")) return;

  card.remove();  // remove() method
  allTasks = allTasks.filter(function(t) { return t.id !== taskId; });
  saveToStorage();
  updateCounters();
  updateEmptyMsg();
}


// ==============================
// EDIT - uses after() to show notice
// ==============================
function handleEdit(card, taskId) {
  var task = allTasks.find(function(t) { return t.id === taskId; });
  if (!task) return;

  var newTitle = prompt("Edit task:", task.title);
  if (newTitle === null || newTitle.trim() === "") return;

  task.title = newTitle.trim();
  saveToStorage();

  // update title in DOM
  var titleEl = card.querySelector(".task-title");
  titleEl.textContent = task.title;

  // show a quick "updated" note using after()
  var note = document.createElement("div");
  note.style.cssText = "font-size:0.75rem;color:#4ade80;padding:2px 0;";
  note.textContent = "✔ Updated";
  card.after(note);

  setTimeout(function() { note.remove(); }, 1500);
}


// ==============================
// COMPLETE / UNDO
// ==============================
function handleComplete(card, taskId) {
  var task = allTasks.find(function(t) { return t.id === taskId; });
  if (!task) return;

  var completeBtn = card.querySelector("[data-action='complete']");
  var statusTag = card.querySelector(".tag-status");

  if (task.status === "pending") {
    task.status = "completed";

    card.setAttribute("data-status", "completed");
    card.classList.add("completed");
    completeBtn.innerHTML = '<i data-lucide="rotate-ccw"></i> Undo';

    statusTag.textContent = "completed";
    statusTag.classList.add("done");

  } else {
    task.status = "pending";

    card.setAttribute("data-status", "pending");
    card.classList.remove("completed");
    completeBtn.innerHTML = '<i data-lucide="check"></i> Done';

    statusTag.textContent = "pending";
    statusTag.classList.remove("done");
  }

  // re-render icons after innerHTML change
  lucide.createIcons();

  saveToStorage();
  updateCounters();
}



// ==============================
// CLEAR ALL
// also resets the ID counter back to 1
// ==============================
clearAllBtn.addEventListener("click", function() {
  if (allTasks.length === 0) {
    alert("No tasks to clear!");
    return;
  }
  if (!confirm("Clear all tasks?")) return;

  // remove all task cards from DOM
  var cards = taskContainer.querySelectorAll(".task-card");
  cards.forEach(function(c) { c.remove(); });

  // reset array and reset ID counter to 1
  allTasks = [];
  taskIdCounter = 1;  // <-- fix: reset counter so next task starts at #1 again

  saveToStorage();
  updateCounters();
  updateEmptyMsg();
});


// ==============================
// SEARCH
// ==============================
searchInput.addEventListener("input", function() {
  filterTasks();
});

// ==============================
// FILTER BY CATEGORY
// ==============================
filterCategorySelect.addEventListener("change", function() {
  filterTasks();
});

function filterTasks() {
  var term = searchInput.value.toLowerCase();
  var cat = filterCategorySelect.value;
  var cards = taskContainer.querySelectorAll(".task-card");

  cards.forEach(function(card) {
    var title = card.querySelector(".task-title").textContent.toLowerCase();
    var cardCat = card.getAttribute("data-category");

    var matchTitle = title.includes(term);
    var matchCat = cat === "all" || cardCat === cat;

    card.style.display = (matchTitle && matchCat) ? "flex" : "none";
  });
}


// ==============================
// THEME TOGGLE
// uses setAttribute, dataset, classList
// ==============================
themeSwitch.addEventListener("click", function() {
  var html = document.documentElement;
  var current = html.getAttribute("data-theme");

  if (current === "dark") {
    html.setAttribute("data-theme", "light");
    themeSwitch.innerHTML = '<i data-lucide="sun"></i>';
    themeSwitch.dataset.theme = "light";
  } else {
    html.setAttribute("data-theme", "dark");
    themeSwitch.innerHTML = '<i data-lucide="moon"></i>';
    themeSwitch.dataset.theme = "dark";
  }
  lucide.createIcons();
});


// ==============================
// ATTR vs PROPERTY DEMO
//
// .value = live property, updates as user types
// getAttribute("value") = original HTML attribute, does NOT change
// ==============================
attrDemoBtn.addEventListener("click", function() {
  var propVal = attrTestInput.value;
  var attrVal = attrTestInput.getAttribute("value");
  var hasAttr = attrTestInput.hasAttribute("value");

  attrDemoResult.classList.remove("hidden");
  attrDemoResult.innerHTML =
    '<span class="res-label">input.value (Property):          </span><span class="res-value">"' + propVal + '"</span><br>' +
    '<span class="res-label">input.getAttribute("value") (Attribute): </span><span class="res-value">' + (attrVal !== null ? '"' + attrVal + '"' : "null") + '</span><br>' +
    '<span class="res-label">hasAttribute("value"):           </span><span class="res-value">' + hasAttr + '</span><br><br>' +
    '<span style="color:var(--text-muted);font-size:0.78rem;">The attribute stays "hello" always. The property changes as you type. That is the key difference.</span>';
});


// ==============================
// COUNTERS
// ==============================
function updateCounters() {
  var total = allTasks.length;
  var done = allTasks.filter(function(t) { return t.status === "completed"; }).length;
  totalCountEl.textContent = total;
  doneCountEl.textContent = done;
  pendingCountEl.textContent = total - done;
}

function updateEmptyMsg() {
  var cards = taskContainer.querySelectorAll(".task-card");
  emptyMsg.style.display = cards.length === 0 ? "block" : "none";
}


// ==============================
// LOCAL STORAGE
// ==============================
function saveToStorage() {
  localStorage.setItem("a7_tasks", JSON.stringify(allTasks));
  localStorage.setItem("a7_counter", taskIdCounter);
}

function loadFromStorage() {
  var saved = localStorage.getItem("a7_tasks");
  var savedCount = localStorage.getItem("a7_counter");
  if (savedCount) taskIdCounter = parseInt(savedCount);
  if (saved) return JSON.parse(saved);
  return [];
}


// ==============================
// EVENT PROPAGATION DEMO
//
// BUBBLING: click goes child → parent → grandparent (default)
// CAPTURING: click goes grandparent → parent → child (useCapture = true)
// ==============================

var bubbleLog = document.getElementById("bubbleLog");
var captureLog = document.getElementById("captureLog");

var gp = document.getElementById("grandparent");
var par = document.getElementById("parent");
var child = document.getElementById("childBtn");

// bubbling - no stopPropagation, let it bubble naturally
child.addEventListener("click", function() {
  appendLog(bubbleLog, "1. Child fired", "log-c");
  console.log("[Bubble] Child");
});

par.addEventListener("click", function() {
  appendLog(bubbleLog, "2. Parent fired (bubbled up)", "log-p");
  console.log("[Bubble] Parent");
});

gp.addEventListener("click", function() {
  appendLog(bubbleLog, "3. Grandparent fired (bubbled up)", "log-gp");
  console.log("[Bubble] Grandparent");
  // grandparent fires last, so clear after it
  setTimeout(function() { clearLog(bubbleLog, "Click the button above to see bubbling..."); }, 3000);
});


var gp2 = document.getElementById("grandparent2");
var par2 = document.getElementById("parent2");
var child2 = document.getElementById("childBtn2");

// capturing - fires grandparent first, then down to child
gp2.addEventListener("click", function() {
  appendLog(captureLog, "1. Grandparent fired (capture)", "log-gp");
  console.log("[Capture] Grandparent");
}, true);

par2.addEventListener("click", function() {
  appendLog(captureLog, "2. Parent fired (capture)", "log-p");
  console.log("[Capture] Parent");
}, true);

child2.addEventListener("click", function() {
  // child fires last in capture demo
  appendLog(captureLog, "3. Child fired (target reached)", "log-c");
  console.log("[Capture] Child");
  setTimeout(function() { clearLog(captureLog, "Click the button above to see capturing..."); }, 3000);
}, true);


// helper: add colored log line
function appendLog(logEl, text, colorClass) {
  var placeholder = logEl.querySelector(".log-placeholder");
  if (placeholder) placeholder.remove();

  var line = document.createElement("div");
  line.className = colorClass;
  line.textContent = text;
  logEl.appendChild(line);
}

// helper: reset log back to placeholder
function clearLog(logEl, placeholderText) {
  logEl.innerHTML = '<span class="log-placeholder">' + placeholderText + '</span>';
}

// init all lucide icons on page load
lucide.createIcons();
