let tasksCard = document.querySelectorAll(".tasks-card");
let modalTasks = document.querySelector(".modal--tasks");
let modalNewTasks = document.querySelector(".modal--newTasks")
let modalError = document.querySelector(".modal--error");
let modalNotif = document.querySelector(".modal-window--notifications");


let formNewtasks = document.querySelector('.form--newTasks');
let formCreateTask =document.querySelector('.form-createTask');


let buttonAllTask = document.querySelector(".bp-item--all-task");
let buttonExit = document.querySelectorAll(".mw-bottom__exit");
let buttonNewTask = document.querySelector(".bp-item--new-task");
let buttonAdd = document.querySelector(".mw-bottom__add");
let buttonCreateTask = document.querySelector(".mw-top__button");
let buttonCreateBack = document.querySelector(".mw-top__button-back");
let buttonNext = document.querySelector(".task-sec-title__button--next");
let buttonPrev = document.querySelector(".task-sec-title__button--prev");


let taskPackCheckbox = document.querySelectorAll(".task-pack-checkbox");


let symbol = document.querySelectorAll(".symbol");
let contentHiddenItem = document.querySelectorAll(".mw-content__hidden-item");
let dateInNewTasks = document.querySelectorAll(".task-chek__deadline");
let categorisItem = document.querySelectorAll(".categoris-item");
let imgNotif = document.querySelector(".nav-item--notif");
let taskSec = document.querySelector(".task-sec");
let taskSecWrapper = document.querySelector(".task-sec-wrapper");
let taskSecWrapperSlider = document.querySelectorAll(".task-sec-wrapper__slider");


let width, count = 0;

init();

if (count == 0) {
    document.querySelector('.task-sec-title-slider__button--1').style.background = '#1560BD';
}

window.addEventListener('resize', init)

tasksCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        modalTasks.classList.remove('dn');
        modalTasks.firstChild.nextSibling.style.animation = 'popUp .4s ease-in-out forwards';
        let title = elem.dataset['key'];
        let desc = elem.dataset['desc'];
        let deadline = setDeadline(elem);
        document.querySelector(".mw-top__title").textContent = title;
        document.querySelector(".mw-top__deadline").textContent = deadline;
        document.querySelector(".mw-content__description").textContent = desc;
    });
});

buttonAllTask.addEventListener('click', ()=>{
    tasksCard.forEach((elem)=>{
        elem.classList.remove('dn');
    });
});

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
        // } else if(!modalError.classList.contains('dn')){
        //     modalError.firstChild.nextSibling.style.animation = 'popDown .4s ease-in-out forwards';
        //     setTimeout(()=>{
        //         modalError.classList.add('dn');
        //     }, 400)
        } else if(!modalNotif.classList.contains('dn')){
            modalNotif.style.animation = 'slowUp .6s linear forwards';
            setTimeout(()=>{
                document.querySelector(".wrapper-notification").classList.add('dn');
            }, 600)
        }
    });
});

imgNotif.addEventListener('click', ()=>{
    document.querySelector(".wrapper-notification").classList.remove('dn');
    modalNotif.style.animation = 'slowDown .6s linear forwards';
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


categorisItem.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        let currentCategoris = elem.firstChild.nextSibling.textContent;

        tasksCard.forEach((task)=>{
            let key = task.dataset['task'];
            if (currentCategoris !== key){
                task.classList.add('dn');
            } else {
                task.classList.remove('dn');
            }
        });
    });
});

taskPackCheckbox.forEach((elem)=>{
    elem.addEventListener('change', (elem)=>{
        elem.target.classList.toggle('task-pack-checkbox--active');
        elem.target.parentNode.classList.toggle('task-pack__item--active');
    });
});

buttonNext.addEventListener('click', ()=>{
    count++;
    
    if(count == taskSecWrapperSlider.length - 1) {
        buttonNext.classList.add('dn');
    }

    if(buttonPrev.classList.contains('dn') && count != 0) {
        buttonPrev.classList.remove('dn');
    }

    if (count > 0) {
        document.querySelector('.task-sec-title-slider__button--1').style.background = 'none';
        document.querySelector('.task-sec-title-slider__button--2').style.background = '#1560BD';
    }

    rollSlider();
});

buttonPrev.addEventListener('click', ()=>{
    count--;
    
    if(count == 0) {
        buttonPrev.classList.add('dn');
        document.querySelector('.task-sec-title-slider__button--1').style.background = '#1560BD';
        document.querySelector('.task-sec-title-slider__button--2').style.background = 'none';
    }

    if(buttonNext.classList.contains('dn') && count !== taskSecWrapperSlider.length - 1) {
        buttonNext.classList.remove('dn');
    }

    rollSlider();
});



$('.date-input').click(function(){
    $(this).setCursorPosition(0);
}).mask('99-99-9999', {placeholder:' '});

$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
};


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

function init() {
    console.log('resize');
    width = taskSec.offsetWidth;

    taskSecWrapper.style.minWidth = width * taskSecWrapperSlider.length + 'px';

    taskSecWrapperSlider.forEach((elem) => {
        elem.style.minWidth = width + 'px';
    });
    rollSlider();
}

function rollSlider() {
    taskSecWrapper.style.transform = 'translate(-' + count * width + 'px)';
}
