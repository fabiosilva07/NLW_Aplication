const buttonAddTime = document.querySelector("#add-time");

buttonAddTime.addEventListener("click", addTime);

function addTime(){
    const scheduleWrapper = document.querySelector("#schedule-items");
    const scheduleItemClone = document.querySelector(".schedule-item").cloneNode(true); //Div item de calendario

    const fields = scheduleItemClone.querySelectorAll("input");

    fields.forEach(function(field) {
        field.value = "";
    });

    scheduleWrapper.appendChild(scheduleItemClone);
}