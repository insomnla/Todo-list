let path = document.location.pathname,
    searchResultMain = path.search('board'),
    searchResultAllTasks = path.search('department'),
    taskToDelete = 0;

console.log(path, searchResultMain, searchResultAllTasks)
if(searchResultMain >= 1 || searchResultAllTasks >= 1) {
    let buttonToAllTasks = document.querySelector("#to-all-tasks");
    let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");
    let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
    let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

    let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
    let changeSelectedTask = document.querySelectorAll(".change-selected-task");

    let modalNewTask = document.querySelector("#new-task-modal");
    let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");


    buttonNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }


    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }

    buttonToAllTasks.onclick = function() {
        window.location.href = "./department";
    }

    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            taskToDelete = (elem.target.getAttribute("data-key"));
            modalAlertDeletTask.classList.toggle('hidden');
        })
    })
    buttonCloseModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('closed');
        taskToDelete = 0;
    }
    buttonYesModalAlert.onclick = function(e) {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('deleted');
        $.post("/delete", {taskToDelete}, function(){
            location.reload();
        })
    }

    changeSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalNewTask.classList.toggle('hidden');
        })
    })

} else if(searchResultAllTasks >= 1) {
    let buttonToMain = document.querySelector("#to-main");

    buttonToMain.onclick = function() {
        window.location.href = "./index.html";
    }
}