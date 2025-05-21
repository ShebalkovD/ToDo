import { TASKS, getTasks, saveTasks } from "./main.js"
import { current_category, getTaskCount } from "./sidebar.js"

// DOM elements
const editorModal = document.querySelector('.editor')
const editorInput = document.getElementById('editor_input')
const editorConfirmButton = document.getElementById('edit_confirm_button')
const editorCloseButton = document.getElementById('editor_close_button')
const editorDeleteButton = document.getElementById('editor_delete_button')
const editorCategoryName = document.querySelector('.editor_category_name')

function openEditor(id, text, category) {
    editorInput.dataset.id = id
    editorInput.value = text
    editorCategoryName.innerText = category
    editorModal.classList.add('show')
}

// Editor handlers
editorCloseButton.addEventListener('click', () => {
    editorModal.classList.remove('show')
})

editorDeleteButton.addEventListener('click', () => {
    let currentTask = null
    TASKS[current_category].forEach(task => {
        if (task.id == +editorInput.dataset.id) {
            currentTask = task
        }
    })
    let currentIndex = TASKS[current_category].indexOf(currentTask)
    TASKS[current_category].splice(currentIndex, 1)
    getTasks()
    getTaskCount()
    saveTasks()
    editorModal.classList.remove('show')
})

editorConfirmButton.addEventListener('click', () => {
    TASKS[current_category].forEach(task => {
        if (task.id == +editorInput.dataset.id) {
            task.text = editorInput.value
        }
    })
    getTasks()
    saveTasks()
    editorModal.classList.remove('show')
})

editorInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        TASKS[current_category].forEach(task => {
            if (task.id == +editorInput.dataset.id) {
                task.text = editorInput.value
            }
        })
        getTasks()
        saveTasks()
        editorModal.classList.remove('show')
    }
})

export {openEditor}