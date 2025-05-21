export let current_category = 'today'
import { getTasks} from "./main.js"
const categories = document.querySelectorAll('.category_list_item')

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