"use strict";

var year = document.querySelector(".year");
var months = document.querySelector(".months");
var restDays = document.querySelector("#rest-days");
var start_date = "";
var end_date = "";
var vacation_days = 0;
var minModal = document.querySelector(".min-modal");
var minModalText = document.querySelector(".min-modal__text");
var minModalConfirmButton = document.querySelector(".min-modal__button-confirm");
var minModalCancelButton = document.querySelector(".min-modal__button-cancel");
var errorDayAlert = document.querySelector("#error-day-alert");
var errorDayAlertTitel = document.querySelector(".error-day-alert__title");
var errorDayAlertText = document.querySelector(".error-day-alert__text");
var errorDayAlertCloseButton = document.querySelector("#close-error-day-alert");
var prevYearButton = document.querySelector(".prev-year");
var nextYearButton = document.querySelector(".next-year");
var dayName = document.querySelectorAll(".day__name");
var selectedYear, selectedMonth;
var firstElement, lastElement, selectedDateFirst, selectedDateLast;
var vacationList = document.querySelector(".vacation-list");
var vacationListSubtitle = document.querySelectorAll(".vacation-list__item-subtitle");
year.textContent = getCurrentYear();
selectedYear = year.textContent;
monthArray();
getHolidaysDateOfBd();

prevYearButton.onclick = function () {
  setNewNumber(prevYearButton, year);
  selectedYear = '';
  selectedYear = year.textContent;
  monthArray();
  getHolidaysDateOfBd();
};

nextYearButton.onclick = function () {
  setNewNumber(nextYearButton, year);
  selectedYear = '';
  selectedYear = year.textContent;
  monthArray();
  getHolidaysDateOfBd();
};

