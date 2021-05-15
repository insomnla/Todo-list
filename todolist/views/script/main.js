let taskToDelete = 0;

let mainTable = document.querySelector("#tasksTable");

let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

let buttonBulkDelete = document.querySelector(".instruments__button_bg_trash");
let buttonNTask = document.querySelector(".button_save");
let buttonSaveChangeTask = document.querySelector(".change_button_save");
let buttonBulkAdd = document.querySelector(".instruments__button_bg_plus");
let buttonBulkReport = document.querySelector(".instruments__button_bg_document");

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

let more = document.querySelectorAll(".more");
let listMore = document.querySelectorAll(".list-more");

let options = document.querySelector(".options");
let optionsText = document.querySelector(".options__text");

let rowsOnTable = document.querySelectorAll("tbody>tr");

let allRowWithCategories = document.querySelectorAll(".categories");
let allRowWithStatus = document.querySelectorAll(".status");

let hrefOnProfile = document.querySelector(".profile");
let titleChangeTask = document.querySelector("#change-task-title");

let exit = document.querySelector(".exit");

setTitleForTitle();

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
            $.post("/add_task", {taskToADD}, function(){
                location.reload();
            }) 
        })
    })
}

if(more !== null) {
    more.forEach((moreElem) => {
        moreElem.onclick = function() {
            let moreId = moreElem.getAttribute("data-id");
            listMore.forEach((listMoreElem) => {
                let listMoreId = listMoreElem.getAttribute("data-id");
                if(moreId == listMoreId) {
                    if(listMoreElem.classList.contains('hidden')) {
                        listMoreElem.classList.remove('hidden');
                        listMoreElem.style.animation = 'opacity1 .3s linear forwards';
                    } else {
                        listMoreElem.style.animation = 'opacity0 .3s linear forwards';
                        setTimeout(()=> listMoreElem.classList.add('hidden'), 300);
                    }
                }
            })
        }   
    })
}

if(deleteSelectedTask !== null) {
    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            taskToDelete = (elem.target.getAttribute("data-key"));
            console.log(taskToDelete);
            console.log(elem.target);
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
       $.post("/delete", {taskToDelete}, function(){
            location.reload();
        })
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

function delDisabledMode(button) {
    button.removeAttribute('disabled');
}

function setDisabledMode(button) {
    button.setAttribute('disabled', '');
}

function setTitleForTitle() {
    allTitles.forEach((elem)=>{
        elem.setAttribute('title', elem.textContent);
    })
}

function saveTask(){
    let desc = document.querySelector("#new_task_desc"),
        employee_id = -1;
        employee = document.querySelector("#new_task_employee")
        deadline = document.querySelector("#new_task_deadline"),
        tname = document.querySelector("#new_task_name"),
        nameValue = tname.value,
        descValue = desc.value,
        deadlineValue = deadline.value,
        taskCATEG_ID  = document.querySelector("#new_task_categ").value;
        taskSTATUS_ID = document.querySelector("#new_task_status").value;
        if (employee !== null){
            employee_id = employee.value;
        }
        console.log(employee_id, descValue, nameValue , deadlineValue, taskCATEG_ID, taskSTATUS_ID)
        $.post("/new_task", {employee_id, descValue, nameValue , deadlineValue, taskCATEG_ID, taskSTATUS_ID}, ()=>{
            window.location.reload();
        }) 
}

function get_task(tableRow){ 
    let newTaskOPT = document.querySelectorAll("#change-option");
        addedValue = 0;
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
            task.selected = true;
        }
        if (task.textContent == taskSTATUS){
            task.selected = true;
        }
    })
    buttonSaveChangeTask.onclick = function() {
        let taskCATEG_ID  = document.querySelector("#change_task_categ").value;
        let taskSTATUS_ID = document.querySelector("#change_task_status").value;
        let taskDESC = desc.value;
        let taskDEADLINE = deadline.value;
        if(desc.value !== '' && deadline.value !== '') {
            saveChangeTask(taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID);
        } else {
            alert('Пожалуйста заполните все элементы таблицы');
        }
    }
}

function saveChangeTask(taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID) {
    console.log(taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID)
    $.post("/update", {taskID, taskDESC, taskDEADLINE, taskCATEG_ID, taskSTATUS_ID}, ()=>{
        window.location.reload();
    }) 
}

getNewStatusAtTasks();

function getNewStatusAtTasks() {
    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    if(currentDay < 10) {
        currentDay = `0${currentDay}`;
    }

    if(currentMonth < 10) {
        currentMonth = `0${currentMonth}`;
    }

    let currentDate = `${currentDay}.${currentMonth}.${currentYear}`;

    let deadLine = document.querySelectorAll(".date");

    let idArray = new Array();

    if(deadLine !== null) {
        deadLine.forEach((item)=>{
            let dateArray = item.textContent.split(' ');
            dateArray = dateArray.filter(element => element !== "");
            dateArray.shift();
            dateArray.shift();
            let deadLineDate = dateArray[0].split('.');
            dateArray.push(item.parentNode.getAttribute("data-id"));
            let coincidences = dateArray.indexOf(currentDate);
            if(deadLineDate[2] < currentYear) {
                idArray.push(dateArray[1]);
            } else if (deadLineDate[1] < currentMonth) {
                idArray.push(dateArray[1]);
            } else if (deadLineDate[0] < currentDay) {
                idArray.push(dateArray[1]);
            } else if(coincidences == 0) {
                idArray.push(dateArray[1]);
            }
        })
        $.post("/deadline_check", {idArray}, function(){
        
        })
    }
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
            if(checkedCounterNoVisible < 1) {
                allTableCheckbox.classList.remove('table-checkbox_checked');
            }
            tbodyCheckbox.forEach(()=>{
                if(checkedCounterNoVisible > 0) {
                    if(buttonBulkDelete !== null) {
                        delDisabledMode(buttonBulkDelete);
                    }
                    if(buttonBulkAdd !== null) {
                        delDisabledMode(buttonBulkAdd);
                    }
                    if(buttonBulkReport !== null) {
                        delDisabledMode(buttonBulkReport);
                    }
                    // mainTable.style.animation = 'crawlDown .6s ease-in-out forwards';
                    // setTimeout(function(){
                    //     options.classList.remove('hidden');
                    // }, 300)
                    // setTimeout(function(){
                    //     options.style.animation = 'opacity1 .6s linear forwards'
                    // }, 310)
                } else {
                    if(buttonBulkDelete !== null) {
                        setDisabledMode(buttonBulkDelete);
                    }
                    if(buttonBulkAdd !== null) {
                        setDisabledMode(buttonBulkAdd);
                    }
                    if(buttonBulkReport !== null) {
                        setDisabledMode(buttonBulkReport);
                    }
                    // options.style.animation = 'opacity0 .4s linear forwards'
                    // setTimeout(function(){
                    //     options.classList.add('hidden');
                    // }, 600)
                }
            })  
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
