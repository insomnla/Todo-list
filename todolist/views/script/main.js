let tasksCard = document.querySelectorAll(".tasks-card"),
    tasksCard_array = Array.from(tasksCard), // переводим в нормальный массив для сравнения task == task[0]
    modalTasks = Array.from(document.querySelectorAll(".modal--tasks")),
    buttonExit = document.querySelectorAll(".mw-bottom__exit"),
    formNewTasks = document.querySelector(".form--newTasks"),
    btnNewTask = document.querySelector(".bp-item--new-task"),
    modalNewTasks = document.querySelector(".modal--newTasks");




tasksCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        for (var i = 0; i < tasksCard_array.length; i++){
            if (tasksCard_array[i] == elem){
                modalTasks[i].classList.remove('dn');
            }
        }
    });
});

buttonExit.forEach((elem)=>{
    elem.addEventListener('click', (event)=>{
        modalWindow = event.target.parentElement.parentElement.parentElement; // ДА КРИНЖ И ЧТО :OKEK:
        if (modalWindow.parentElement == modalNewTasks){
            modalWindow.parentElement.classList.toggle('dn');
        }
        else modalWindow.classList.toggle('dn');
    });
}); 

formNewTasks.addEventListener('submit', (event)=>{
    event.preventDefault();
});

btnNewTask.addEventListener('click', ()=>{
    modalNewTasks.classList.toggle('dn');
});

