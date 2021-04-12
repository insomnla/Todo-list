let path = document.location.pathname;
let searchResultMain = path.search('index');
let searchResultAllTasks = path.search('all-tasks');

console.log(path, searchResultMain, searchResultAllTasks)
if(searchResultMain >= 1) {
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
        window.location.href = "./all-tasks.html";
    }



    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalAlertDeletTask.classList.toggle('hidden');
        })
    })
    buttonCloseModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('closed');
    }
    buttonYesModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('deleted');
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