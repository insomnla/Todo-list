$(document).ready(function() {
    $('#tasksTable').DataTable( {
        "paging":   false,
        "info":     false,
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
    } );
} );


onloadFunc();
function onloadFunc() {
    let searchForm = document.querySelector(".dataTables_filter");
    if(searchForm == null) {
        setTimeout(onloadFunc, 100);
    } else {
        let filters = document.querySelector(".filters");
        let searchInput = document.querySelector("input[type=search]");
        let searchFormLable = document.querySelector('.dataTables_filter>label');

        
        filters.appendChild(searchForm);
        searchForm.appendChild(searchInput);
        searchForm.removeChild(searchFormLable);
        searchForm.classList.add('filters-item');
        searchInput.classList.add('filter-item__input');

        let div = document.createElement('div');
        div.classList.add('filters-item__subtitle');
        div.textContent = 'Поиск по задачам';
        searchForm.appendChild(div);
    }
}

let buttonToAllTasks = document.querySelector("#to-all-tasks");
let buttonToDirectDepart = document.querySelector(".instruments__button_bg_todo_list");
let buttonNewTask = document.querySelector("#new-task-button");
let buttonNewCloseTask = document.querySelector("#close-new-task-button");
let buttonCloseChangeTask = document.querySelector("#close-change-task-button");
let buttonToDirectors = document.querySelector(".instruments__button_bg_directors");

if(buttonToDirectors !== null) {
    buttonToDirectors.onclick = function() {
        window.location.href = '/director';
    }
}

if(buttonToDirectDepart !== null) {
    buttonToDirectDepart.onclick = function() {
        window.location.href = '/direct_depart';
    }
}

buttonNewTask.onclick = function() {
    modalNewTask.classList.toggle('hidden');
}
buttonNewCloseTask.onclick = function() {
    modalNewTask.classList.toggle('hidden');
}
buttonCloseChangeTask.onclick = function() {
    modalChangeTask.classList.toggle('hidden');
}

buttonToAllTasks.onclick = function() {
    window.location.href = "/department";
}