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

    inputText = itemBox.querySelector(".textLine").textContent;
        console.log(inputText);

    createTask(doneItems, inputText, "done", doneList);


    itemBox.remove();

    //we pass in the index as a paramater too
    //we make it so that when we press +, it 
    // pushes the new item to the array and then 
    // we have a function thats like, for the
    // last thing on the array, we create the item. 

    //OR we could return the index when we create the newItem. 
    //and then keep the indexes in their own array/?
    //so when we delete it, we get the index and use it 
    // to delete from the array



    //removes that specific item from list
    //removes it from array
    //createtask for done item with same stuff

    //if its already in the done place, it does the
    //opposite and puts it into the in progress row

};

const createTask = (array, text, type, list) => {
  const newItem = { text: inputText, checked: false };
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

    console.log(itemBox);

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
