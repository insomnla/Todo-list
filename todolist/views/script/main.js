let tasksCard = document.querySelectorAll(".tasks-card");
let modalTasks = document.querySelector(".modal--tasks");
let modalNewTasks = document.querySelector(".modal--newTasks")
let modalError = document.querySelector(".modal--error");


let buttonExit = document.querySelectorAll(".mw-bottom__exit");
let buttonNewTask = document.querySelector(".bp-item--new-task");
let buttonAdd = document.querySelector(".mw-bottom__add");


let formNewTasks = document.querySelector(".form--newTasks");
let symbol = document.querySelectorAll(".symbol");
let contentHiddenItem = document.querySelectorAll(".mw-content__hidden-item");



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
        if(!modalError.classList.contains('dn')){
            modalError.classList.add('dn');
        };
    });
});

formNewTasks.addEventListener('submit', (event)=>{
    event.preventDefault();
});

buttonNewTask.addEventListener('click', ()=>{
    modalNewTasks.classList.remove('dn');
});

buttonAdd.addEventListener('click', ()=>{
    modalError.classList.remove('dn');
});



symbol.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        if (elem.classList.contains('tilt')) {
            elem.classList.add('reverseTilt');
            elem.classList.remove('tilt');
        } else {
            elem.classList.add('tilt');
            elem.classList.remove('reverseTilt');
        }
        let array = new Array;
        array = elem.textContent.split('.');
        contentHiddenItem.forEach((elem)=>{
            let key = elem.dataset['key'];
            if(+key == array[0]) {
                elem.classList.toggle('dn');
            }
        });
    });
});