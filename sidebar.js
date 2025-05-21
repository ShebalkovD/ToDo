export let current_category = 'today'
import { getTasks, TASKS} from "./main.js"
const categories = document.querySelectorAll('.category_list_item')

function getTaskCount() {
    categories.forEach(item => {
        let categoryName = item.id
        item.querySelector('.task_counter').innerText = TASKS[categoryName].length
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