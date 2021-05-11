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

buttonChangeAllUsers.forEach((elem) => {
    elem.onclick = function() {
        let tableRow = elem.parentNode.parentNode.parentNode;
        let newTitle = `${tableRow.children[1].textContent} ${tableRow.children[2].textContent} ${tableRow.children[3].textContent}`;
        titleChangeAllUsers.textContent = `Изменение данных сотрудника: ${newTitle}`;
        modalChangeAllUsers.classList.toggle('hidden');
    }
})

buttonCloseChangeAllUsers.onclick = function() {
    modalChangeAllUsers.classList.toggle('hidden');
}

buttonChangeAllTasks.forEach((elem) => {
    elem.onclick = function() {
        let tableRow = elem.parentNode.parentNode.parentNode;
        let newTitle = tableRow.children[1].textContent;
        titleChangeAllTasks.textContent = `Изменение задачи: ${newTitle}`;
        modalChangeAllTasks.classList.toggle('hidden');
    }
})

buttonCloseChangeAllTasks.onclick = function() {
    modalChangeAllTasks.classList.toggle('hidden');
}