const get = function (selector) {
  return document.querySelector(selector);
};

const entry = get(".entry");
const add = get(".add");
const todoList = get(".todo-list");
const doneList = get(".done-list");

const checkboxes = document.querySelectorAll(".checkbox");

let pendingItems = [
  { text: "Need to make pizza", checked: true },
  { text: "Need to make pizza", checked: true },
];

let doneItems = [
  { text: "Finished making cinnamon rolls", checked: true },
  { text: "Finished making cinnamon rolls", checked: true },
];

let inputText = entry.value;

const prepareCreateTask = () => {
  inputText = entry.value;
  createTask(pendingItems, inputText, "todo", todoList);
};

add.addEventListener("click", prepareCreateTask);

entry.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    prepareCreateTask();
  }
});

const clickCheckbox = (itemBox, type) => {
  inputText = itemBox.querySelector(".textLine").textContent;

  const id = parseInt(itemBox.dataset.id);

  if (type === "todo") {
    //find index
    const findIndex = pendingItems.findIndex(item => item.id === id);

    pendingItems.splice(findIndex, 1); //remove index from pending array
    createTask(doneItems, inputText, "done", doneList);

  } else {
    //get index
    doneItems.splice(index, 1); 
  }

  itemBox.remove();


};




let idNumber = 0;
//or whatever the biggest index
//number is if using local storage

const generateID = () => {
  idNumber += 1;
  return idNumber;
};

const createTask = (array, text, type, list) => {
  const giveId = generateID();

  const newItem = { text: inputText, checked: false, id: giveId };
  array.push(newItem);

  console.log(array);

  const itemBox = document.createElement("div");
  itemBox.classList.add("list-item");
  itemBox.classList.add("flex");
  itemBox.classList.add("row");
  itemBox.classList.add("align-items-center");
  itemBox.classList.add(`${type}`);

  itemBox.innerHTML = `
    <label class="checkbox-container flex align-items-center">
        <input type="checkbox" class="checkbox" />
        <span class="checkmark"></span>
    </label>
    <p class="textLine">${text}</p>`;

  list.appendChild(itemBox);

  const itemCheckbox = itemBox.querySelector(".checkbox");
  //console.log(itemCheckbox);

  itemCheckbox.addEventListener("click", () => clickCheckbox(itemBox));
  itemBox.dataset.id = giveId;

  //console.log(itemBox);

  //return itemBox;

  //use ids to connect to arrays
};

/*array.forEach((item) => {
        const itemBox = document.createElement("div");
        itemBox.classList.add("list-item");
        itemBox.classList.add("flex");
        itemBox.classList.add("row");
        itemBox.classList.add("align-items-center");
        itemBox.classList.add(`${type}`);

        itemBox.innerHTML = `
            <label class="checkbox-container flex align-items-center">
                <input type="checkbox" class="checkbox" />
                <span class="checkmark"></span>
            </label>
            <p>${text}</p>`
        ;
    });*/
