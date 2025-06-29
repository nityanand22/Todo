import './style.css'

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string
}

const todos: Todo[] = []
const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement
const todoInput = document.querySelector("input") as HTMLInputElement;
const myform = document.querySelector("#myform") as HTMLFormElement;

myform.onsubmit = (e) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(new Date(Date.now()))
  }
  todos.push(todo)
  todoInput.value = ""
  renderTodo(todos)
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div")
  todo.className = "todo";
  const checkBox: HTMLInputElement = document.createElement("input")
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted"
  checkBox.checked = isCompleted

  checkBox.onchange = () => {
    todos.find(item => {
      if (item.id === id) item.isCompleted = checkBox.checked
    })
    para.className = checkBox.checked ? "textCut" : ""
  }


  const para: HTMLParagraphElement = document.createElement("p")
  para.innerText = title
  para.className = isCompleted ? "textCut" : ""

  const btn: HTMLButtonElement = document.createElement("button")
  btn.innerText = "X"
  btn.className = "deleteBtn"
  btn.onclick = () => {
    deleteTodo(id)
    renderTodo(todos)
  }
  todo.append(checkBox, para, btn)
  todosContainer.append(todo)
}

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(item => item.id === id)
  todos.splice(idx, 1)
}

const renderTodo = (arr: Todo[]) => {
  todosContainer.innerText = ""
  arr.forEach(item => (generateTodoItem(item.title, item.isCompleted, item.id)))
}