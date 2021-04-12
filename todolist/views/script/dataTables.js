$(document).ready(function() {
    $('#tasksTable').DataTable( {
        "paging":   false,
        "info":     false,
        "order": [[ 1, "asc" ]],
        columnDefs: [
            { orderable: false, targets: 0 },
            { orderable: false, targets: 6 }
          ]
    } );
} );

window.onload = function(){
    onloadFunc();
    function onloadFunc() {
        let searchForm = document.querySelector(".dataTables_filter");
        if(searchForm == null) {
            setTimeout(onloadFunc, 100);
        } else {
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
    }
}