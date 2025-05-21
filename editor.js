// Dom elements
export const editorModal = document.querySelector('.editor')
export const editorInput = document.getElementById('editor_input')
const editorConfirmButton = document.getElementById('edit_confirm_button')
const editorCloseButton = document.getElementById('editor_close_button')
const editorDeleteButton = document.getElementById('editor_delete_button')

// Editor handlers
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