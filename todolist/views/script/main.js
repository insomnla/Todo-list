let path = document.location.pathname;
let searchResultMain = path.search('board');
let searchResultAllTasks = path.search('department');
let taskToDelete = 0;

let mainTable = document.querySelector("#tasksTable");

let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

let navItemCurrentUser = document.querySelector(".nav-item-current-user");

let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
let chengeSelectedTask = document.querySelectorAll(".change-selected-task");

let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

let checkedCounter = 0;
let checkedCounterNoVisible = 0;

let allTitles = document.querySelectorAll(".title");

let options = document.querySelector(".options");
let optionsText = document.querySelector(".options__text");


setTitleForTitle();


console.log(path, searchResultMain, searchResultAllTasks)
if(searchResultMain >= 1) {
    let buttonToAllTasks = document.querySelector("#to-all-tasks");
    let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");

    let modalNewTask = document.querySelector("#new-task-modal");

    let titleNewTask = document.querySelector("#new-task-title");

    buttonNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }
    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
        titleNewTask.textContent = 'Создание новой задачи';
        setTitleForTitle();
    }

    buttonToAllTasks.onclick = function() {
        window.location.href = "/department";
    }

} else if(searchResultAllTasks >= 1) {
    let buttonToMain = document.querySelector("#to-main");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");

    let modalNewTask = document.querySelector("#new-task-modal");

    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }

    buttonToMain.onclick = function() {
        window.location.href = "/board";
    }
}

navItemCurrentUser.onclick = function() {
    window.location.href = "/profile.html";
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

buttonYesModalAlert.onclick = function() {
    $.post("/delete", {taskToDelete}, function(){
        location.reload();
    })
    modalAlertDeletTask.classList.toggle('hidden');
    console.log('deleted');
}

chengeSelectedTask.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        let elemId = elem.dataset['id'];
        let tableRow = elem.parentNode.parentNode.parentNode;
        let newTitle = tableRow.children[3].textContent;
        get_task(tableRow); // бета тест кое-какой хрени
        modalNewTask.classList.toggle('hidden');
        titleNewTask.textContent = `Изменения задачи: ${newTitle}`;
        setTitleForTitle();
    })
})

function setTitleForTitle() {
    allTitles.forEach((elem)=>{
        elem.setAttribute('title', elem.textContent);
    })
}




function get_task(tableRow){ // бета тест кое-какой хрени
    let btn_save = document.querySelector(".button_save")
    let desc = document.querySelector("#new_task_desc"),
        deadline = document.querySelector("#new_task_deadline"),
        taskID = tableRow.children[1].textContent,
        taskCATEG = tableRow.children[2].textContent,
        taskDESC = tableRow.children[3].textContent,
        taskDEADLINE = tableRow.children[4].textContent,
        taskSTATUS = tableRow.children[5].textContent,
        newTaskOPT = document.querySelectorAll("option");
    desc.value = taskDESC;
    deadline.value = taskDEADLINE;
    newTaskOPT.forEach((task) =>{
        if (task.textContent == taskCATEG){
            task.setAttribute("selected", "");
        }
        if (task.textContent == taskSTATUS){
            task.setAttribute("selected", "");
        }
    })
    btn_save.addEventListener("click", ()=>{
        let taskCATEG_ID  = document.querySelector("#new_task_categ").options.selectedIndex + 1;
        let taskSTATUS_ID = document.querySelector("#new_task_status").options.selectedIndex + 1;
        $.post("/update", {taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID}, ()=>{
            window.location.reload();
        })
    })
}

window.onload = function() {
    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    if(tbodyCheckbox !== null) {
        ifChacked();

        tbodyCheckbox.forEach((block)=>{
            block.addEventListener('click', ()=>{
                if(block.classList.contains('table-checkbox_checked')) {
                    block.classList.remove('table-checkbox_checked');
                    checkedCounterNoVisible--;
                    checkedCounter--;
                    if (checkedCounterNoVisible == 0) {
                        mainTable.style.animation = 'crawlUp .6s ease-in-out forwards';
                        console.log('ky')
                    }
                } else {
                    block.classList.add('table-checkbox_checked');
                    checkedCounterNoVisible++;
                    checkedCounter++;
                }
                ifChacked();
            })
        })
        console.log(allTableCheckbox, tbodyCheckbox);

        allTableCheckbox.onclick = function() {
            if(allTableCheckbox.classList.contains('table-checkbox_checked')) {
                allTableCheckbox.classList.remove('table-checkbox_checked');
                tbodyCheckbox.forEach((block)=>{
                    block.classList.remove('table-checkbox_checked');
                })
                checkedCounter = 0;
                checkedCounterNoVisible = 0;
                if (checkedCounterNoVisible == 0) {
                    mainTable.style.animation = 'crawlUp .6s ease-in-out forwards';
                    console.log('ky')
                }
            } else {
                allTableCheckbox.classList.add('table-checkbox_checked');
                tbodyCheckbox.forEach((block)=>{
                    block.classList.add('table-checkbox_checked');
                });
                checkedCounter = tbodyCheckbox.length;
                checkedCounterNoVisible = checkedCounter;
            }
            ifChacked();
        }
        
        function ifChacked() {
            optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
            if(checkedCounterNoVisible < 1) {
                allTableCheckbox.classList.remove('table-checkbox_checked');
            }
            tbodyCheckbox.forEach(()=>{
                if(checkedCounterNoVisible > 0) {
                    mainTable.style.animation = 'crawlDown .6s ease-in-out forwards';
                    setTimeout(function(){
                        options.classList.remove('hidden');
                    }, 300)
                    setTimeout(function(){
                        options.style.animation = 'opacity1 .6s linear forwards'
                    }, 310)
                } else {
                    options.style.animation = 'opacity0 .6s linear forwards'
                    setTimeout(function(){
                        options.classList.add('hidden');
                    }, 600)
                }
            })
            
        }
    }
}