document.querySelector("#vacations-counter").textContent = vacationListSubtitle.length;
vacationListSubtitle.forEach(function (elem) {
  var dateElemArray = elem.dataset['date'].split('-');
  var firstDateArray = dateElemArray[0].split('.');
  var lastDateArray = dateElemArray[1].split('.');
  var firstDay = firstDateArray[0];
  var firstMonth = firstDateArray[1];
  var firstYear = firstDateArray[2];
  var lastDay = lastDateArray[0];
  var lastMonth = lastDateArray[1];
  var lastYear = lastDateArray[2];
  console.log(firstDateArray, lastDateArray);

  if (firstDay < 10) {
    firstDay = "0".concat(firstDay);
  }

  if (firstMonth < 10) {
    firstMonth = "0".concat(firstMonth);
  }

  if (lastDay < 10) {
    lastDay = "0".concat(lastDay);
  }

  if (lastMonth < 10) {
    lastMonth = "0".concat(lastMonth);
  }

  elem.textContent = "".concat(firstDay, ".").concat(firstMonth, ".").concat(firstYear, " - ").concat(lastDay, ".").concat(lastMonth, ".").concat(lastYear);
});
vacationList.addEventListener('click', function () {
  if (vacationList.classList.contains('overflowON')) {
    vacationList.classList.remove('overflowON');
    vacationList.classList.add('overflowOFF');
  } else {
    vacationList.classList.remove('overflowOFF');
    vacationList.classList.add('overflowON');
  }
});
months.addEventListener('click', function (elem) {
  if (elem.target.classList.contains('day') && !elem.target.classList.contains('day_holiday')) {
    if (firstElement == undefined) {
      elem.target.classList.add('day_active');
      firstElement = elem.target.textContent;
      selectedDateFirst = elem.target.dataset['day'];
      selectedDateFirstArray = selectedDateFirst.split('.');

      if (selectedDateFirstArray[0] < 10 && selectedDateFirstArray[1] < 10) {
        selectedDateFirstArray[0] = "0".concat(selectedDateFirstArray[0]);
        selectedDateFirstArray[1] = "0".concat(selectedDateFirstArray[1]);
      } else if (selectedDateFirstArray[0] < 10) {
        selectedDateFirstArray[0] = "0".concat(selectedDateFirstArray[0]);
      } else if (selectedDateFirstArray[1] < 10) {
        selectedDateFirstArray[1] = "0".concat(selectedDateFirstArray[1]);
      }
    } else if (lastElement == undefined) {
      elem.target.classList.add('day_active');
      lastElement = elem.target.textContent;

      if (lastElement !== firstElement) {
        selectedDateLast = elem.target.dataset['day'];
        selectedDateLastArray = selectedDateLast.split('.');

        if (selectedDateLastArray[0] < 10 && selectedDateLastArray[1] < 10) {
          selectedDateLastArray[0] = "0".concat(selectedDateLastArray[0]);
          selectedDateLastArray[1] = "0".concat(selectedDateLastArray[1]);
        } else if (selectedDateLastArray[0] < 10) {
          selectedDateLastArray[0] = "0".concat(selectedDateLastArray[0]);
        } else if (selectedDateLastArray[1] < 10) {
          selectedDateLastArray[1] = "0".concat(selectedDateLastArray[1]);
        }

        if (getColoredSelectedDays(selectedDateFirst, selectedDateLast) !== false) {
          if (elem.pageX < document.documentElement.clientWidth / 2) {
            minModal.style.top = "".concat(elem.pageY, "px");
            minModal.style.left = "".concat(elem.pageX, "px");
          } else if (elem.pageX > document.documentElement.clientWidth / 2) {
            minModal.style.top = "".concat(elem.pageY, "px");
            minModal.style.left = "".concat(elem.pageX - 900, "px");
          }

          if (selectedDateLastArray[1] == 10 || selectedDateLastArray[1] == 11 || selectedDateLastArray[1] == 12) {
            minModal.style.top = "".concat(elem.pageY - 175, "px");
          }

          start_date = selectedDateFirst;
          end_date = selectedDateLast;
          minModalText.innerHTML = "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043E\u0442\u043F\u0443\u0441\u043A \u0432 \u044D\u0442\u043E\u0442 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A \u0432\u0440\u0435\u043C\u0435\u043D\u0438:<br> ".concat(selectedDateFirstArray[0], ".").concat(selectedDateFirstArray[1], ".").concat(selectedDateFirstArray[2], " - ").concat(selectedDateLastArray[0], ".").concat(selectedDateLastArray[1], ".").concat(selectedDateLastArray[2], " ?");
          minModal.style.animation = 'opacity1 .6s linear forwards';
          minModal.classList.remove('hidden');
        }
      } else {
        var day = document.querySelectorAll(".day");
        day.forEach(function (elem) {
          elem.classList.remove('day_active');
        });
        firstElement = undefined, lastElement = undefined, selectedDateFirst = undefined, selectedDateLast = undefined;
      }
    }
  }
});

if (minModalConfirmButton !== null) {
  minModalConfirmButton.onclick = function () {
    console.log('Подтвержденно');
    getDelColorDays();
    minModal.style.animation = 'opacity0 .6s linear forwards';
    setTimeout(function () {
      minModal.classList.add('hidden');
    }, 600);
    firstElement = undefined, lastElement = undefined, selectedDateFirst = undefined, selectedDateLast = undefined;
    console.log(vacation_days, start_date, end_date);
    socket.emit("new_vacation", {
      worker: id,
      start: start_date,
      end: end_date
    });
    $.post("/vacation", {
      days: vacation_days,
      start: start_date,
      end: end_date
    }, function () {
      window.location.reload();
    });
  };
}

if (minModalCancelButton !== null) {
  minModalCancelButton.onclick = function () {
    console.log('Закрыто');
    getDelColorDays();
    minModal.style.animation = 'opacity0 .6s linear forwards';
    setTimeout(function () {
      minModal.classList.add('hidden');
    }, 600);
    firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
  };
}

if (errorDayAlertCloseButton !== null) {
  errorDayAlertCloseButton.onclick = function () {
    errorDayAlert.classList.add('hidden');
  };
}

function getHolidaysDateOfBd() {
  vacationListSubtitle.forEach(function (elem) {
    var dateElemArray = elem.dataset['date'].split('-');
    var firstDate = dateElemArray[0];
    var lastDate = dateElemArray[1];
    var action = elem.dataset['action'];
    getColoredSelectedDaysBD(firstDate, lastDate, action);
  });
}

