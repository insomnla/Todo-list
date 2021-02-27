let tasksCard = document.querySelectorAll(".tasks-card");
let modalTasks = document.querySelector(".modal--tasks");
let buttonExit = document.querySelector(".mw-bottom__exit");




tasksCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        modalTasks.classList.remove('dn');
    });
});

buttonExit.addEventListener('click', ()=>{
    modalTasks.classList.add('dn');
});
