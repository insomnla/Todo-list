
let buttonReport = document.querySelector(".instruments__button_bg_document");
console.log(buttonReport);

buttonReport.addEventListener("click", (e)=>{
    let tasksToReport = document.querySelectorAll(".table-checkbox_checked"),
        tasksID = [];
        tasksToReport.forEach( (task) => {
            tasksID.push(task.getAttribute("value"));
        });
        console.log(tasksID);
        window.location.href  = "/report?tasks=" + tasksID;
})