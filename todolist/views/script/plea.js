$(document).ready(function() {
    $('#pleaTable').DataTable( {
        "paging":   false,
        "info":     false,
        "order": [[ 1, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 0 },
            { orderable: false, targets: 5 }
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

const socket =  io('http://localhost:3000',{origins:"*"});
let rowsOnTable = document.querySelectorAll("tbody>tr");

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

let allRowWithCategories = document.querySelectorAll(".categories");
let allRowWithStatus = document.querySelectorAll(".status");

let buttonAccepted = document.querySelectorAll(".button_accepted")
let buttonDenied= document.querySelectorAll(".button_denied")
let buttonAwaits= document.querySelectorAll(".button_awaits")


let buttonNPlea = document.querySelector("#new-plea-button");
let buttonCloseModalPlea = document.querySelector("#close-new-plea-button");
let buttonSavePlea = document.querySelector(".button_save");
let buttonAllPlea = document.querySelector("#all_pleas");

let modalNewPlea = document.querySelector("#new-plea-modal");

buttonNPlea.addEventListener("click", ()=>{
    modalNewPlea.classList.toggle('hidden');
})

buttonCloseModalPlea.addEventListener("click", ()=>{
    modalNewPlea.classList.toggle("hidden");
})

buttonSavePlea.addEventListener("click", ()=>{
    categ_id = document.querySelector("#new_plea_categ").value;
    $.post("/new_plea", {categ_id}, ()=>{
        window.location.reload();
    }) 
})

if (buttonAllPlea !== null){
    buttonAllPlea.addEventListener("click", ()=>{
        window.location.href = "/all_pleas"
    })
}

if (buttonAccepted !== null){
    buttonAccepted.forEach((button) => {
        button.addEventListener("click",(elem)=>{
            plea_id = elem.target.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.children[1].getAttribute("value");
            categ = elem.target.parentNode.children[2].textContent;
            socket.emit("plea_upd",{worker : worker_id, desc : categ, sender : id, respond :  "ДА"});
            $.post("/update_plea",{ worker : worker_id, id : plea_id, respond :  "ДА"}, ()=>{
                window.location.reload();
            }); 
        })
    });
}

if (buttonDenied !== null){
    buttonDenied.forEach((button) => {
        button.addEventListener("click",(elem)=>{
            plea_id = elem.target.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.children[1].getAttribute("value");
            categ = elem.target.parentNode.children[2].textContent;
            socket.emit("plea_upd",{ worker : worker_id, desc : categ, sender : id, respond : "НЕТ"});
            $.post("/update_plea",{  worker : worker_id, id : plea_id, respond : "НЕТ"}, ()=>{
                window.location.reload();
            }); 
        })
    });
}

if (buttonAwaits !== null){
    buttonAwaits.forEach((button) =>{
        button.addEventListener("click", (elem)=>{
            plea_id = elem.target.parentNode.getAttribute("data-id");
            worker_id = elem.target.parentNode.children[1].getAttribute("value");
            categ = elem.target.parentNode.children[2].textContent;
            socket.emit("plea_upd",{ worker : worker_id, desc : categ, sender : id, respond : "РАССМОТРЕНИЕ"});
            $.post("/update_plea",{  worker : worker_id, id : plea_id, respond : "РАССМОТРЕНИЕ"}, ()=>{
                window.location.reload();
            }); 
        })
    })
}