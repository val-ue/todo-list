const get = function (selector) {
  return document.querySelector(selector);
};

const entry = get(".entry");
const add = get(".add");
const todoContainer = get(".todo-list");
const doneContainer = get(".done-list");
const checkboxes = document.querySelectorAll(".checkbox");
const deleteIcons = document.querySelectorAll(".x");

let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks") || "[]");
let doneTasks = JSON.parse(localStorage.getItem("doneTasks") || "[]");

const updateStorage = () => {
  localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
};

let inputText = entry.value;

const prepareCreateTask = () => {
  inputText = entry.value;
  if (inputText === "") {
    return;
  }else {
    entry.value = "";
    const pushItem = pushToList(pendingTasks, inputText);
    createTask(pendingTasks, inputText, "todo", todoContainer, pushItem.id);
    updateStorage();
  }
};

add.addEventListener("click", prepareCreateTask);

entry.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    prepareCreateTask();
  }
});

const switchLists = (array, otherArray, id, inputText, type, list, checked) => {
  findAndRemoveId(array, id);
  const newItem = pushToList(otherArray, inputText);
  createTask(otherArray, inputText, type, list, newItem.id, checked);
};

const clickCheckbox = (itemBox, type) => {
  inputText = itemBox.querySelector(".text-line").textContent;
  const id = parseInt(itemBox.dataset.id);
  if (type === "todo") {
    switchLists(
      pendingTasks,
      doneTasks,
      id,
      inputText,
      "done",
      doneContainer,
      "checked"
    );
  } else {
    switchLists(doneTasks, pendingTasks, id, inputText, "todo", todoContainer);
  }
  itemBox.remove();
  updateStorage();
};

const pendingIds = pendingTasks.map((item) => {
  return item.id;
});

const doneIds = doneTasks.map((item) => {
  return item.id;
});

let maxId = Math.max(...pendingIds, ...doneIds);

if (isNaN(maxId)) {
  maxId = 0;
}

let idNumber = maxId;

const generateID = () => {
  idNumber += 1;
  return idNumber;
};

const pushToList = (array, text) => {
  const giveId = generateID();
  const newItem = { text: text, id: giveId };
  array.push(newItem);
  return newItem;
};

const createTask = (array, text, type, list, id, checked) => {
  const itemBox = document.createElement("div");
  itemBox.classList.add("list-item", "flex", "row", "align-items-center", type);

  itemBox.innerHTML = `
    <label class="checkbox-container flex align-items-center">
        <input type="checkbox" class="checkbox" ${checked}/>
        <span class="checkmark"></span>
    </label>
    <p class="text-line">${text} <span class="x"><i class="fa-solid fa-square-xmark"></i></span></p>`;
  list.appendChild(itemBox);

  const itemCheckbox = itemBox.querySelector(".checkbox");
  itemCheckbox.addEventListener("click", () => clickCheckbox(itemBox, type));
  itemBox.dataset.id = id;
  const deleteBox = itemBox.querySelector(".x");
  deleteBox.addEventListener("click", () => deleteButton(itemBox, id, array));
  return id;
};

doneTasks.forEach((task) => {
  createTask(doneTasks, task.text, "done", doneContainer, task.id, "checked");
});

pendingTasks.forEach((task) => {
  createTask(pendingTasks, task.text, "todo", todoContainer, task.id);
});

const deleteButton = (itemBox, id, array) => {
  itemBox.remove();
  findAndRemoveId(array, id);
  updateStorage();
};

const findAndRemoveId = (array, id) => {
  const findIndex = array.findIndex((item) => {
    return item.id === id;
  });
  array.splice(findIndex, 1);
};
