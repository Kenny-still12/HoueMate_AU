import { shifts, setShifts, currentWeekOffSet } from "./data.js"
import { getWeekShift, getDayName, convertHour, totalWeekHour, calculateRemainingHours, isWithinLimit } from "./logic.js"
import { getWeekStart, formatDate, } from "./date.js"
const inputContainer = document.querySelector(".input-container")
const outputContainer = document.querySelector(".output-cards")
const totalHourSpan = document.querySelector(".total-hour-span")
const remainingHourSpan = document.querySelector(".remaining-hours-span")
const errorMsg = document.querySelector(".error-display")


export function refreshUI() {
    renderWeekDates(currentWeekOffSet)
    renderAllShift(getWeekShift(currentWeekOffSet))
    renderSummary(getWeekShift(currentWeekOffSet))
}


function renderWeekDates(offSet) {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const weekStart = getWeekStart(offSet);

    weekDays.forEach((day, index) => {
        const dateContainer = document.querySelector(`#${day} .date-container`)

        if (dateContainer) {
            dateContainer.innerHTML = "";

            const currentDate = weekStart.add(index, "day");
            const currentDay = document.createElement("p");
            currentDay.classList.add("week-day");
            currentDay.textContent = formatDate(currentDate);
            dateContainer.append(currentDay);
        }
    })

}


function renderAllShift(shifts) {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    weekDays.forEach(day => {
        const container = document.querySelector(`#${day} .shift-container`)
        if (container) container.innerHTML = "";
    })

    shifts.forEach(shift => {
        const dayName = getDayName(shift.date).toLowerCase();
        const container = document.querySelector(`#${dayName} .shift-container`);
        if (container) {

            const shiftCard = document.createElement("div");
            shiftCard.classList.add("shift-card");

            shiftCard.innerHTML = `
                <div class="hour-display">
                    <img src="assets/icons/clock-svgrepo-com.svg" alt="">
                    <p>${shift.startTime} - ${shift.endTime}</p>
                </div>

                <div class="break-display">
                    <img src="assets/icons/coffee-svgrepo-com.svg" alt="">
                    <p>break: ${shift.break} mins</p>
                </div>

                <div class="location-display">
                    <img src="assets/icons/location-svgrepo-com.svg" alt="">
                    <p>${shift.workPlace}</p>
                </div>

                <div class="totalhour-display">
                    <p>${convertHour(shift.totalMin - shift.break)}</p>
                </div>
            `;

            container.append(shiftCard);
        }
    });
}

function renderSummary(shifts) {

    totalHourSpan.textContent = convertHour(totalWeekHour(shifts));

    remainingHourSpan.textContent = convertHour(calculateRemainingHours(totalWeekHour(shifts)));

    if (isWithinLimit(totalWeekHour(shifts))) {
        remainingHourSpan.style.color = "hsla(120, 100%, 45%)";
    }
}

export function displayError() {

    if (inputContainer) {

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("error-display");

        messageDiv.innerHTML = `
                <h2>Error!</h2>
                <p>Please input shift within this week!</p>
        `;

        inputContainer.append(messageDiv);
    }

}

export function clearMessage() {

    errorMsg.classList.add("hidden");

}