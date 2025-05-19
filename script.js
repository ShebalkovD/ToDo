// DOM elements
const input = document.getElementById('main_input')
const todoContainer = document.querySelector('.todo_container')
const addButton = document.getElementById('add_button')

let counter = 0

function addItem() {
    counter++
    
    let new_item = document.createElement('article')
    new_item.classList.add('todo')
    new_item.id = counter
    new_item.innerHTML = 
    `
        <input type="checkbox" id="${counter}-checkbox" class="checkbox">
        <span>${input.value}</span>
    `
    todoContainer.appendChild(new_item)
}

addButton.addEventListener('click', addItem)