function getColoredSelectedDays(firstDate, lastDate) {
  console.log(firstDate, lastDate);
  var day = document.querySelectorAll(".day");
  var firstDateArray = firstDate.split('.');
  var lastDateArray = lastDate.split('.');
  var firstDay = firstDateArray[0];
  var firstMonth = firstDateArray[1];
  var firstYear = firstDateArray[2];
  var lastDay = lastDateArray[0];
  var lastMonth = lastDateArray[1];
  var lastYear = lastDateArray[2];
  var numberSelectedDays;
  var checkHolidaysArray = checkHolidays(firstDate, lastDate);
  var holidays = checkHolidaysArray[0];
  console.log(firstDay, lastDay);

  if (lastMonth - firstMonth == 1) {
    numberSelectedDays = getDayInMonth(selectedYear, firstMonth - 1) - firstDay + +lastDay + 1 - Number(holidays);
  } else if (firstMonth == lastMonth && firstDay < lastDay) {
    numberSelectedDays = lastDay - firstDay + 1 - Number(holidays);
  } else if (firstYear < lastYear && firstMonth == 12 && lastMonth == 1) {
    numberSelectedDays = getDayInMonth(selectedYear, firstMonth - 1) - firstDay + +lastDay + 1 - Number(holidays);
  } else {
    firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
    day.forEach(function (elem) {
      elem.classList.remove('day_active');
    });
    errorDayAlertText.textContent = 'Выбирете сначала первый день отпуска, затем последний';
    errorDayAlertTitel.textContent = 'Ошибка. Неправильная последовательность действий';
    errorDayAlert.classList.remove('hidden');
    return false;
  }

  vacation_days = numberSelectedDays;
  console.log(numberSelectedDays);

  if (numberSelectedDays <= restDays.textContent) {
    day.forEach(function (elem, index) {
      var elemDateArray = elem.dataset['day'].split('.');

      if (elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_active');
        }
      } else if (elemDateArray[1] == firstMonth) {
        if (Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_active');
        }
      } else if (elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_active');
        }
      }
    });
  } else {
    firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
    day.forEach(function (elem) {
      elem.classList.remove('day_active');
    });

    if (numberSelectedDays !== undefined) {
      errorDayAlertText.textContent = "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C ".concat(restDays.textContent, " \u0434\u043D\u0435\u0439 \u043E\u0442\u043F\u0443\u0441\u043A\u0430, \u0430 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u043E\u0442\u043F\u0443\u0441\u043A \u043D\u0430 ").concat(numberSelectedDays, " \u0434\u043D\u0435\u0439");
      errorDayAlertTitel.textContent = 'Ошибка. Недостаточное количество дней';
      errorDayAlert.classList.remove('hidden');
    } else if (lastMonth - firstMonth > 1) {
      errorDayAlertText.textContent = 'Выбранно слишком большое количество дней';
      errorDayAlertTitel.textContent = 'Ошибка.';
      errorDayAlert.classList.remove('hidden');
    } else {
      errorDayAlertText.textContent = 'Выбирете сначала первый день отпуска, затем последний';
      errorDayAlertTitel.textContent = 'Ошибка. Неправильная последовательность действий';
      errorDayAlert.classList.remove('hidden');
    }

    return false;
  }
}

function getHoliday() {
  var arrayHolidays = months.dataset['holidays'].split(',');
  var day = document.querySelectorAll(".day");
  day.forEach(function (elem) {
    var elemDateArray = elem.dataset['day'].split('.');
    var dayAndMonth = "".concat(elemDateArray[0], ".").concat(elemDateArray[1]);

    if (arrayHolidays.indexOf(dayAndMonth) !== -1) {
      elem.classList.add('day_holiday');
    }
  });
}

