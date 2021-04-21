let path = document.location.pathname;
let searchResultMain = path.search('board');
let searchResultAllTasks = path.search('department');
let taskToDelete = 0;


console.log(path, searchResultMain, searchResultAllTasks)
if(searchResultMain >= 1) {
    let buttonToAllTasks = document.querySelector("#to-all-tasks");
    let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");
    let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
    let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

    let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
    let changeSelectedTask = document.querySelectorAll(".change-selected-task");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    let modalNewTask = document.querySelector("#new-task-modal");
    let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

    let allTitles = document.querySelectorAll(".title");
    let titleNewTask = document.querySelector("#new-task-title");

    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let checkedCounter = 0;
    let checkedCounterNoVisible = 0;

    let options = document.querySelector(".options");
    let optionsText = document.querySelector(".options__text");

    let theme = document.querySelector("#theme");
    let switchTheme = document.querySelector(".nav-item-theme");

    getTheme();

    setTitleForTitle();

    ifChacked();

    switchTheme.onclick = function() {
        if(localStorage.getItem('theme') == null || localStorage.getItem('theme') == 'light'){
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        getTheme();
    }

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

    changeSelectedTask.forEach((elem)=>{
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

    tbodyCheckbox.forEach((block)=>{
        block.addEventListener('click', (elem)=>{
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

    function ifChacked() {
        optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
        if(checkedCounterNoVisible < 1) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
        }
        tbodyCheckbox.forEach((block)=>{
            if(checkedCounterNoVisible > 0) {
                options.classList.remove('hidden');
            } else {
                options.classList.add('hidden');
            }
        })
        
    }

    function setTitleForTitle() {
        allTitles.forEach((elem)=>{
            elem.setAttribute('title', elem.textContent);
        })
    }

    function getTheme() {
        if (localStorage.getItem('theme') == 'light') {
            theme.setAttribute('href', './style/light_theme.css');
        } else if(localStorage.getItem('theme') == 'dark') {
            theme.setAttribute('href', './style/dark_theme.css');
        }
    }

} else if(searchResultAllTasks >= 1) {
    let buttonToMain = document.querySelector("#to-main");
    // let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");
    let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
    let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

    let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
    let changeSelectedTask = document.querySelectorAll(".change-selected-task");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    let modalNewTask = document.querySelector("#new-task-modal");
    let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let checkedCounter = 0;
    let checkedCounterNoVisible = 0;

    let allTitles = document.querySelectorAll(".title");

    let options = document.querySelector(".options");
    let optionsText = document.querySelector(".options__text");

    let theme = document.querySelector("#theme");
    let switchTheme = document.querySelector(".nav-item-theme");

    getTheme();

    setTitleForTitle();

    ifChacked();

    // buttonNewTask.onclick = function() {
    //     modalNewTask.classList.toggle('hidden');
    // }

    switchTheme.onclick = function() {
        if(localStorage.getItem('theme') == null || localStorage.getItem('theme') == 'light'){
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        getTheme();
    }

    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }

    buttonToMain.onclick = function() {
        window.location.href = "/board.html";
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

    changeSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalNewTask.classList.toggle('hidden');
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

    tbodyCheckbox.forEach((block)=>{
        block.addEventListener('click', (elem)=>{
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

    function ifChacked() {
        optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
        if(checkedCounterNoVisible < 1) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
        }
        tbodyCheckbox.forEach((block)=>{
            if(checkedCounterNoVisible > 0) {
                options.classList.remove('hidden');
            } else {
                options.classList.add('hidden');
            }
        })
        
    }

    function setTitleForTitle() {
        allTitles.forEach((elem)=>{
            elem.setAttribute('title', elem.textContent);
        })
    }

    function getTheme() {
        if (localStorage.getItem('theme') == 'light') {
            theme.setAttribute('href', './style/light_theme.css');
        } else if(localStorage.getItem('theme') == 'dark') {
            theme.setAttribute('href', './style/dark_theme.css');
        }
    }
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
