import { getTasks, TASKS} from "./main.js"

let current_category = 'today'
const categories = document.querySelectorAll('.category_list_item')
const sidebarButton = document.querySelector('.open_sidebar_button')
const sidebar = document.querySelector('.sidebar')


function getTaskCount() {
    categories.forEach(item => {
        let activeTasks = 0

        let categoryName = item.id
        TASKS[categoryName].forEach(task => {
            if (!task.done) {
                activeTasks++
            }
        })

        if (activeTasks == 0) {
            item.querySelector('.task_counter').innerText = ""
        }else {
            item.querySelector('.task_counter').innerText = activeTasks
        }
    })
}

// category buttons handler
categories.forEach(item => {
    item.addEventListener('click', () => {
        categories.forEach(item => {
            item.classList.remove('active')
        })

        item.classList.add('active')
        current_category = item.id

        sidebar.classList.remove('show')
        getTasks()
    })
})

sidebarButton.addEventListener('click', () => {
    sidebar.classList.add('show')
})

export {getTaskCount, current_category}