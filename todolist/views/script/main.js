let tasksCard = document.querySelectorAll(".tasks-card");
let modalTasks = document.querySelector(".modal--tasks");
let buttonExit = document.querySelectorAll(".mw-bottom__exit");
let formNewTasks = document.querySelector(".form--newTasks");
let btnNewTask = document.querySelector(".bp-item--new-task");
let modalNewTasks = document.querySelector(".modal--newTasks")




tasksCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        modalTasks.classList.remove('dn');
    });
});

buttonExit.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        if(!modalTasks.classList.contains('dn')){
            modalTasks.classList.add('dn');
        };
        if(!modalNewTasks.classList.contains('dn')){
            modalNewTasks.classList.add('dn');
        };
    });
});

formNewTasks.addEventListener('submit', (event)=>{
    event.preventDefault();
});

btnNewTask.addEventListener('click', ()=>{
    modalNewTasks.classList.remove('dn');
});

