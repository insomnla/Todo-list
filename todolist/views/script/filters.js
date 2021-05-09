let filterItemSelect = document.querySelectorAll(".filters-item-select");
let selectCategories = document.querySelector("#select-categories");
let selectStatus = document.querySelector("#select-status");

filterItemSelect.forEach((elem, index)=>{
    elem.addEventListener('change', ()=>{
        if(index == 0) {
            if(selectStatus.value == 'All') {
                document.querySelector(".after-table").classList.add('hidden');
                allRowWithCategories.forEach((elem)=>{
                    elem.parentNode.classList.remove('hidden');
                    elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == 'All') {
                        elem.parentNode.classList.remove('hidden');
                        elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    } else if(selectCategories.value !== elem.textContent) {
                        elem.parentNode.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            elem.parentNode.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else if(selectCategories.value == 'All') {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == 'All' && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            }
            checkForEmptiness();
        } else if(index == 1) {
            if(selectCategories.value == 'All') {
                document.querySelector(".after-table").classList.add('hidden');
                allRowWithStatus.forEach((elem)=>{
                    elem.parentNode.parentNode.classList.remove('hidden');
                    elem.parentNode.parentNode.style.animation = "opacity1 .6s linear forwards";
                    if(selectStatus.value == 'All') {
                        elem.parentNode.classList.remove('hidden');
                        elem.parentNode.style.animation = "opacity1 .6s linear forwards";
                    } else if(selectStatus.value !== elem.textContent) {
                        elem.parentNode.parentNode.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            elem.parentNode.parentNode.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else if(selectStatus.value == 'All') {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == 'All') {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            } else {
                rowsOnTable.forEach((row)=>{
                    document.querySelector(".after-table").classList.add('hidden');
                    let categories = row.children[2];
                    let status = row.children[5];
                    row.classList.remove('hidden');
                    row.style.animation = "opacity1 .6s linear forwards";
                    if(selectCategories.value == categories.textContent && selectStatus.value == status.textContent) {
                        row.classList.remove('hidden');
                        row.style.animation = "opacity1 .6s linear forwards";
                    } else {
                        row.style.animation = 'opacity0 .6s linear forwards';
                        setTimeout(()=>{
                            row.classList.add('hidden');
                            checkForEmptiness();
                        }, 600);
                    }
                })
            }
        }
    })
})