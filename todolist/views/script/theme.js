let theme = document.querySelector("#theme");
let switchTheme = document.querySelector(".nav-item-theme");

getTheme();

switchTheme.onclick = function() {
    if(localStorage.getItem('theme') == null || localStorage.getItem('theme') == 'light'){
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    getTheme();
}

function getTheme() {
    if (localStorage.getItem('theme') == 'light') {
        theme.setAttribute('href', './style/light_theme.css');
    } else if(localStorage.getItem('theme') == 'dark') {
        theme.setAttribute('href', './style/dark_theme.css');
    }
}