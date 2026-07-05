const addBtn = document.querySelector("#add-btn");




addBtn.addEventListener("click", function() {
    const input = document.querySelector("#task-input");
    let value = input.value.trim();
    if(!value.trim()) return;

    let todoList = document.querySelector(".to-do-list");
    let newList = document.createElement("div");
    newList.classList.add("list");
    
    let task = document.createElement("h3");
    task.classList.add("task");
    task.textContent = value;
    newList.appendChild(task);
    todoList.appendChild(newList);

    let actionBtnContainer = document.createElement("div");
    actionBtnContainer.classList.add("actionBtnContainer");

    let actionBtn = document.createElement("button");    
    actionBtn.classList.add("action-btn");
    actionBtn.textContent = "Edit";
    newList.appendChild(actionBtnContainer);
    actionBtnContainer.appendChild(actionBtn);
    newList.appendChild(actionBtnContainer);
    todoList.appendChild(newList);
  
    let actionBtn2 = document.createElement("button");    
    actionBtn2.classList.add("action-btn");
    actionBtn2.textContent = "Delete";
    newList.appendChild(actionBtnContainer);
    actionBtnContainer.appendChild(actionBtn2);
    newList.appendChild(actionBtnContainer);
    todoList.appendChild(newList);
   
    //edit btn functionality


    const editBtn = document.querySelector("#edit-btn");
    
    editBtn.addEventListener("click", function() {
        if(editBtn.textContent === "Edit") {
            editBtn.textContent = "Save";
        }
        input.value = task.textContent;
        task.textContent = "";

    //edit btn functionality
        
    })



    input.value = "";
})

const editBtn = document.querySelector("#edit-btn");
const task = document.querySelector(".task");
    editBtn.addEventListener("click", function() {
        let newTask = prompt("Edit your task", task.textContent);
        if(newTask && newTask.trim()!==task.textContent){ 
            task.textContent = newTask;
            editBtn.textContent = "Save";
        }else{
            editBtn.textContent = "Edit";
        }
        
    }
    // <div class="list">
    //             <h3 class="task">Task</h3>
    //             <div>


    //             <button class="action-btn">
    //                 Edit
    //             </button>
    //             <button class="action-btn">
    //                 Delete
    //             </button>
    //             </div>
    //         </div>
)