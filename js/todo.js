



const addTaskBtn=document.getElementById("addTaskBtn");
const  parrentDiv=document.querySelector(".parrent");

function getTask(){
   return  taskArr=JSON.parse(localStorage.getItem("tasks"))||[];
}

function saveTask(task){
    localStorage.setItem("tasks",JSON.stringify(task))
}

function addTask(){
    const taskInput=document.getElementById("taskInput");
  let  taskInputValue=taskInput.value.trim()
    let arr= getTask();
    if (!taskInputValue){
        return;
    }
    console.log(typeof arr)
      arr.push({task:taskInputValue,completed: false});
    
    saveTask(arr);
    
    showTask();
    taskInput.value="";
}
function showTask(){
parrentDiv.innerHTML="";
  let taskArr=getTask();
  taskArr.forEach((ele ,index)=> {
    const newDiv=document.createElement("div");
    const btnStyle=ele.completed?"background: green;" : "background:#f39c12;";
    newDiv.setAttribute("class","addedTask");
    newDiv.innerHTML= `
             <p class="task">${ele.task}</p>
            <button class="btn done" style="${btnStyle}">${ele.completed?"Yes! completed":"complete?"}</button>
            <button class="btn delete">delete</button>
      `;
    
    parrentDiv.appendChild(newDiv);
    newDiv.querySelector(".done").addEventListener("click", () => {
        taskArr[index].completed=true;
        saveTask(taskArr);
        showTask();
    })
  });
}
function deleteTask(FinalTaskArr){


    let arrd= getTask();
    let finalArr=arrd.filter(ele=>ele.task!==FinalTaskArr);
    saveTask(finalArr);
    showTask();
}
parrentDiv.addEventListener("click",(ele)=>{
    if (ele.target.classList.contains("delete")) {
       const taskText = ele.target.parentElement.querySelector(".task").textContent.trim();

        deleteTask(taskText);

    }
        if (ele.target.classList.contains("done")) {
        ele.target.textContent = "Yes! Completed";
    }
})

addTaskBtn.addEventListener("click",()=>{
    addTask();
})
showTask()
