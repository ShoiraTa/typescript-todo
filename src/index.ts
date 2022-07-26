
import {v4 as uuidV4} from 'uuid'

type Task = {id: string, title: string, completed: boolean, created_at: Date}
// type for querySelector
const list = document.querySelector<HTMLUListElement>("#list")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// type for getElementById
const form = document.getElementById("new-task-form") as HTMLFormElement
const tasks: Task[] =  loadTasks()
tasks.forEach((task) => addListItem(task))

form.addEventListener('submit', e => {
  e.preventDefault()

  if(input?.value === null || input?.value === ''|| input?.value === undefined) return 

  const newTask: Task = {
    id: uuidV4(),
    title: input?.value,
    completed: false,
    created_at: new Date()
  }

  tasks.push(newTask)
  addListItem(newTask)
  saveTasks()
  input.value =""
})

// function addListItem(task: {id: string, title: string, completed: boolean, created_at: Date}) {
// }

function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    console.log(tasks)
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem('TS-TASKS', JSON.stringify(tasks))
}
function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('TS-TASKS')
  if (taskJson == null) return []
  return JSON.parse(taskJson)
}
