const categories = document.querySelectorAll('.category_list_item')
export let current_category = 'today'

categories.forEach(item => {
    item.addEventListener('click', () => {
        categories.forEach(item => {
            item.classList.remove('active')
        })

        item.classList.add('active')
    })
})