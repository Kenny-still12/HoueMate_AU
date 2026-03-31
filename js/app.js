import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { refreshUI } from "./render.js"
const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const inputContainer = document.querySelector(".input-container")
const outputContainer = document.querySelector(".output-cards")
const totalHourSpan = document.querySelector(".total-hour-span")
const remainingHourSpan = document.querySelector(".remaining-hours-span")

const TOTAL_HOUR_IN_MIN = 1440;
let shifts = [];
let currentWeekOffSet = 0;

loadShifts();
refreshUI();


function addNewShift() {
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: formData.break,
        workPlace: formData.workPlace
    }

    if (!isSelectedWeek(newShift)) {
        displayError();
        return;
    }

    shifts.push(newShift);
    saveData();
    refreshUI();
}


addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //clearMessage();
    addNewShift();

})


function getSelectedWeek(offSet) {
    return dayjs().add(offSet, "week");
}

function isSelectedWeek(shift, offSet) {
    const shiftDate = dayjs(shift.date);
    const targetWeek = dayjs().add(offSet, "week");

    return shiftDate.isSame(targetWeek, "week")
}

export function getWeekStart(offset) {
    return getSelectedWeek(offset).startOf("week")
}

function getWeekEnd(offSet) {
    return getSelectedWeek(offSet).endOf("week")
}

export function formatDate(date) {
    return dayjs(date).format("D MMM YYYY")
}

function isCurrentWeek(shift) {
    const shiftDate = dayjs(shift.date);

    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");

    return shiftDate.isAfter(startOfWeek.subtract(1, "millisecond"))
        && shiftDate.isBefore(endOfWeek.add(1, "millisecond"));
}

function isSameWeek(offSet) {
    return dayjs().isSame(getSelectedWeek(offSet), 'week')
}

export function getWeekShift(offSet) {
    const targetWeek = dayjs().add(offSet, "week");

    return shifts.filter((shift) => {
        return dayjs(shift.date).isSame(targetWeek, "week")
    })
}

function getTotalMins(start, end) {

    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number)

    return (endHour * 60 + endMin) - (startHour * 60 + startMin)
}

export function convertHour(totalmins) {
    const hours = Math.floor(totalmins / 60);
    const mins = totalmins % 60;

    return `${hours}h ${mins}m`;
}

export function getDayName(date) {
    const days = ["sunday", 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[(new Date(date).getDay())];
}


export function totalWeekHour(shift) {
    const currentWeek = getWeekShift(currentWeekOffSet);

    const totalHour = currentWeek.reduce((total, shift) => {
        return total += shift.totalMin - shift.break;
    }, 0)

    return totalHour;
}

export function calculateRemainingHours(totalHour) {

    return TOTAL_HOUR_IN_MIN - totalHour;
}

export function isWithinLimit(totalHour) {
    return totalHour < TOTAL_HOUR_IN_MIN ? true : false;
}

console.log(convertHour(totalWeekHour(shifts)))

// functions for data persistence using local storage

function saveData() {
    localStorage.setItem("shifts", JSON.stringify(shifts))
}

function loadShifts() {
    const data = localStorage.getItem("shifts");
    shifts = data ? JSON.parse(data) : [];

}
