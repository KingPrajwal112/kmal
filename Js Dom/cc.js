let ulElement = document.getElementById('todoItemsContainer');
let saveButton = document.getElementById("saveTodo");
let addButton = document.getElementById("add");

function onAdds() {
    let getItems = localStorage.getItem("tasks");
    let parsedvalue = JSON.parse(getItems);
    if (parsedvalue === null) {
        return [];
    } else {
        return parsedvalue;
    }
}
let todoLists = onAdds();
saveButton.onclick = function() {
    localStorage.setItem("tasks", JSON.stringify(todoLists));
}

function onDelete(liId) {
    let rr = document.getElementById(liId);
    ulElement.removeChild(rr);
    let list = todoLists.findIndex(function(each) {
        let uniqueid = "main" + each.id;
        if (uniqueid === liId) {
            return true;
        } else {
            return false;
        }
    })
    todoLists.splice(list, 1)


}

function onChange(inputId, labellId) {
    let labelElement = document.getElementById(labellId);
    let inputElement = document.getElementById(inputId);
    labelElement.classList.toggle("checked")
}

function onTodoChange(todo) {
    let liElement = document.createElement("li");
    liElement.classList.add("todo-item-container", "d-flex", "flex-row");
    ulElement.appendChild(liElement);
    let liId = "main" + todo.id;
    liElement.id = liId;
    let inputElement = document.createElement("input");
    inputElement.classList.add("checkbox-input");
    inputElement.type = "checkbox";
    let inputId = "Checkbox" + todo.id;
    inputElement.id = inputId;
    liElement.appendChild(inputElement);
    let labelContainer = document.createElement("div");
    let labelId = "label" + todo.id;

    labelContainer.id = labelId;
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    liElement.appendChild(labelContainer);


    let labelelement = document.createElement("label");
    labelelement.classList.add("checkbox-label");
    labelelement.setAttribute("for", inputId);
    let labellId = "lll" + todo.id;
    labelelement.id = labellId;
    labelelement.textContent = todo.title;
    labelContainer.appendChild(labelelement);
    inputElement.onclick = function() {
        onChange(inputId, labellId);
    }
    let delContainer = document.createElement("div");
    delContainer.classList.add('delete-icon-container');

    labelContainer.appendChild(delContainer);
    let delElement = document.createElement("i");
    delElement.classList.add("far", "fa-trash-alt", "delete-icon");

    delContainer.appendChild(delElement);
    delElement.onclick = function() {
        onDelete(liId);
    }




}
for (let todo of todoLists) {
    onTodoChange(todo);
}
let todoCount = todoLists.length;

function onAdd() {
    let inputtask = document.getElementById("todoUserInput");
    let input = inputtask.value;
    if (input === "") {
        alert("Please Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newtodo = {
        title: input,
        id: todoCount,
        isChecked: false
    };
    todoLists.push(newtodo);

    inputtask.value = "";
    onTodoChange(newtodo);


}

localStorage.removeItem(todoLists);

addButton.onclick = function() {
    onAdd();
}