function checkHolidays(firstDate, lastDate) {
  var day = document.querySelectorAll(".day");
  var firstDateArray = firstDate.split('.');
  var lastDateArray = lastDate.split('.');
  var firstDay = firstDateArray[0];
  var firstMonth = firstDateArray[1];
  var lastDay = lastDateArray[0];
  var lastMonth = lastDateArray[1];
  var numberSelectedDays;
  var counter = 0;
  var holidaysArray = [];

  if (lastMonth > firstMonth) {
    numberSelectedDays = getDayInMonth(selectedYear, firstMonth - 1) - firstDay + +lastDay + 1;
  } else if (firstMonth == lastMonth) {
    numberSelectedDays = lastDay - firstDay + 1;
  }

  day.forEach(function (elem) {
    var elemDateArray = elem.dataset['day'].split('.');

    if (elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
      if (Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay)) {
        if (elem.classList.contains('day_holiday')) {
          counter++;
          holidaysArray.push(elem.dataset['day']);
        }
      }
    } else if (elemDateArray[1] == firstMonth) {
      if (Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay) {
        if (elem.classList.contains('day_holiday')) {
          counter++;
          holidaysArray.push(elem.dataset['day']);
        }
      }
    } else if (elemDateArray[1] == lastMonth) {
      if (Number(elemDateArray[0]) <= Number(lastDay)) {
        if (elem.classList.contains('day_holiday')) {
          counter++;
          holidaysArray.push(elem.dataset['day']);
        }
      }
    }
  }); // console.log(holidaysArray)

  return [counter, holidaysArray];
}

function getDelColorDays() {
  var day = document.querySelectorAll(".day");
  day.forEach(function (elem, index) {
    if (elem.classList.contains('day_active')) {
      elem.style.animation = "bgToTransparent .".concat(index, "s linear forwards");
      elem.classList.remove('day_active');
    }
  });
}

function monthArray() {
  var div = document.querySelectorAll('.day');
  var emptyDiv = document.querySelectorAll('.empty-day');
  var monthArray = new Array('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
  div.forEach(function (elem) {
    elem.remove();
  });
  emptyDiv.forEach(function (elem) {
    elem.remove();
  });

  for (var i = 0; i < monthArray.length; i++) {
    setSelectedMonth(i, monthArray[i]);
  }
}

function getCurrentYear() {
  var date = new Date();
  var currentYear = date.getFullYear();
  return currentYear;
}

function setNewNumber(target, object) {
  if (target.classList.contains('prev-year')) {
    object.textContent = object.textContent - 1;
  } else if (target.classList.contains('next-year')) {
    object.textContent = +object.textContent + 1;
  }
}

function getDayInMonth(selectedYear, selectedMonth) {
  var date = new Date(selectedYear, selectedMonth, 32);
  var dayInMonth = 32 - date.getDate();
  return dayInMonth;
}

function findFirstDayName(year, month) {
  var date = new Date(year, month);
  var dayName = date.getDay();
  return dayName;
}

function setSelectedMonth(month, monthName) {
  selectedMonth = month;
  var dayInMonth = getDayInMonth(selectedYear, selectedMonth);
  var parentElement = document.querySelectorAll(".".concat(monthName));
  createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth);
}

function createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth) {
  var createDiv = document.createElement('div');
  var counter;

  if (findFirstDayName(selectedYear, selectedMonth) == 1) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[0].appendChild(createDiv);
    counter = 0;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 2) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[1].appendChild(createDiv);
    counter = 1;

    for (var i = 0; i < counter; i++) {
      var createEmptyDiv = document.createElement('div');
      createEmptyDiv.classList.add('empty-day');
      createEmptyDiv.classList.add('subtitle');
      parentElement[i].appendChild(createEmptyDiv);
    }

    ;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 3) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[2].appendChild(createDiv);
    counter = 2;

    for (var _i = 0; _i < counter; _i++) {
      var _createEmptyDiv = document.createElement('div');

      _createEmptyDiv.classList.add('empty-day');

      _createEmptyDiv.classList.add('subtitle');

      parentElement[_i].appendChild(_createEmptyDiv);
    }

    ;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 4) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[3].appendChild(createDiv);
    counter = 3;

    for (var _i2 = 0; _i2 < counter; _i2++) {
      var _createEmptyDiv2 = document.createElement('div');

      _createEmptyDiv2.classList.add('empty-day');

      _createEmptyDiv2.classList.add('subtitle');

      parentElement[_i2].appendChild(_createEmptyDiv2);
    }

    ;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 5) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[4].appendChild(createDiv);
    counter = 4;

    for (var _i3 = 0; _i3 < counter; _i3++) {
      var _createEmptyDiv3 = document.createElement('div');

      _createEmptyDiv3.classList.add('empty-day');

      _createEmptyDiv3.classList.add('subtitle');

      parentElement[_i3].appendChild(_createEmptyDiv3);
    }

    ;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 6) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[5].appendChild(createDiv);
    counter = 5;

    for (var _i4 = 0; _i4 < counter; _i4++) {
      var _createEmptyDiv4 = document.createElement('div');

      _createEmptyDiv4.classList.add('empty-day');

      _createEmptyDiv4.classList.add('subtitle');

      parentElement[_i4].appendChild(_createEmptyDiv4);
    }

    ;
  } else if (findFirstDayName(selectedYear, selectedMonth) == 0) {
    createDiv.classList.add('day');
    createDiv.classList.add('subtitle');
    createDiv.setAttribute('data-day', "1.".concat(selectedMonth + 1, ".").concat(selectedYear));
    createDiv.innerHTML = "01";
    parentElement[6].appendChild(createDiv);
    counter = 6;

    for (var _i5 = 0; _i5 < counter; _i5++) {
      var _createEmptyDiv5 = document.createElement('div');

      _createEmptyDiv5.classList.add('empty-day');

      _createEmptyDiv5.classList.add('subtitle');

      parentElement[_i5].appendChild(_createEmptyDiv5);
    }

    ;
  }

  for (var _i6 = 2; _i6 < dayInMonth + 1; _i6++) {
    var _createDiv = document.createElement('div');

    _createDiv.classList.add('day');

    _createDiv.classList.add('subtitle');

    _createDiv.setAttribute('data-day', "".concat(_i6, ".").concat(selectedMonth + 1, ".").concat(selectedYear));

    if (_i6 < 10) {
      _createDiv.innerHTML = "".concat('0' + _i6);
    } else {
      _createDiv.innerHTML = "".concat(_i6);
    }

    if (counter == 6) {
      counter = -1;
    }

    parentElement[counter + 1].appendChild(_createDiv);
    counter++;
  }

  getHoliday();
}

function getColoredSelectedDaysBD(firstDate, lastDate, action) {
  // Тут полное повторение функции getColoredSelectedDays только без проверки на количество дней, сделано рофла ради, работает кстати, можешь удалить если хочешь
  console.log(action);
  var day = document.querySelectorAll(".day");
  var firstDateArray = firstDate.split('.');
  var lastDateArray = lastDate.split('.');
  var firstDay = firstDateArray[0];
  var firstMonth = firstDateArray[1];
  var firstYear = firstDateArray[2];
  var lastDay = lastDateArray[0];
  var lastMonth = lastDateArray[1];
  var lastYear = lastDateArray[2];
  var numberSelectedDays;
  var checkHolidaysArray = checkHolidays(firstDate, lastDate);
  var holidays = checkHolidaysArray[0];
  console.log(checkHolidaysArray[1]);

  if (lastMonth - firstMonth == 1) {
    numberSelectedDays = getDayInMonth(selectedYear, firstMonth - 1) - firstDay + +lastDay + 1 - Number(holidays);
  } else if (firstMonth == lastMonth) {
    numberSelectedDays = lastDay - firstDay + 1 - Number(holidays);
  }

  vacation_days = numberSelectedDays;

  if (action == 'Подтверждено') {
    day.forEach(function (elem, index) {
      var elemDateArray = elem.dataset['day'].split('.');

      if (elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_confirmed');
        }
      } else if (elemDateArray[1] == firstMonth) {
        if (Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(firstYear)) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_confirmed');
        }
      } else if (elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(lastYear)) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_confirmed');
        }
      }
    });
  } else {
    day.forEach(function (elem, index) {
      var elemDateArray = elem.dataset['day'].split('.');

      if (elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_in_process');
        }
      } else if (elemDateArray[1] == firstMonth) {
        if (Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(firstYear)) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_in_process');
        }
      } else if (elemDateArray[1] == lastMonth) {
        if (Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(lastYear)) {
          elem.style.animation = "transparentToBg .".concat(index, "s linear forwards");
          elem.classList.add('day_in_process');
        }
      }
    });
  }
}