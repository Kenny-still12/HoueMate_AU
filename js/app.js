import { currentWeekOffSet, setCurrentWeekOffset, setShifts } from "./data.js"
import { refreshUI, displayError, clearMessage } from "./render.js"
import { shifts } from "./data.js"
import { deleteData, loadShifts, saveData } from "./storage.js"
import { getTotalMins } from "./logic.js"
import { isSelectedWeek, hasShift } from "./validation.js";


const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const deleteBtn = document.querySelector(".delete-btn");

loadShifts();
refreshUI();


function addNewShift() {
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        shiftId: crypto.randomUUID(),
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: Number(formData.break),
        workPlace: formData.workPlace
    }

    if (!isSelectedWeek(newShift, currentWeekOffSet)) {
        displayError("Please input shift within this week!");
        return;
    }

    if (hasShift(newShift, shifts)) {
        displayError("You aleady logged this dates shift!");
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
    setCurrentWeekOffset(-1);
    console.log(currentWeekOffSet)
    refreshUI();
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setCurrentWeekOffset(1);
    console.log(currentWeekOffSet)
    refreshUI();
})

deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteData();
})

document.addEventListener("click", (e) => {
    const target = e.target.closest(".delete");
    if (!target) return;

    const id = target.dataset.id;
    if (!id) return;

    setShifts(shifts.filter(function (shift) {
        return shift.shiftId !== id;
    }));
    saveData();
    refreshUI();

})

