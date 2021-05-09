$(document).ready(function() {
    $('#directors-depart').DataTable( {
        "paging":   false,
        "info":     false,
        "order": [[ 1, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 0 }
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

let buttonToTasks = document.querySelector(".instruments__button_bg_todo_list");

if(buttonToTasks !== null) {
    buttonToTasks.onclick = function() {
        window.location.href = '/board';
    }
}