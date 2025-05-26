const get = function (selector) {
  return document.querySelector(selector);
};

const entry = get(".entry");
const add = get(".add");
const todoList = get(".todo-list");
const doneList = get(".done-list");
const checkboxes = document.querySelectorAll(".checkbox");
const deleteIcons = document.querySelectorAll(".x");

pendingItems = JSON.parse(localStorage.getItem("pendingItems") || "[]");
doneItems = JSON.parse(localStorage.getItem("doneItems") || "[]");
localStorage.setItem("pendingItems", JSON.stringify(pendingItems));
localStorage.setItem("doneItems", JSON.stringify(doneItems));


let inputText = entry.value;

const prepareCreateTask = () => {
  inputText = entry.value;
  entry.value = '';
  createTask(pendingItems, inputText, "todo", todoList);
  localStorage.setItem("pendingItems", JSON.stringify(pendingItems));
  localStorage.setItem("doneItems", JSON.stringify(doneItems));
};

add.addEventListener("click", prepareCreateTask);

entry.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    prepareCreateTask();
  }
});

const switchLists = (array, otherArray, id, inputText, type, list, checked) => {
   const findIndex = array.findIndex(item => item.id === id);
    array.splice(findIndex, 1); 
    const newItem = pushToList(otherArray, inputText);
    createTask(otherArray, inputText, type, list, newItem.id, checked);
};


const clickCheckbox = (itemBox, type) => {
  inputText = itemBox.querySelector(".textLine").textContent;
  const id = parseInt(itemBox.dataset.id);
  if (type === "todo") {
    switchLists(pendingItems, doneItems, id, inputText, "done", doneList, "checked");
  } else {
    switchLists(doneItems, pendingItems, id, inputText, "todo", todoList);
  }
  itemBox.remove();
  localStorage.setItem("pendingItems", JSON.stringify(pendingItems));
  localStorage.setItem("doneItems", JSON.stringify(doneItems));
};

//const maxPendingId = 
//const maxDoneId = 

let idNumber = 0;//max of all the ids +1

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
  itemBox.classList.add("list-item");
  itemBox.classList.add("flex");
  itemBox.classList.add("row");
  itemBox.classList.add("align-items-center");
  itemBox.classList.add(`${type}`);

  itemBox.innerHTML = `
    <label class="checkbox-container flex align-items-center">
        <input type="checkbox" class="checkbox" ${checked}/>
        <span class="checkmark"></span>
    </label>
    <p class="textLine">${text} <span class="x"><i class="fa-solid fa-square-xmark"></i></span></p>`;
  list.appendChild(itemBox);
  const itemCheckbox = itemBox.querySelector(".checkbox");

  itemCheckbox.addEventListener("click", () => clickCheckbox(itemBox, type));
  itemBox.dataset.id = id;
  return id;
};

doneItems.forEach(task => {
  createTask(doneItems, task.text, "done", doneList, task.id, "checked");
});

pendingItems.forEach(task => {
  createTask(pendingItems, task.text, "todo", todoList, task.id);
});

//fix ids
//set up delete
//polish css
