export let current_category = 'today'
import { getTasks, TASKS} from "./main.js"
const categories = document.querySelectorAll('.category_list_item')

export function getTaskCount() {
    categories.forEach(item => {
        let categoryName = item.id
        let activeTasks = 0
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