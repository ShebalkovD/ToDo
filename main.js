import { openEditor } from "./editor.js"
import { current_category, getTaskCount } from "./sidebar.js"

// DOM elements
const input = document.getElementById('main_input')
const taskContainer = document.querySelector('.task_container')
const addButton = document.getElementById('add_button')

// task id counter
let counter = 0

function loadTasks() {
    if (window.localStorage.getItem('tasks') != null) {
        TASKS = JSON.parse(window.localStorage.getItem('tasks'))
    }
    getTasks()
}
function saveTasks() {
    window.localStorage.setItem('tasks', JSON.stringify(TASKS))
}

let TASKS = {
    'today': [],
    'home': []
}

window.addEventListener('load', () => loadTasks())

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

function getTasks() {
    taskContainer.innerHTML = ''
    if (TASKS[current_category].length <= 0) {
        return
    }
    TASKS[current_category].forEach(task => {
       
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
        getTaskCount()
    })

    let task_elements = document.querySelectorAll('.task')
    task_elements.forEach(task => {
        // checked styles
        let checkbox = task.querySelector('.checkbox')
        checkbox.addEventListener('click', function() {
            let id = checkbox.parentElement.parentElement.id
            if (checkbox.checked) {
                TASKS[current_category].forEach(task => {
                    if (task.id == +id) {
                        task.done = true
                    }
                })
                task.classList.add('done')
            }else {
                TASKS[current_category].forEach(task => {
                    if (task.id == +id) {
                        task.done = false
                    }
                })
                task.classList.remove('done')
            }
            getTaskCount()
            saveTasks()
        })

        // task click handler
        task.addEventListener('click', (e) => {
            if (!e.target.classList.contains('checkbox')) {
                let id = task.id
                let text = task.querySelector('span').innerText
                openEditor(id, text, current_category)
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
    TASKS[current_category].push(new_task)

    input.value = ""

    getTasks()
    getTaskCount()
    saveTasks()
}


// Task handlers
addButton.addEventListener('click', addTask)
input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        addTask()
    }
})

export {saveTasks, getTasks,TASKS}


