import { createItems } from "./items.js";
import { createForm } from "./form.js";

function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

let items = getLocalStorage();
let editId = null;

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );
  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function addItem(itemName) {
  const newItem = {
    id: generateId(),
    name: itemName,
    completed: false,
  };
  items = [...items, newItem];
  setLocalStorage(items);
  render();
}

export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();
}

export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  render();
}

export function setEditId(itemId) {
  editId = itemId;
  render();
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) input.focus();
  }, 0);
}

render();
