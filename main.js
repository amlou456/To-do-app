let myInput = document.querySelector(".input");
let mySubmit = document.querySelector(".add");
let myTasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".deleteAll");
let arrayOfTasks = [];

getStuffFromLocalStorage();

mySubmit.onclick = function () {
  if (myInput.value !== "") {
    addTaskToArray(myInput.value);
    myInput.value = "";
  }
};

myTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    removeFromLocal(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    ToggleCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskTest) {
  const task = {
    id: Date.now(),
    title: taskTest,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPage(arrayOfTasks);
  addToLocalStorage(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
  myTasks.innerHTML = "";

  //create div

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // create delete button

    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);

    //add div to tasks

    myTasks.appendChild(div);
  });
}

function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getStuffFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let localTasks = JSON.parse(data);
    arrayOfTasks = localTasks;
    addElementsToPage(localTasks);
  }
}

function removeFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayOfTasks);
}

function ToggleCompleted(dataId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == dataId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
}

deleteAll.onclick = function () {
  window.localStorage.removeItem("tasks");
  myTasks.innerHTML = "";
};
