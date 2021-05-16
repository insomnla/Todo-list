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

let buttonToAllTasks = document.querySelector("#to-all-tasks");
let buttonToDirectDepart = document.querySelector(".instruments__button_bg_todo_list");
let buttonNewTaskForEmployee = document.querySelector("#new-task-for-directDepart-button");
let buttonNewTaskForEmployeeClose = document.querySelector("#close-new-task-for-directDepart-button");
let buttonCloseChangeTask = document.querySelector("#close-change-task-button");

let modalNewTaskForEmployee = document.querySelector("#new-task-modal-for-directDepart");

let formItemInput = document.querySelectorAll(".form-item__input");

let profiles = document.querySelectorAll("#profiles");

profiles.forEach((profile)=>{
    profile.addEventListener("click", ()=>{
        profile_id = profile.parentNode.getAttribute("value");
        artificialPost(profile_id);
    })
})

buttonNewTaskForEmployee.onclick = function() {
    modalNewTaskForEmployee.classList.toggle('hidden');
    if(!modalNewTaskForEmployee.classList.contains('hidden')) {
        buttonNTask.onclick = function() {
            if(formItemInput[0].value !== '' && formItemInput[1].value !== '' && formItemInput[2].value !== '') {
                saveTask();
            } else {
                alert('Пожалуйста заполните все элементы таблицы')
            }
        }
    }
}

buttonNewTaskForEmployeeClose.onclick = function() {
    modalNewTaskForEmployee.classList.toggle('hidden');
}

buttonCloseChangeTask.onclick = function() {
    modalChangeTask.classList.toggle('hidden');
}

if(buttonToDirectDepart !== null) {
    buttonToDirectDepart.onclick = function() {
        window.location.href = '/board';
    }
}

buttonToAllTasks.onclick = function() {
    window.location.href = "/department";
}

function artificialPost(profile_id) {
    var form = document.createElement('form');
    var input = document.createElement('input');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/profile?id=' + profile_id);
    form.setAttribute('value', profile_id);
    form.style.display = 'hidden';
    form.name = "dep_id";
    form.innerHTML = profile_id;
    document.body.appendChild(form)
    form.appendChild(input)
    input.setAttribute('value', profile_id);
    input.setAttribute('name', 'profile_id');
    console.log(form);
    form.submit();
}