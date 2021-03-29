
let buttonNext = document.querySelector(".task-sec-title__button--next");
let buttonPrev = document.querySelector(".task-sec-title__button--prev");


init();
window.addEventListener('resize', init)

if (count == 0) {
    document.querySelector('.task-sec-title-slider__button--1').style.background = '#1560BD';
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
