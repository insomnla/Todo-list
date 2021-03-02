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
        let arr = elem.dataset['key'].split(' ');
        let title = arr[0];
        let desc = elem.dataset['desc'];
        let deadline = setDeadline(elem);
        document.querySelector(".mw-top__title").textContent = title;
        document.querySelector(".mw-top__deadline").textContent = deadline;
        document.querySelector(".mw-content__description").textContent = desc;
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
    let monthsArray = new Array ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

    let arr = object.dataset['date'].split(' ');
    let day = arr[2];
    let monthName = arr[1];
    let year = arr[3];

    let month = monthsArray.findIndex((i)=> i === monthName) + 1;

    if (month < 10) {
        month = '0' + month;
    }

    let date = `${day}.${month}.${year}`;

    return date;
}