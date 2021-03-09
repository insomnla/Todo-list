let tasksCard = document.querySelectorAll(".tasks-card");
let modalTasks = document.querySelector(".modal--tasks");
let modalNewTasks = document.querySelector(".modal--newTasks")
let modalError = document.querySelector(".modal--error");


let formNewtasks = document.querySelector('.form--newTasks');
let formCreateTask =document.querySelector('.form-createTask');


let buttonExit = document.querySelectorAll(".mw-bottom__exit");
let buttonNewTask = document.querySelector(".bp-item--new-task");
let buttonAdd = document.querySelector(".mw-bottom__add");
let buttonCreateTask = document.querySelector(".mw-top__button");
let buttonCreateBack = document.querySelector(".mw-top__button-back");


let symbol = document.querySelectorAll(".symbol");
let contentHiddenItem = document.querySelectorAll(".mw-content__hidden-item");
let dateInNewTasks = document.querySelectorAll(".task-chek__deadline");


tasksCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        modalTasks.classList.remove('dn');
        modalTasks.firstChild.nextSibling.style.animation = 'popUp .4s ease-in-out forwards';
        let arr = elem.dataset['key'].split(' ');
        let title = arr[0];
        let desc = elem.dataset['desc'];
        let deadline = setDeadline(elem);
        document.querySelector(".mw-top__title").textContent = title;
        document.querySelector(".mw-top__deadline").textContent = deadline;
        document.querySelector(".mw-content__description").textContent = desc;
    });
});

console.dir(modalTasks.firstChild.nextSibling);

buttonExit.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        if(!modalTasks.classList.contains('dn')){
            modalTasks.firstChild.nextSibling.style.animation = 'popDown .4s ease-in-out forwards';
            setTimeout(()=>{
                modalTasks.classList.add('dn');
            }, 400)
        } else if(!modalNewTasks.classList.contains('dn')){
            modalNewTasks.firstChild.nextSibling.style.animation = 'popDown .4s ease-in-out forwards';
            setTimeout(()=>{
                modalNewTasks.classList.add('dn');
            }, 400)
        } else if(!modalError.classList.contains('dn')){
            modalError.firstChild.nextSibling.style.animation = 'popDown .4s ease-in-out forwards';
            setTimeout(()=>{
                modalError.classList.add('dn');
            }, 400)
        };
    });
});

buttonNewTask.addEventListener('click', ()=>{
    modalNewTasks.classList.remove('dn');
    modalNewTasks.firstChild.nextSibling.style.animation = 'popUp .4s ease-in-out forwards';
    dateInNewTasks.forEach((elem)=>{
        elem.textContent = setDeadline(elem);
    });
});

buttonAdd.addEventListener('click', ()=>{
    modalError.classList.remove('dn');
    modalError.firstChild.nextSibling.style.animation = 'popUp .4s ease-in-out forwards';
}); 

buttonCreateTask.addEventListener('click', ()=>{
    document.querySelector(".slider-line").style.right = '710px';
    formCreateTask.classList.remove('dn');
});

buttonCreateBack.addEventListener('click', ()=>{
    document.querySelector(".slider-line").style.right = '0';
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
        let key = elem.dataset['key'];
        contentHiddenItem.forEach((elem)=>{
            let hiddenKey = elem.dataset['key'];
            if(+key == hiddenKey) {
                if (elem.classList.contains('dn')){
                    elem.firstChild.nextElementSibling.style.animation = 'slowDown .6s linear forwards';
                    elem.classList.remove('dn');
                } else {
                    elem.firstChild.nextElementSibling.style.animation = 'slowUp .6s linear forwards';
                    setTimeout(() => elem.classList.add('dn'), 600);
                }
            }
        });
    });
});

function setDeadline(object) {
    // let monthsArray = new Array ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

    let arr = object.dataset['date'].split('-').reverse();
    let day = arr[0];
    let month = arr[1];
    let year = arr[2];

    // let month = monthsArray.findIndex((i)=> i === monthName) + 1;

    // if (month < 10) {
    //     month = '0' + month;
    // }

    let date = `${day}.${month}.${year}`;

    return date;
}