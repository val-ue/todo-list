//when i type in an input and press enter or 
// press a button, it creates a div for the to
// -do list.   when i press the checkmark on the 
// todo list, the div gets deleted from the todo 
// array and gets put
//  on the done array with the new style applied

const get = function (selector) {
  return document.querySelector(selector);
};

const viewAllComments = get(".comment-link");

