import { getTasks, TASKS} from "./main.js"

let current_category = 'today'
const categories = document.querySelectorAll('.category_list_item')

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

getTaskCount()

// category buttons handler
categories.forEach(item => {
    item.addEventListener('click', () => {
        categories.forEach(item => {
            item.classList.remove('active')
        })

        item.classList.add('active')
        current_category = item.id

        getTasks()
    })
})

export {getTaskCount, current_category}