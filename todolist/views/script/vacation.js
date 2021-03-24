let date = document.querySelector(".current-date__item");
let year = document.querySelector(".year");
let imgWrapper = document.querySelector(".img-wrapper");

date.textContent = `${currentDate()[0]}.${currentDate()[1]}`;
year.textContent = currentDate()[2];
arrangeSnowflake();

document.querySelector(".left-arrow").addEventListener('click', ()=>{
    let count = year.textContent - 1;
    year.textContent = count;
});

document.querySelector(".right-arrow").addEventListener('click', ()=>{
    let count = +year.textContent + 1;
    year.textContent = count;
});

function currentDate() {
    let date = new Date;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
        month = `0${month}`;
    }

    let array = [day, month, year];

    return array;
};