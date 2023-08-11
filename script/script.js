"use strict";
const titleEl = document.getElementById("title");
const btnSubmit = document.getElementById("btn-submit");
const listContainer = document.getElementById("list-container");

// global variable
let items = [];
let isEditing;
let itemToEdit;

// function
function init() {
  addItemsToDOM(items);
}

// addList Element to DOM
function addItemsToDOM(items) {
  listContainer.innerHTML = null;
  if (items.length > 0) {
    items.forEach((item) => {
      addItemToDOM(item);
    });
  }
}

function addItemToDOM(item) {
  const { id, title } = item;
  const listEl = document.createElement("li");
  listEl.classList.add("list-item");
  // add HTML
  listEl.innerHTML = `
    <span class="list">${title}</span>
    <button class="edit-item" onclick='editItem(${id})'>
    <i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-item" onclick='deleteItem(${id})'>
    <i class="fa-solid fa-trash"></i></button>`;

  listContainer.appendChild(listEl);
  // edit items to null
  titleEl.value = null;
}

// delete item
function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  addItemsToDOM(items);
}

// edit item
function editItem(id) {
  isEditing = true;
  btnSubmit.innerText = `Edit`;
  itemToEdit = items.find((item) => item.id === id);
  titleEl.value = itemToEdit.title;
}

// event Listener
btnSubmit.addEventListener("click", () => {
  const title = titleEl.value;

  if (title) {
    if (isEditing) {
      // edit item
      items = items.map((item) => {
        if (item.id === itemToEdit.id) {
          const editedItem = { id: item.id, title: title };
          return editedItem;
        } else {
          return item;
        }
      });
      addItemsToDOM(items);
      isEditing = false;
      btnSubmit.innerText = "Add";
      // edit item null
      itemToEdit = null;
      // title to be null
      titleEl.value = null;
    } else {
      // new item
      const newItem = {
        id: Date.now(),
        title: title,
      };
      items.push(newItem);
      addItemsToDOM(items);
    }
  } else {
    // error
    alert("All inputs are required");
  }
});

// initial setting
init();
