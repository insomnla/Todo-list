let taskToDelete = 0;

let mainTable = document.querySelector("#tasksTable");

let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

let buttonBulkDelete = document.querySelector(".instruments__button_bg_trash");
let buttonNTask = document.querySelector(".button_save");
let buttonBulkAdd = document.querySelector(".instruments__button_bg_plus");

let navItemCurrentUser = document.querySelector(".nav-item-current-user");
let minProfile = document.querySelector(".nav-item-current-user_after");

let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
let chengeSelectedTask = document.querySelectorAll(".change-selected-task");
let addSelectedTask = document.querySelectorAll(".add-selected-task")

let modalNewTask = document.querySelector("#new-task-modal");
let modalChangeTask = document.querySelector("#change-task-modal");
let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

let checkedCounter = 0;
let checkedCounterNoVisible = 0;

let allTitles = document.querySelectorAll(".title");

let options = document.querySelector(".options");
let optionsText = document.querySelector(".options__text");

let rowsOnTable = document.querySelectorAll("tbody>tr");

let allRowWithCategories = document.querySelectorAll(".categories");
let allRowWithStatus = document.querySelectorAll(".status");

let hrefOnProfile = document.querySelector(".profile");
let titleChangeTask = document.querySelector("#change-task-title");

let exit = document.querySelector(".exit");

setTitleForTitle();

if (buttonNTask !== null){
    buttonNTask.onclick = function(){
        let desc = document.querySelector("#new_task_desc"),
            deadline = document.querySelector("#new_task_deadline"),
            name = document.querySelector("#new_task_name"),
            nameValue = name.value,
            descValue = desc.value,
            deadlineValue = deadline.value,
            taskCATEG_ID  = document.querySelector("#new_task_categ").options.selectedIndex + 1,
            taskSTATUS_ID = document.querySelector("#new_task_status").options.selectedIndex + 1;
            $.post("/new_task", {descValue, nameValue ,deadlineValue, taskCATEG_ID, taskSTATUS_ID}, ()=>{
                window.location.reload();
            })
    }
}

if (buttonBulkAdd !== null) {
    buttonBulkAdd.onclick = function() {
        let tasksToADD = document.querySelectorAll(".table-checkbox_checked"),
            taskToADD = [];
        tasksToADD.forEach((item)=> {
            if (!(item.getAttribute("value") == null)){
                taskToADD.push(item.getAttribute("value"));
            }
        })
        setTimeout(() => {
            $.post("/add_task", {taskToADD}, function(){
                location.reload();
            }) 
        }, 100);
    }
}


if (buttonBulkDelete !== null) {
    buttonBulkDelete.onclick = function() {
        let tasksToDelete = document.querySelectorAll(".table-checkbox_checked"),
            taskToDelete = [];
        tasksToDelete.forEach((item)=> {
            if (!(item.getAttribute("value") == null)){
                taskToDelete.push(item.getAttribute("value"));
            }
        })
        setTimeout(() => {
            $.post("/delete", {taskToDelete}, function(){
                location.reload();
            }) 
        }, 100);
    }
}

if(exit !== null) {
    exit.onclick = function() {
        window.location.href = '/exit';
    }
}

if(hrefOnProfile !== null) {
    hrefOnProfile.onclick = function() {
        window.location.href = '/profile';
    }
}

if(navItemCurrentUser !== null) {
    navItemCurrentUser.onclick = function() {
        if(minProfile.classList.contains('hidden')) {
            minProfile.classList.remove('hidden');
            minProfile.style.animation = 'opacity1 .3s linear forwards';
        } else {
            minProfile.style.animation = 'opacity0 .3s linear forwards';
            setTimeout(()=> minProfile.classList.add('hidden'), 300);
        }
    }
}

if(addSelectedTask !== null) {
    addSelectedTask.forEach( (task)=>{
        task.addEventListener("click", (elem)=>{
            let taskToADD = elem.target.getAttribute("data-key");
            setTimeout(() => {
                $.post("/add_task", {taskToADD}, function(){
                    location.reload();
                }) 
            }, 100);
        })
    })
}

if(deleteSelectedTask !== null) {
    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            taskToDelete = (elem.target.getAttribute("data-key"));
            modalAlertDeletTask.classList.toggle('hidden');
        })
    })
}

if(buttonCloseModalAlert !== null) {
    buttonCloseModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        taskToDelete = 0;
    }
}

if(buttonYesModalAlert !== null) {
    buttonYesModalAlert.onclick = function() {
        setTimeout(() => {
            $.post("/delete", {taskToDelete}, function(){
                location.reload();
            })
        }, 100);
        modalAlertDeletTask.classList.toggle('hidden');
    }
}

