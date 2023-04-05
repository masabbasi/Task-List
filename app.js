let $ = document;
let form = $.querySelector("#task-form");
let taskInput = $.querySelector("#task");
let taskList = $.querySelector(".collection");
let clearTasks = $.querySelector(".clear-tasks");
let filter = $.querySelector("#filter");

//Invoke All Events
loadAllEvents();

//All Event Function
function loadAllEvents() {
	//Get Tasks From Local Storage
	$.addEventListener("DOMContentLoaded",getTasks)

  //Add Task Event
  form.addEventListener("submit", addTask);

  //Remove Task Event
  taskList.addEventListener("click", removeTask);

  //Clear All Tasks
  clearTasks.addEventListener("click", removeTasks);

  //Filter
  filter.addEventListener("keyup", filterTasks);
}

//Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Please Fill The Task Field");
  }

  let li = $.createElement("li");
  li.className = "collection-item";
  li.appendChild($.createTextNode(taskInput.value));
  let link = $.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  taskList.appendChild(li);
	storeTaskInLS(taskInput.value);
  taskInput.value = "";
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
			removeTaskInLS(e.target.parentElement.parentElement)
    }
  }
}

//Remove Tasks
function removeTasks(e) {
  e.preventDefault();
  if (confirm("Are You Sure?")) {
    while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
		removeTasksInLS()
  }

}

//Filter Tasks
function filterTasks() {
  let text = filter.value.toLowerCase();
  $.querySelectorAll(".collection-item").forEach((task) => {
    let content = task.textContent.toLowerCase();
    if (content.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//Store Task In Local Storage
function storeTaskInLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
	tasks.push(task);
	localStorage.setItem("tasks",JSON.stringify(tasks));
}

//Get Tasks From Local Storage
function getTasks(){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

	tasks.forEach((task)=>{
		let li = $.createElement("li");
		li.className = "collection-item";
		li.appendChild($.createTextNode(task));
		let link = $.createElement("a");
		link.className = "delete-item secondary-content";
		link.innerHTML = `<i class="fa fa-remove"></i>`;
		li.appendChild(link);
		taskList.appendChild(li);
	})
}

//Remove Task From Local Storage
function removeTaskInLS(taskItem){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
	tasks.forEach((task,index)=>{
		if (taskItem.textContent===task) {
			tasks.splice(index,1);
		}
	})
	localStorage.setItem("tasks",JSON.stringify(tasks));
}

//Remove Tasks From Local Storage
function removeTasksInLS(){
	localStorage.clear();
}