import { currentWeekOffSet, setCurretnWeekOffset } from "./data.js"
import { refreshUI, displayError, clearMessage } from "./render.js"
import { shifts } from "./data.js"
import { loadShifts, saveData } from "./storage.js"
import { getTotalMins } from "./logic.js"
import { isSelectedWeek } from "./validation.js";


const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

loadShifts();
refreshUI();


function addNewShift() {
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: Number(formData.break),
        workPlace: formData.workPlace
    }

    if (!isSelectedWeek(newShift)) {
        displayError();
        return;
    }

    clearMessage();
    shifts.push(newShift);
    saveData();
    refreshUI();
}


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //clearMessage();
    addNewShift();

})

prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setCurretnWeekOffset(-1);
    console.log(currentWeekOffSet)
    refreshUI();
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setCurretnWeekOffset(1);
    console.log(currentWeekOffSet)
    refreshUI();
})

