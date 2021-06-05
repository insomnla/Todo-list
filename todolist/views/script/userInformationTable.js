$(document).ready(function() {
    $('#userInformationTable').DataTable( {
        "autoWidth": true,
        "paging":   false,
        "info":     false,
        "order": false,
        columnDefs: [
            { orderable: false, targets: 0 },
            { orderable: false, targets: 1 },
            { orderable: false, targets: 2 },
            { orderable: false, targets: 3 },
            { orderable: false, targets: 4 },
            { orderable: false, targets: 5 },
        ],
        "searching": false,
        language: {
            "loadingRecords": "Загрузка...",
            "processing":     "В процессе...",
            "search":         "Поиск:",
            "emptyTable":     "Список задач пуст",
            "zeroRecords":    "По вашему запросу ничего не найдено",
            "paginate": {
                "first":      "Первый",
                "last":       "Последний",
                "next":       "Следующий",
                "previous":   "Предыдущий"
            },
            "aria": {
                "sortAscending":  ": активирована сортировка колонок по возврастанию",
                "sortDescending": ": активирована сортировка колонок по убыванию"
            }
        },
    });
    $('#userTasksTable').DataTable( {
        "autoWidth": true,
        "paging":   false,
        "info":     false,
        "searching": false,
        "order": [[ 1, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 0 },
            { orderable: false, targets: 6 }
        ],
        language: {
            "loadingRecords": "Загрузка...",
            "processing":     "В процессе...",
            "search":         "Поиск:",
            "emptyTable":     "Список задач пуст",
            "zeroRecords":    "По вашему запросу ничего не найдено",
            "paginate": {
                "first":      "Первый",
                "last":       "Последний",
                "next":       "Следующий",
                "previous":   "Предыдущий"
            },
            "aria": {
                "sortAscending":  ": активирована сортировка колонок по возврастанию",
                "sortDescending": ": активирована сортировка колонок по убыванию"
            }
        },
    });
});

let allUsers = document.querySelector("#allUsers");
let allTasks = document.querySelector("#allTasks");

if(allUsers !== null) {
    $('#allUsers').DataTable( {
        "autoWidth": true,
        "paging":   false,
        "info":     false,
        "searching": true,
        "order": [[ 0, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 7 },
        ],
        language: {
            "loadingRecords": "Загрузка...",
            "processing":     "В процессе...",
            "search":         "Поиск:",
            "emptyTable":     "Список задач пуст",
            "zeroRecords":    "По вашему запросу ничего не найдено",
            "paginate": {
                "first":      "Первый",
                "last":       "Последний",
                "next":       "Следующий",
                "previous":   "Предыдущий"
            },
            "aria": {
                "sortAscending":  ": активирована сортировка колонок по возврастанию",
                "sortDescending": ": активирована сортировка колонок по убыванию"
            }
        },
    });
}

if(allTasks !== null) {
    $('#allTasks').DataTable( {
        "autoWidth": true,
        "paging":   false,
        "info":     false,
        "searching": true,
        "order": [[ 0, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 7 }
        ],
        language: {
            "loadingRecords": "Загрузка...",
            "processing":     "В процессе...",
            "search":         "Поиск:",
            "emptyTable":     "Список задач пуст",
            "zeroRecords":    "По вашему запросу ничего не найдено",
            "paginate": {
                "first":      "Первый",
                "last":       "Последний",
                "next":       "Следующий",
                "previous":   "Предыдущий"
            },
            "aria": {
                "sortAscending":  ": активирована сортировка колонок по возврастанию",
                "sortDescending": ": активирована сортировка колонок по убыванию"
            }
        },
    });
}

let buttonCloseChangeAllUsers = document.querySelector("#close-change-allUsers-button");
let buttonCloseChangeAllTasks = document.querySelector("#close-change-allTasks-button");
let buttonChangeAllUsers = document.querySelectorAll(".change-selected-task-for-allUsers")
let buttonChangeAllTasks = document.querySelectorAll(".change-selected-task-for-allTasks")

let modalChangeAllUsers = document.querySelector("#change-modal-for-allUsers");
let modalChangeAllTasks = document.querySelector("#change-modal-for-allTasks");

let titleChangeAllUsers = document.querySelector("#change-allUsers-title");
let titleChangeAllTasks = document.querySelector("#change-allTasks-title");

if(buttonChangeAllUsers !== null) {
    buttonChangeAllUsers.forEach((elem) => {
        elem.onclick = function() {
            let tableRow = elem.parentNode.parentNode.parentNode;
            let newTitle = `${tableRow.children[1].textContent}`;
            titleChangeAllUsers.textContent = `Изменение данных сотрудника: ${newTitle}`;
            modalChangeAllUsers.classList.toggle('hidden');
            get_users(tableRow);
        }
    })
}

