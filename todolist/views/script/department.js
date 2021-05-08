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
    $('#userInformationTable').DataTable( {
        "paging":   false,
        "info":     false,
        "order": false,
        "search": false,
    });
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

let buttonToMain = document.querySelector("#to-main");
let buttonCloseChangeTask = document.querySelector("#close-change-task-button");
let buttonNewTask = document.querySelector("#new-task-button");
let buttonNewCloseTask = document.querySelector("#close-new-task-button");

buttonCloseChangeTask.onclick = function() {
    modalChangeTask.classList.toggle('hidden');
}

buttonToMain.onclick = function() {
    window.location.href = "/board";
}