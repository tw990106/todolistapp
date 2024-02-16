let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let mode = 'all';
let filterList = [];

addBtn.addEventListener("click", addTask);

for(i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

taskInput.addEventListener("input", function(){
    addBtn.disabled = taskInput.value.trim() === "";
})

function addTask(){
    if(taskInput.value.trim() === ""){
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    taskInput.value = ""; 
    addBtn.disabled = true;
    render();
}

function render(){
    

    let list = [];

    if(mode === "all"){
        list = taskList;
    }else{
        list = filterList;
    }
    
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div> 
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')"><span><i class="fa-solid fa-check"></i></span></button>
                                    <button onclick="deleteTask('${list[i].id}')"><span><i class="fa-solid fa-trash"></i></span></button>
                                </div>
                            </div>`
        }else{
            resultHTML += `<div class="task">
                            <div>${list[i].taskContent}</div> 
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                                <button onclick="deleteTask('${list[i].id}')"><span><i class="fa-solid fa-trash"></i></span></button>
                            </div>
                        </div>`
        }        
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id", id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event){
    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = (event.target.offsetHeight - 4) + "px";
        
    }

    
    filterList = [];

    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}