if(buttonCloseChangeAllUsers !== null) {
    buttonCloseChangeAllUsers.onclick = function() {
        modalChangeAllUsers.classList.toggle('hidden');
    }
}

if(buttonChangeAllTasks !== null) {
    buttonChangeAllTasks.forEach((elem) => {
        elem.onclick = function() {
            let tableRow = elem.parentNode.parentNode.parentNode;
            let newTitle = tableRow.children[1].textContent;
            titleChangeAllTasks.textContent = `Изменение задачи: ${newTitle}`;
            modalChangeAllTasks.classList.toggle('hidden');
            get_tasks(tableRow);
        }
    })
}

if(buttonCloseChangeAllTasks !== null) {
    buttonCloseChangeAllTasks.onclick = function() {
        modalChangeAllTasks.classList.toggle('hidden');
    }
}

function get_users(tableRow){ 
    let btn_save = document.querySelector("#change_user"),
        user = document.querySelectorAll(".user"),
        roles = document.querySelectorAll("#role"),
        roleValue = tableRow.children[4].textContent,
        departments = document.querySelectorAll("#department"),
        departmentValue = tableRow.children[5].textContent,
        user_array = Array.from(user),
        fio = tableRow.children[1].textContent.split(" ");
    user_array[0].value = fio[0];
    user_array[1].value = fio[1];
    user_array[2].value = fio[2];
    user_array[4].value = tableRow.children[3].textContent;
    user_array[3].value = tableRow.children[2].textContent;
    user_array[5].value = tableRow.children[6].textContent;
    departments.forEach((option)=>{
        if (option.textContent == departmentValue){
            option.selected = true;
        }
    })
    roles.forEach((option)=>{
        if (option.textContent == roleValue){
            option.selected = true;
        }
    })
    btn_save.addEventListener("click", ()=>{
        let user_upd = document.querySelectorAll(".user"),
            updArray = Array.from(user_upd);
        let worker_id = tableRow.children[0].textContent,
            fio_new = [updArray[0].value, updArray[1].value, updArray[2].value],
            phone = updArray[3].value,
            mail = updArray[4].value,
            room = updArray[5].value;
        let userROLE_ID  = document.querySelector(".role").value;
        let userDEPARTMENT_ID = document.querySelector(".department").value;
        console.log(userROLE_ID + " " + userDEPARTMENT_ID);
        if(updArray[0].value !== '' && updArray[1].value !== '' && updArray[2].value !== '' && phone !== '' && room !== '') {
            $.post("/update_worker", {worker_id, fio_new, mail, userROLE_ID, userDEPARTMENT_ID, phone, room}, ()=>{
                window.location.reload();
            })
        } else {
            alert('Пожалуйста заполните все элементы таблицы');
        }
    }) 
}

function get_tasks(tableRow){
    let btn_save = document.querySelector("#change_task"),
        tasks_input = document.querySelectorAll(".task"),
        workers = document.querySelectorAll("#workers")
        categories = document.querySelectorAll("#categories"),
        statuses = document.querySelectorAll("#statuses")
        tasksArray = Array.from(tasks_input),
        tasksArray[0].value = tableRow.children[1].textContent,
        tasksArray[1].value = tableRow.children[2].textContent,
        tasksArray[2].value = tableRow.children[3].textContent,
        worker_ = tableRow.children[4].textContent,
        categorie_ = tableRow.children[5].textContent,
        status_ = tableRow.children[6].textContent,
    workers.forEach((worker)=>{
        if (worker.textContent == worker_){
            worker.selected = true;
        }
    })
    categories.forEach((categorie)=>{
        if (categorie.textContent == categorie_){
            categorie.selected = true;
        }
    })
    statuses.forEach((status)=>{
        if (status.textContent == status_){
            status.selected = true;
        }
    })
    btn_save.addEventListener("click", ()=>{
        console.log( tableRow.children[0].textContent)
        let task_id = tableRow.children[0].textContent,
            tasks_upd = document.querySelectorAll(".task"),
            taskArray = Array.from(tasks_upd),
            name = tasksArray[0].value,
            desc = tasksArray[1].value,
            deadline = tasksArray[2].value,
            worker_id = document.querySelector(".workers").value;
            categories_id = document.querySelector(".categories").value;
            statuses_id = document.querySelector(".statuses").value;
        console.log(worker_id);
        if(name !== '' && desc !== '' && deadline !== '') {
            $.post("/update_task", {task_id, name, desc, deadline, worker_id, categories_id, statuses_id}, ()=>{
                window.location.reload();
            }) 
        } else {
            alert('Пожалуйста заполните все элементы таблицы');
        }
    }) 
}