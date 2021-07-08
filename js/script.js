// List items
var list = [];
// Tasks id's
var id = 0;
function addItem(){
    let task = document.getElementById("task").value;
    if (task != ""){
        let new_task = {
            id,
            item: task
        };
        id++;
        list.push(new_task);
        insertItem(new_task);
        updateLocalStorage();
        document.getElementById("task").value = "";
    }
    else {
        alert("Please insert a task.");
    }
}

function updateLocalStorage(){
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("id", id.toString());
}

function insertItem(task){
    let li = document.createElement("li");
    let text_node = document.createTextNode(task.item);
    li.appendChild(text_node);
    li.id = task.id;
    let span = document.createElement("span");
    span.className = "remove_item";
    span.addEventListener("click", removeItem);
    text_node = document.createTextNode("x");
    span.appendChild(text_node);
    li.appendChild(span);
    document.getElementById("task_list").appendChild(li);
}

document.getElementById("add").addEventListener("click", addItem);
document.getElementById("task").addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        addItem();
    };
});

function removeItem(){
    let li = this.parentElement;
    let index = list.findIndex((task)=>{
        return task.id == li.id;
    })
    if (index>-1){
        list.splice(index,1);
        updateLocalStorage();
    }
    li.remove();
}

function getLocalStorage(){
    let local_list = localStorage.getItem("list");
    if (local_list){
        list = JSON.parse(local_list);
        id = parseInt(localStorage.getItem("id"));
        list.forEach(element => {
            insertItem(element);
        });
        // try to add a 'Delete All' button
        // let right_container = document.getElementById("right_container");
        // let delete_all = document.createElement("span");
        // delete_all.id = "delete_all";
        // delete_all.addEventListener("click", deleteAll);
        // delete_all_text = document.createTextNode("DELETE ALL");
        // delete_all.appendChild(delete_all_text);
        // right_container.appendChild(delete_all);
    }
}

// function deleteAll(){
//     console.log("deletou tudo");
//     localStorage.removeItem("list");
// }

getLocalStorage();