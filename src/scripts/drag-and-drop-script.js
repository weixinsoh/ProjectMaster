// source: https://www.youtube.com/watch?v=jfYWwQrtzzY

const draggables = document.querySelectorAll('.task-card')
const containers = document.querySelectorAll('.container')
console.log(draggables)

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        console.log('drag start')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const aftElem = getDragAfterElement(container, e.clientY)
        if(aftElem == null){
            container.appendChild(draggable)
        }
        else {
            container.insertBefore(draggable, aftElem)
        }
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable)
    })
})

function getDragAfterElement(container, y){
    const draggableElems = [...container.querySelectorAll('.task-cards:not(.dragging)')]

    return draggableElems.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }
        else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY})
}