if(chengeSelectedTask !== null) {
    chengeSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', ()=>{
            let elemId = elem.dataset['id'];
            let tableRow = elem.parentNode.parentNode.parentNode;
            let newTitle = tableRow.children[3].textContent;
            get_task(tableRow); // бета тест кое-какой хрени
            modalChangeTask.classList.toggle('hidden');
            titleChangeTask.textContent = `Изменение задачи: ${newTitle}`;
            setTitleForTitle();
        })
    })
}

function checkForEmptiness() {
    let counter = 0;
    rowsOnTable.forEach((elem)=>{
        if(elem.classList.contains('hidden')) {
            counter++;
            if(counter == rowsOnTable.length) {
                document.querySelector(".after-table").classList.remove('hidden');
            }
        }
    })
} 

function setTitleForTitle() {
    allTitles.forEach((elem)=>{
        elem.setAttribute('title', elem.textContent);
    })
}

function get_task(tableRow){ // бета тест кое-какой хрени
    let btn_save = document.querySelector(".change_button_save"),
        newTaskOPT = document.querySelectorAll("#change-option");
        addedValue = 0;
    console.log(tableRow.children);
    if (tableRow.children.length == 8){
        addedValue = 1;
    }
    let desc = document.querySelector("#change_task_desc"),
        deadline = document.querySelector("#change_task_deadline"),
        taskID = tableRow.children[1].textContent,
        taskCATEG = tableRow.children[2 + addedValue].textContent,
        taskDESC = tableRow.children[3 + addedValue].textContent,
        taskDEADLINE = tableRow.children[4 + addedValue].textContent,
        taskSTATUS = tableRow.children[5 + addedValue].textContent;
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
        taskDEADLINE = deadline.value;
        let taskCATEG_ID  = document.querySelector("#change_task_categ").options.selectedIndex + 1;
        let taskSTATUS_ID = document.querySelector("#change_task_status").options.selectedIndex + 1;
        $.post("/update", {taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID}, ()=>{
            window.location.reload();
        })
    })
}

window.addEventListener('click', (event)=> {
    if(event.target.classList.contains('modal')) {
        if(modalAlertDeletTask !== null) {
            modalAlertDeletTask.classList.add('hidden');
        };
        if(modalChangeTask !== null) {
            modalChangeTask.classList.add('hidden');
        };
        if(modalNewTask !== null) {
            modalNewTask.classList.add('hidden');
        }
    } else if(!event.target.classList.contains('mini-profile') ||  event.target.classList.contains('nav-item-current-user_after__hr')) {
        if(minProfile !== null) {
            minProfile.style.animation = 'opacity0 .3s linear forwards';
            setTimeout(()=> minProfile.classList.add('hidden'), 300);
        }
    }
})

window.onload = function() {
    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    if(tbodyCheckbox !== null && allTableCheckbox !== null) {
        ifChacked();

        tbodyCheckbox.forEach((block)=>{
            block.addEventListener('click', ()=>{
                if(block.classList.contains('table-checkbox_checked')) {
                    block.classList.remove('table-checkbox_checked');
                    checkedCounterNoVisible--;
                    checkedCounter--;
                } else {
                    block.classList.add('table-checkbox_checked');
                    checkedCounterNoVisible++;
                    checkedCounter++;
                }
                ifChacked();
            })
        })

        allTableCheckbox.onclick = function() {
            if(allTableCheckbox.classList.contains('table-checkbox_checked')) {
                allTableCheckbox.classList.remove('table-checkbox_checked');
                tbodyCheckbox.forEach((block)=>{
                    block.classList.remove('table-checkbox_checked');
                })
                checkedCounter = 0;
                checkedCounterNoVisible = 0;
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
            if(optionsText !== null) {
                optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
            }
            // if(checkedCounterNoVisible < 1) {
            //     allTableCheckbox.classList.remove('table-checkbox_checked');
            // }
            // tbodyCheckbox.forEach(()=>{
            //     if(checkedCounterNoVisible > 0) {
            //         mainTable.style.animation = 'crawlDown .6s ease-in-out forwards';
            //         setTimeout(function(){
            //             options.classList.remove('hidden');
            //         }, 300)
            //         setTimeout(function(){
            //             options.style.animation = 'opacity1 .6s linear forwards'
            //         }, 310)
            //     } else {
            //         options.style.animation = 'opacity0 .4s linear forwards'
            //         setTimeout(function(){
            //             options.classList.add('hidden');
            //         }, 600)
            //     }
            // })  
        }
    }
}
let profileID = document.querySelector(".profile_id")
let profileLink = document.querySelectorAll("#profile-link");
let sumbitProfile = document.querySelector("#profile")

if (profileLink !== null){
    profileLink.forEach((worker)=>{
        worker.addEventListener("click", ()=>{
            let pID = worker.getAttribute("value");
            profileID.innerHTML = pID
            document.forms['pID'].submit();
        })
    })
}
