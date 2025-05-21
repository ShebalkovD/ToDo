// DOM elements
const input = document.getElementById('main_input')
const taskContainer = document.querySelector('.task_container')
const addButton = document.getElementById('add_button')
import { editorInput, editorModal } from "./editor.js"
import { current_category } from "./sidebar.js"

let counter = 0
export const TASKS = []

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

export function getTasks() {
    console.log('Меняем категорию на', current_category)
    
    taskContainer.innerHTML = ''

    TASKS.forEach(task => {
        if (task.category == current_category) {
            let new_task = document.createElement('article')
            new_task.classList.add('task')
            if (task.done) {
                new_task.classList.add('done')
            }
            new_task.id = task.id
            new_task.innerHTML = 
            `
                <div class="checkbox_wrapper">
                    <input type="checkbox" id="${task.id}-checkbox" class="checkbox">
                </div>
                <span>${task.text}</span>
            `

            if (task.done) {
                new_task.classList.add('done')
                new_task.querySelector('.checkbox').checked = true
            }

            taskContainer.appendChild(new_task)
        }
    })

    let tasks = document.querySelectorAll('.task')

    tasks.forEach(task => {
        // checked styles
        let checkbox = task.querySelector('.checkbox')
        checkbox.addEventListener('click', function() {
            let id = checkbox.parentElement.parentElement.id
            if (checkbox.checked) {
                TASKS.forEach(task => {
                    if (task.id == +id) {
                        task.done = true
                    }
                })
                task.classList.add('done')
            }else {
                TASKS.forEach(task => {
                    if (task.id == +id) {
                        task.done = false
                    }
                })
                task.classList.remove('done')
            }
        })

        // task click handler
        task.addEventListener('click', (e) => {
            if (!e.target.classList.contains('checkbox')) {
                let id = task.id
                let text = task.querySelector('span').innerText

                editorInput.value = text
                editorInput.dataset.id = id
                editorModal.classList.add('show')
            }
        })
    })
}

function addTask() {
    if (checkInput() == false) {
        alert("Заполните поле")
        return
    }

    counter++
    
    let new_task = {
        id: counter,
        text: input.value,
        done: false,
        category: current_category
    }

    TASKS.push(new_task)

    input.value = ""
    getTasks()
}


// Task handlers
addButton.addEventListener('click', addTask)

input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        addTask()
    }
})


