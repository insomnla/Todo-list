$(document).ready(function() {
    $('#tasksTable').DataTable( {
        "paging":   false,
        // "ordering": false,
        "info":     false,
        "order": [[ 1, "asc" ]]
    } );
} );

window.onload = function(){
    let searchForm = document.querySelector(".dataTables_filter");
    let filters = document.querySelector(".filters");
    let searchInput = document.querySelector("input[type=search]");
    let searchFormLable = document.querySelector('.dataTables_filter>label');

    
    filters.appendChild(searchForm);
    searchForm.appendChild(searchInput);
    searchForm.removeChild(searchFormLable);
    searchForm.classList.add('filters-item');
    searchInput.classList.add('filter-item__input');

    let div = document.createElement('div');
    div.classList.add('filters-item__subtitle');
    div.textContent = 'Поиск по задачам';
    searchForm.appendChild(div);
}