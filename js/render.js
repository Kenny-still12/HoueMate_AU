import { shifts, setShifts, currentWeekOffSet, statusConfig } from "./data.js"
import { getWeekShift, getDayName, converAndFormatTotHour, totalWeekHour, calculateRemainingHours, isWithinLimit, getStatus, convertInHours } from "./logic.js"
import { getWeekStart, formatDate, } from "./date.js"
const inputContainer = document.querySelector(".input-container")
const outputContainer = document.querySelector(".output-cards")
const totalHourSpan = document.querySelector(".total-hour-span")
const remainingHourSpan = document.querySelector(".remaining-hours-span")
const errorMsg = document.querySelector(".error-display")
const statusDisplay = document.querySelector(".status-display");
const statusCard = document.querySelector(".status-card");


export function refreshUI() {
    renderWeekDates(currentWeekOffSet)
    renderAllShift(getWeekShift(currentWeekOffSet))
    renderSummary(getWeekShift(currentWeekOffSet))
    renderStatus(shifts)
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
            const currentDayName = document.createElement("p");
            currentDay.classList.add("week-day");
            currentDay.textContent = formatDate(currentDate);
            currentDayName.textContent = `${day}`;
            currentDayName.classList.add("week-day");
            dateContainer.append(currentDay);
            dateContainer.append(currentDayName);
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
                    <img src="./assets/icons/clock-svgrepo-com.svg" alt="">
                    <p>${shift.startTime} - ${shift.endTime}</p>
                </div>

                <div class="break-display">
                    <img src="./assets/icons/coffee-svgrepo-com.svg" alt="">
                    <p>break: ${shift.break} mins</p>
                </div>

                <div class="location-display">
                    <img src="./assets/icons/location-svgrepo-com.svg" alt="">
                    <p>${shift.workPlace}</p>
                </div>

                <div class="totalhour-display">
                    <p>${converAndFormatTotHour(shift.totalMin - shift.break)}</p>
                    <button data-id="${shift.shiftId}" class="delete" >
                    <img src="./assets/icons/delete-2-svgrepo-com.svg">
                    </button>
                </div>
            `;

            container.append(shiftCard);
        }
    });
}

function renderSummary(shifts) {

    totalHourSpan.textContent = converAndFormatTotHour(totalWeekHour(shifts));

    remainingHourSpan.textContent = converAndFormatTotHour(calculateRemainingHours(totalWeekHour(shifts)));

    if (isWithinLimit(totalWeekHour(shifts))) {
        remainingHourSpan.style.color = "hsla(120, 100%, 45%)";
    }
}

function renderStatus(shifts) {

    const totalRemainingHours = convertInHours(calculateRemainingHours(totalWeekHour(shifts)));
    const status = getStatus(totalRemainingHours)
    const config = statusConfig[status];

    statusCard.dataset.status = status;


    statusCard.innerHTML = `
        <div class="status-image">
            <img src="${config.image}" alt ="">
        </div>
        <div class="status-message">
            <h2>${config.title}</h2>
            <p>${config.message}</p>
        </div>
    `;

    statusDisplay.append(statusCard);
}

export function displayError(MessageContent) {

    if (inputContainer) {

        errorMsg.classList.remove("hidden");
        errorMsg.innerHTML = `
                <h2>Error!</h2>
                <p>${MessageContent}</p>
        `;

    }

}

export function clearMessage() {

    errorMsg.classList.add("hidden");

}