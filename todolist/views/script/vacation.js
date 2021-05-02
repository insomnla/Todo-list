let year = document.querySelector(".year");
let month = document.querySelector(".month");

let beforeMonths = document.querySelector(".before-months");
let months = document.querySelector(".months");
let days = document.querySelector(".days");

let firstMonth = document.querySelector(".first");
let secondMonth = document.querySelector(".second");
let thirdMonth = document.querySelector(".third");

let backArrowButton = document.querySelector(".back-arrow");
let prevYearButton = document.querySelector(".prev-year");
let nextYearButton = document.querySelector(".next-year");
let prevMonthButton = document.querySelector(".prev-month");
let nextMonthButton = document.querySelector(".next-month");

let monthCard = document.querySelectorAll(".month-card");

let selectedDate = [];

year.textContent = getCurrentYear();

selectedDate.push(year.textContent);

monthCard.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        let month = elem.textContent.trim();
        selectedDate.push(getMonthNumber(month));
        creatingHtmlTag(getDayInSelectedDate(selectedDate), selectedDate);
        secondMonth.textContent = month;
        changeMonthName(getMonthNumber(month));
        beforeMonths.classList.remove('hidden');
        days.classList.remove('hidden');
        months.classList.add('hidden');
    })
})

backArrowButton.onclick = function() {
    beforeMonths.classList.add('hidden');
    days.classList.add('hidden');
    months.classList.remove('hidden');

    selectedDate = [];
    selectedDate.push(year.textContent);
}

prevYearButton.onclick = function() {
    setNewNumber(prevYearButton, year);

    selectedDate = [];
    selectedDate.push(year.textContent);

    beforeMonths.classList.add('hidden');
    days.classList.add('hidden');
    months.classList.remove('hidden');
}

nextYearButton.onclick = function() {
    setNewNumber(nextYearButton, year);

    selectedDate = [];
    selectedDate.push(year.textContent);

    beforeMonths.classList.add('hidden');
    days.classList.add('hidden');
    months.classList.remove('hidden');
}

prevMonthButton.onclick = function() {
    changeMonths(getMonthNumber(secondMonth.textContent), 'mines');
    monthTarget();
}

nextMonthButton.onclick = function() {
    changeMonths(getMonthNumber(secondMonth.textContent), 'plus');
    monthTarget();
}

firstMonth.onclick = function() {
    changeMonths(getMonthNumber(secondMonth.textContent), 'mines');
    monthTarget();
}

thirdMonth.onclick = function() {
    changeMonths(getMonthNumber(secondMonth.textContent), 'plus');
    monthTarget();
}

function monthTarget() {
    selectedDate = [];
    selectedDate.push(year.textContent);
    selectedDate.push(getMonthNumber(secondMonth.textContent));
    console.log(selectedDate)
    creatingHtmlTag(getDayInSelectedDate(selectedDate), selectedDate);
}

function setNewNumber(target, object) {
    if(target.classList.contains('prev-year')) {
        object.textContent = object.textContent - 1;
    } else if(target.classList.contains('next-year')) {
        object.textContent = +object.textContent + 1;
    }
}

function getCurrentYear() {
    let date = new Date();

    let currentYear = date.getFullYear();

    return currentYear;
}

function getDayInCurrentMonth() {
    let date = new Date();

    date.setDate('32');

    let arrayFullDate = new Array(date.getMonth(), date.getFullYear())
    let dayInCurrMonth = 32 - date.getDate();
}

function getMonthNumber(monthName) {
    let monthArray = new Array('Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');

    let monthIndex = monthArray.indexOf(monthName);
    return monthIndex;
}

