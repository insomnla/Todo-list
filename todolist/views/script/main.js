let taskToDelete = 0;

let mainTable = document.querySelector("#tasksTable");

let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

let buttonBulkDelete = document.querySelector(".instruments__button_bg_trash");
let buttonNTask = document.querySelector(".button_save");

let navItemCurrentUser = document.querySelector(".nav-item-current-user");
let minProfile = document.querySelector(".nav-item-current-user_after");

let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
let chengeSelectedTask = document.querySelectorAll(".change-selected-task");

let modalNewTask = document.querySelector("#new-task-modal");
let modalChangeTask = document.querySelector("#change-task-modal");
let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

let checkedCounter = 0;
let checkedCounterNoVisible = 0;

let allTitles = document.querySelectorAll(".title");

let options = document.querySelector(".options");
let optionsText = document.querySelector(".options__text");

let filterItemSelect = document.querySelectorAll(".filters-item-select");
let selectCategories = document.querySelector("#select-categories");
let selectStatus = document.querySelector("#select-status");

let rowsOnTable = document.querySelectorAll("tbody>tr");

let allRowWithCategories = document.querySelectorAll(".categories");
let allRowWithStatus = document.querySelectorAll(".status");

let hrefOnProfile = document.querySelector(".profile");
let titleChangeTask = document.querySelector("#change-task-title");

setTitleForTitle();

buttonNTask.onclick = function(){
    let desc = document.querySelector("#new_task_desc"),
        deadline = document.querySelector("#new_task_deadline"),
        descValue = desc.value,
        deadlineValue = deadline.value,
        taskCATEG_ID  = document.querySelector("#new_task_categ").options.selectedIndex + 1,
        taskSTATUS_ID = document.querySelector("#new_task_status").options.selectedIndex + 1;
        $.post("/new_task", {descValue, deadlineValue, taskCATEG_ID, taskSTATUS_ID}, ()=>{
            window.location.reload();
        })
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
        $.post("/delete", {taskToDelete}, function(){
            location.reload();
        }) 
    }
}

hrefOnProfile.onclick = function() {
    window.location.href = '/profile';
}

navItemCurrentUser.onclick = function() {
    if(minProfile.classList.contains('hidden')) {
        minProfile.classList.remove('hidden');
        minProfile.style.animation = 'opacity1 .3s linear forwards';
    } else {
        minProfile.style.animation = 'opacity0 .3s linear forwards';
        setTimeout(()=> minProfile.classList.add('hidden'), 300);
    }
}

deleteSelectedTask.forEach((elem)=>{
    elem.addEventListener('click', (elem)=>{
        taskToDelete = (elem.target.getAttribute("data-key"));
        modalAlertDeletTask.classList.toggle('hidden');
    })
})

buttonCloseModalAlert.onclick = function() {
    modalAlertDeletTask.classList.toggle('hidden');
    taskToDelete = 0;
}

buttonYesModalAlert.onclick = function() {
    $.post("/delete", {taskToDelete}, function(){
        location.reload();
    })
    modalAlertDeletTask.classList.toggle('hidden');
}

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

filterItemSelect.forEach((elem, index)=>{
    elem.addEventListener('change', ()=>{
        if(index == 0) {
            if(selectStatus.value == 'All') {
                document.querySelector(".after-table").classList.add('hidden');
                allRowWithCategories.forEach((elem)=>{
                    elem.parentNode.classList.remove('hidden');
                    elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == 'All') {
                        elem.parentNode.classList.remove('hidden');
                        elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    } else if(selectCategories.value !== elem.textContent) {
                        elem.parentNode.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            elem.parentNode.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else if(selectCategories.value == 'All') {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == 'All' && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            }
            checkForEmptiness();
        } else if(index == 1) {
            if(selectCategories.value == 'All') {
                document.querySelector(".after-table").classList.add('hidden');
                allRowWithStatus.forEach((elem)=>{
                    elem.parentNode.parentNode.classList.remove('hidden');
                    elem.parentNode.parentNode.style.animation = "opacity1 .6s linear forwards";
                    if(selectStatus.value == 'All') {
                        elem.parentNode.classList.remove('hidden');
                        elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    } else if(selectStatus.value !== elem.textContent) {
                        elem.parentNode.parentNode.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            elem.parentNode.parentNode.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else if(selectStatus.value == 'All') {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == 'All') {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            }
        }
    })
})

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
    let btn_save = document.querySelector(".change_button_save")
    let desc = document.querySelector("#change_task_desc"),
        deadline = document.querySelector("#change_task_deadline"),
        taskID = tableRow.children[1].textContent,
        taskCATEG = tableRow.children[2].textContent,
        taskDESC = tableRow.children[3].textContent,
        taskDEADLINE = tableRow.children[4].textContent,
        taskSTATUS = tableRow.children[5].textContent,
        newTaskOPT = document.querySelectorAll("#change-option");
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
            optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
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
profileLink.forEach((worker)=>{
    worker.addEventListener("click", ()=>{
        let pID = worker.getAttribute("value");
        profileID.innerHTML = pID
        document.forms['pID'].submit();
    })
})
