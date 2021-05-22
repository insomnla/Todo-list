let year = document.querySelector(".year");

let prevYearButton = document.querySelector(".prev-year");
let nextYearButton = document.querySelector(".next-year");

let dayName = document.querySelectorAll(".day__name");

let selectedYear, selectedMonth;

year.textContent = getCurrentYear();

selectedYear = year.textContent;

monthArray();


prevYearButton.onclick = function() {
    setNewNumber(prevYearButton, year);

    selectedYear = '';
    selectedYear = year.textContent;
    monthArray();
}

nextYearButton.onclick = function() {
    setNewNumber(nextYearButton, year);

    selectedYear = '';
    selectedYear = year.textContent;
    monthArray();
}

function monthArray() {
    let div = document.querySelectorAll('.day');
    let emptyDiv = document.querySelectorAll('.empty-day');
    let monthArray = new Array('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');

    div.forEach((elem)=>{
        elem.remove();
    });

    emptyDiv.forEach((elem)=>{
        elem.remove();
    });

    for(let i = 0; i < monthArray.length; i++){
        setSelectedMonth(i, monthArray[i]);
    }
}

function getCurrentYear() {
    let date = new Date();

    let currentYear = date.getFullYear();

    return currentYear;
}

function setNewNumber(target, object) {
    if(target.classList.contains('prev-year')) {
        object.textContent = object.textContent - 1;
    } else if(target.classList.contains('next-year')) {
        object.textContent = +object.textContent + 1;
    }
}

function getDayInMonth(selectedYear, selectedMonth) {
    let date = new Date(selectedYear, selectedMonth, 32);

    let dayInMonth = 32 - date.getDate();

    return dayInMonth;
}

function findFirstDayName(year, month) {
    let date = new Date(year, month);
    let dayName = date.getDay();
    return dayName;
}

function setSelectedMonth(month, monthName) {
    selectedMonth = month;
    let dayInMonth = getDayInMonth(selectedYear, selectedMonth);
    let parentElement = document.querySelectorAll(`.${monthName}`)
    console.log(dayInMonth);
    createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth)
}

function createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth) {
    let createDiv = document.createElement('div');
    let counter;

    if(findFirstDayName(selectedYear, selectedMonth) == 1) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[0].appendChild(createDiv);
        counter = 0;
    } else if (findFirstDayName(selectedYear, selectedMonth) == 2) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[1].appendChild(createDiv);
        counter = 1;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 3) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[2].appendChild(createDiv);
        counter = 2;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 4) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[3].appendChild(createDiv);
        counter = 3;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 5) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[4].appendChild(createDiv);
        counter = 4;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    }  else if (findFirstDayName(selectedYear, selectedMonth) == 6) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[5].appendChild(createDiv);
        counter = 5;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 0) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.innerHTML = `01`;
        parentElement[6].appendChild(createDiv);
        counter = 6;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    }

    for(let i = 2; i < dayInMonth + 1; i++){
        let createDiv = document.createElement('div');
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');

        if (i < 10) {
            createDiv.innerHTML = `${'0' + i}`;
        } else {
            createDiv.innerHTML = `${i}`;
        }
        if (counter == 6){
            counter = -1;
        }
        parentElement[counter + 1].appendChild(createDiv);
        counter ++;
    }


}