// DOM elements
const input = document.getElementById('main_input')
const taskContainer = document.querySelector('.task_container')
const addButton = document.getElementById('add_button')
const editorModal = document.querySelector('.editor')
const editorInput = document.getElementById('editor_input')
const editorConfirmButton = document.getElementById('edit_confirm_button')
const editorCloseButton = document.getElementById('editor_close_button')
const editorDeleteButton = document.getElementById('editor_delete_button')

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

function getTasks() {
    let tasks = document.querySelectorAll('.task')

    tasks.forEach(task => {
        // checked styles
        let checkbox = task.querySelector('.checkbox')
        checkbox.addEventListener('click', function() {
            if (checkbox.checked) {
                task.classList.add('done')
            }else {
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
    
    let new_task = document.createElement('article')
    new_task.classList.add('task')
    new_task.id = counter
    new_task.innerHTML = 
    `
        <div class="checkbox_wrapper">
            <input type="checkbox" id="${counter}-checkbox" class="checkbox">
        </div>
        <span>${input.value}</span>
    `
    taskContainer.appendChild(new_task)

    getTasks()
}

addButton.addEventListener('click', addTask)

input.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        addTask()
    }
})

editorCloseButton.addEventListener('click', () => {
    editorModal.classList.remove('show')
})

editorDeleteButton.addEventListener('click', () => {
    let currentTask = document.getElementById(editorInput.dataset.id)
    currentTask.remove()
    editorModal.classList.remove('show')
})

editorConfirmButton.addEventListener('click', () => {
    let currentTask = document.getElementById(editorInput.dataset.id)
    currentTask.querySelector('span').innerText = editorInput.value
    editorModal.classList.remove('show')
})

editorInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        let currentTask = document.getElementById(editorInput.dataset.id)
        currentTask.querySelector('span').innerText = editorInput.value
        editorModal.classList.remove('show')
    }
})

