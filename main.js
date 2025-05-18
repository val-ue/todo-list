const get = function (selector) {
  return document.querySelector(selector);
};

const entry = get(".entry");
const add = get(".add");
const todoList = get(".todo-list");
const doneList = get(".done-list");

const checkboxes = document.querySelectorAll('.checkbox');

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
    if (e.key === 'Enter') {
      prepareCreateTask();
    }
});

//first we do a foreach on the nodelist 
// with a separate function
//then, for each new one, we add the event listener

const clickCheckbox = (itemBox) => {

    todoList.remove(itemBox);
    console.log('hi');

    //removes that specific item from list
    //removes it from array
    //createtask for done item with same stuff

    //if its already in the done place, it does the
    //opposite and puts it into the in progress row

};

const createTask = (array, text, type, list) => {
  const newItem = { text: inputText, checked: false };
  array.push(newItem);

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
    <p>${text}</p>`;

    list.appendChild(itemBox);

    const itemCheckbox = itemBox.querySelector(".checkbox");
    console.log(itemCheckbox);

    itemCheckbox.addEventListener("click", clickCheckbox);


    return itemBox;
    //add event listener for checkbox
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