function changeMonths(monthIndex, action) {
    let monthArray = new Array('Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');

    if(action == 'plus') {
        if (monthIndex == 11) {
            monthIndex = 0;
            year.textContent = +year.textContent + 1;
        } else {
            monthIndex = +monthIndex + 1;
        }
        console.log(monthIndex);
        if(monthIndex > 0 && monthIndex < 11) {
            firstMonth.textContent = monthArray[monthIndex - 1];
            secondMonth.textContent = monthArray[monthIndex];
            thirdMonth.textContent = monthArray[monthIndex + 1];
        } else if(monthIndex == 0) {
            firstMonth.textContent = monthArray[11];
            secondMonth.textContent = monthArray[0];
            thirdMonth.textContent = monthArray[monthIndex + 1];
            monthIndex = 11;
        } else if(monthIndex == 11) {
            firstMonth.textContent = monthArray[monthIndex - 1];
            secondMonth.textContent = monthArray[11];
            thirdMonth.textContent = monthArray[0];
        }
    } else {
        if(monthIndex == 0) {
            monthIndex = 11;
            year.textContent = +year.textContent - 1;
        } else {
            monthIndex = +monthIndex - 1;
        }
        console.log(monthIndex);
        if(monthIndex > 0 && monthIndex < 11) {
            firstMonth.textContent = monthArray[monthIndex - 1];
            secondMonth.textContent = monthArray[monthIndex];
            thirdMonth.textContent = monthArray[monthIndex + 1];
        } else if(monthIndex == 0) {
            firstMonth.textContent = monthArray[11];
            secondMonth.textContent = monthArray[0];
            thirdMonth.textContent = monthArray[monthIndex + 1];
            monthIndex = 11;
        } else if(monthIndex == 11) {
            firstMonth.textContent = monthArray[monthIndex - 1];
            secondMonth.textContent = monthArray[11];
            thirdMonth.textContent = monthArray[0];
        }
    }
}

function getDayInSelectedDate(selectedDate) {
    let selectedMonth = selectedDate[1];
    let selectedYear = selectedDate[0];
    let date = new Date(selectedYear, selectedMonth, 32);

    let dayInMonth = 32 - date.getDate();

    return dayInMonth;
}

function changeMonthName(monthIndex) {
    let monthArray = new Array('Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');

    if(monthIndex > 0 && monthIndex < 11) {
        firstMonth.textContent = monthArray[monthIndex - 1];
        thirdMonth.textContent = monthArray[monthIndex + 1];
    } else if(monthIndex == 0) {
        firstMonth.textContent = monthArray[11];
        thirdMonth.textContent = monthArray[monthIndex + 1];
    } else if(monthIndex == 11) {
        firstMonth.textContent = monthArray[monthIndex - 1];
        thirdMonth.textContent = monthArray[0];
    }
}

function findDay(year, month) {
    let date = new Date(year, month);
    let days = date.getDay();
    return days;
}

function creatingHtmlTag(dayInMonth, selectedDate) {
    let div = document.querySelectorAll('.day-card');
    let emptyDiv = document.querySelectorAll('.empty-dayCard');

    div.forEach((elem)=>{
        elem.remove();
    });

    emptyDiv.forEach((elem)=>{
        elem.remove();
    });

    let monday = document.querySelector("#monday");
    let tuesday = document.querySelector("#tuesday");
    let wednesday = document.querySelector("#wednesday");
    let thursday = document.querySelector("#thursday");
    let friday = document.querySelector("#friday");
    let saturday = document.querySelector("#saturday");
    let sunday = document.querySelector("#sunday");
    let createDiv = document.createElement('div');

    let calendarItem = document.querySelectorAll(".calendar-item");

    let year = selectedDate[0];
    let month = selectedDate[1];

    let counter;

    if (findDay(year, month) == 1) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        monday.appendChild(createDiv);
        counter = 0;
    } else if (findDay(year, month) == 2) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        tuesday.appendChild(createDiv);
        counter = 1;
        for (let i = 0; i < 1; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    } else if (findDay(year, month) == 3) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        wednesday.appendChild(createDiv);
        counter = 2;
        for (let i = 0; i < 2; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    } else if (findDay(year, month) == 4) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        thursday.appendChild(createDiv);
        counter = 3;
        for (let i = 0; i < 3; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    } else if (findDay(year, month) == 5) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        friday.appendChild(createDiv);
        counter = 4;
        for (let i = 0; i < 4; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    }  else if (findDay(year, month) == 6) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        saturday.appendChild(createDiv);
        counter = 5;
        for (let i = 0; i < 5; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    } else if (findDay(year, month) == 0) {
        createDiv.classList.add('day-card');
        createDiv.innerHTML = `<div class="day-card-info">01</div>`;
        sunday.appendChild(createDiv);
        counter = 6;
        for (let i = 0; i < 6; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-dayCard');
            calendarItem[i].appendChild(createEmptyDiv);
        };
    }

    for(let i = 2; i < dayInMonth + 1; i++){
        let createDiv = document.createElement('div');

        let calendarItem = document.querySelectorAll(".calendar-item");
        createDiv.classList.add('day-card');
        if (i < 10) {
            createDiv.innerHTML = `<div class="day-card-info">${'0' + i}</div>`;
        } else {
            createDiv.innerHTML = `<div class="day-card-info">${i}</div>`;
        }
        if (counter == 6){
            counter = -1;
        }
        calendarItem[counter + 1].appendChild(createDiv);
        counter ++;
    }
};