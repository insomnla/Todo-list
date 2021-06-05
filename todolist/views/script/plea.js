$(document).ready(function() {
    $('#pleaTableAll').DataTable( {
        "paging":   false,
        "info":     false,
        "order": [[ 0, "desc" ]],
        columnDefs: [
            { orderable: false, targets: 4 }
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

$(document).ready(function() {
    $('#pleaTable').DataTable( {
        "paging":   false,
        "info":     false,
        "order": [[ 0, "desc" ]],
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

// const socket =  io('http://localhost:3000',{origins:"*"});
// let rowsOnTable = document.querySelectorAll("tbody>tr");

socket.on("connect", () => {
    console.log(socket.id);
    socket.send(socket.id, id);
    socket.on("new_task", (data)=>{
        createNotifElement(data);
        notif_sound.play();
    })
});

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

// let allRowWithCategories = document.querySelectorAll(".categories");
// let allRowWithStatus = document.querySelectorAll(".status");

let buttonAccepted = document.querySelectorAll(".button_accepted")
let buttonDenied= document.querySelectorAll(".button_denied")
let buttonAwaits= document.querySelectorAll(".button_awaits")

let pleaDate = document.querySelectorAll(".date-pleas");
  
  
let buttonNPlea = document.querySelector("#new-plea-button");
let buttonCloseModalPlea = document.querySelector("#close-new-plea-button");
let buttonSavePlea = document.querySelector(".button_save");
let buttonAllPlea = document.querySelector("#all_pleas");

let modalNewPlea = document.querySelector("#new-plea-modal");


if (buttonNPlea !== null){
buttonNPlea.addEventListener("click", ()=>{
    modalNewPlea.classList.toggle('hidden');
})
}

if (buttonCloseModalPlea !== null){
buttonCloseModalPlea.addEventListener("click", ()=>{
    modalNewPlea.classList.toggle("hidden");
})
}

if (buttonSavePlea !== null){
    buttonSavePlea.addEventListener("click", ()=>{
        var today = new Date();
        var date = today.getDate() + '.' + (today.getMonth()+1)+ '.' + today.getFullYear();
        categ_id = document.querySelector("#new_plea_categ").value;
        $.post("/new_plea", {categ_id, extra : date}, ()=>{
            window.location.reload();
        }) 
    })
    
}



changeDate();


if (buttonAccepted !== null){
    buttonAccepted.forEach((button) => {
        button.addEventListener("click",(elem)=>{
            plea_id = elem.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.parentNode.parentNode.children[0].getAttribute("value");
            categ = elem.target.parentNode.parentNode.parentNode.children[1].textContent;
            date = elem.target.parentNode.parentNode.parentNode.children[2].textContent;
            if (categ.substring(0,6) == "Отпуск"){
                let dates = vacationDate(date);
                socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "ДА_ОТПУСК"});
                $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "ДА", dates : dates }, ()=>{
                window.location.reload();
            }); 
            } else {
            socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "ДА"});
            $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "ДА"}, ()=>{
               window.location.reload();
            }); 
        }  
        }) 
    });
}

if (buttonDenied !== null){
    buttonDenied.forEach((button) => {
        button.addEventListener("click",(elem)=>{
            plea_id = elem.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.parentNode.parentNode.children[0].getAttribute("value");
            categ = elem.target.parentNode.parentNode.parentNode.children[1].textContent;
            date = elem.target.parentNode.parentNode.parentNode.children[2].textContent;
            if (categ.substring(0,6) == "Отпуск"){
                let dates = vacationDate(date);
                days = datesDifference(date);
                socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "НЕТ_ОТПУСК"});
                $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "НЕТ", dates : dates,  days : days }, ()=>{
                window.location.reload();
            }); 
            } else { 
            socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "НЕТ"});
            $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "НЕТ"}, ()=>{
                window.location.reload();
            }); 
        } 
        })
    });
}

if (buttonAwaits !== null){
    buttonAwaits.forEach((button) =>{
        button.addEventListener("click", (elem)=>{
            plea_id = elem.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.parentNode.parentNode.children[0].getAttribute("value");
            categ = elem.target.parentNode.parentNode.parentNode.children[1].textContent;
            console.log(plea_id, worker_id, categ);
            if (categ.substring(0,6) == "Отпуск"){
                socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "РАССМОТРЕНИЕ_ОТПУСК"});
                $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "РАССМОТРЕНИЕ"}, ()=>{
                window.location.reload();
            }); 
            } else {
            socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "РАССМОТРЕНИЕ"});
            $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "РАССМОТРЕНИЕ"}, ()=>{
                window.location.reload();
            });  
        } 
        })
    })
}

function changeDate() {
    pleaDate.forEach((elem) => {
        let pleaDateArray = elem.dataset['date'].split(' ');

        let firstDateArray = pleaDateArray[0].split('.');
        let lastDateArray = pleaDateArray[2].split('.');

        let firstDay = firstDateArray[0];
        let firstMonth = firstDateArray[1];
        let firstYear = firstDateArray[2];

        let lastDay = lastDateArray[0];
        let lastMonth = lastDateArray[1];
        let lastYear = lastDateArray[2];

        if(firstDay < 10) {
            firstDay = `0${firstDay}`;
        }
        if(firstMonth < 10) {
            firstMonth = `0${firstMonth}`;
        }
        if(lastDay < 10) {
            lastDay = `0${lastDay}`;
        }
        if(lastMonth < 10) {
            lastMonth = `0${lastMonth}`;
        }
        elem.textContent = `${firstDay}.${firstMonth}.${firstYear} - ${lastDay}.${lastMonth}.${lastYear}`

        console.log(firstDay, firstMonth, lastYear, firstDay, lastMonth, lastYear)
    })
}

function datesDifference(date){
    dates = date.split("-");
    e_date = dates[0].split(".");
    s_date = dates[1].split(".");
    date_start = new Date(Number(e_date[2]), Number(e_date[1]), Number(e_date[0]))
    date_end = new Date(Number(s_date[2]), Number(s_date[1]), Number(s_date[0]))
    return ((date_end - date_start)/1000/86400) + 1
}

function vacationDate(date){
    dates = date.split("-");
    e_date = dates[0].split(".");
    s_date = dates[1].split(".");
    a = Number(e_date[0]) + "." + Number(e_date[1]) + "." + Number(e_date[2]);
    b = Number(s_date[0]) + "." + Number(s_date[1]) + "." + Number(s_date[2]);
    return [a, b]
}