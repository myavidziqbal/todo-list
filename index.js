const container = document.getElementById("container")// container todo list
const inputTodo = document.getElementById("inputTodo")// input dari user
const submitButton = document.getElementById("submitButton")// tombol submit
const inputUpdate = document.getElementById("inputUpdate")// update value
const updateButton = document.getElementById("updateButton")// update value
const inputSearch = document.getElementById("inputSearch")// input search

// Event Listener ---------------------------------------
submitButton.addEventListener("click", add)
// inputSearch.addEventListener("keyup", search)

// Array of object data todo list
// let todos = JSON.parse(localStorage.todos) || []

let todos = [
    {
        description: "Learn JavaScript",
        done: false
    },
    {
        description: "Learn React",
        done: true
    }
]


function add() {
    let description = inputTodo.value
    inputTodo.value = ""
    todos.push({
        description: description,
        done: false
    })

    display()
}

function display() {
    let todoList = ""
    todos.forEach(function (todo, index) {
        todoList = todoList + `<div onDblclick="prepareUpdate(${index})" class="todo">
                                    <span>${todo.description}</span>   
                                    <span onClick="remove(${index})">X</span>
                                </div>`
    })
    container.innerHTML = todoList
}

function prepareUpdate(index) {
    inputUpdate.style.display = "inline-block"
    updateButton.style.display = "inline-block"
    inputUpdate.value = todos[index].description
    updateButton.onclick = function () {
        update(index)
    }
}

function update(index) {
    todos[index]["description"] = inputUpdate.value
    display()
}

function remove(index) {
    todos.splice(index, 1)
    display()
}

function search() {
    let result = todos.filter(
        function (todo) {
            return todo["description"].toLowerCase() === inputSearch.value.toLowerCase()
        }
    )
    if (inputSearch.value === "") {
        display()
    } else {
        let todoList = ""
        result.forEach(function (todo, index) {
            todoList = todoList + `<div onDblclick="prepareUpdate(${index})" class="todo">
                                        <span>${todo.description}</span>   
                                        <span onClick="remove(${index})">X</span>
                                    </div>`
        })
        container.innerHTML = todoList
    }

}

window.onbeforeunload = function() {
    localStorage.todos = JSON.stringify(todos)
};

// function dynamicSearch() {
//     let result = todos.filter(
//         function (todo) {
//             var ret = false
//             for (var detail in todo){
//                 if(JSON.stringify(todo[detail]).toLocaleLowerCase().includes(inputSearch.value.toLowerCase())){
//                     ret = true
//                 }
//             }
//             return ret
//         }
//     )
//     if (inputSearch.value === "") {
//         display()
//     } else {
//         let todoList = ""
//         result.forEach(function (todo, index) {
//             todoList = todoList + `<div onDblclick="prepareUpdate(${index})" class="todo">
//                                         <span>${todo.description}</span>   
//                                         <span onClick="remove(${index})">X</span>
//                                     </div>`
//         })
//         container.innerHTML = todoList
//     }

// }

// function search2(key, value) {
//     let result = todos.filter(
//         function (todo) {
//             if (typeof todo[key] === "string") {
//                 return todo[key].toLowerCase().includes(value.toLowerCase())
//             } else {
//                 return todo[key] === value
//             }
//         }
//     )
//     console.log(result)
// }

display()



