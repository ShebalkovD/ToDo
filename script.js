// DOM elements
const input = document.getElementById('main_input')
const todoContainer = document.querySelector('.todo_container')
const addButton = document.getElementById('add_button')

let counter = 0

function checkInput() {
    if (input.value.length <= 0) {
        return false
    }
    
    // check the value includes at least one char which not a " "
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] != " ") {
            return true
        }
    }

    return false
}

function addItem() {
    if (checkInput() == false) {
        alert("Заполните поле")
        return
    }

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
input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        addItem()
    }
})
