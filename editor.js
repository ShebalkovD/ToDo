// Dom elements
export const editorModal = document.querySelector('.editor')
export const editorInput = document.getElementById('editor_input')
const editorConfirmButton = document.getElementById('edit_confirm_button')
const editorCloseButton = document.getElementById('editor_close_button')
const editorDeleteButton = document.getElementById('editor_delete_button')

import { TASKS, getTasks } from "./main.js"
import { current_category } from "./sidebar.js"

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
    editorModal.classList.remove('show')
})

editorConfirmButton.addEventListener('click', () => {
    TASKS[current_category].forEach(task => {
        if (task.id == +editorInput.dataset.id) {
            task.text = editorInput.value
        }
    })
    getTasks()
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
        editorModal.classList.remove('show')
    }
})