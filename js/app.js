const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const weekDay = document.querySelectorAll(".week-day")


const shifts = [];
let weekOffSet = 0;

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
                    <p>${convertHour(shift.totalMin)}</p>
                </div>
            `;

            container.append(shiftCard);
        }
    });
}


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: formData.break,
        workPlace: formData.workPlace
    }
    shifts.push(newShift)
    renderAllShift(shifts);
    console.log(newShift)
    console.log(convertHour(newShift.totalMin))
})


function getTotalMins(start, end) {

    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number)

    return (endHour * 60 + endMin) - (startHour * 60 + startMin)
}

function convertHour(totalmins) {
    const hours = Math.floor(totalmins / 60);
    const mins = totalmins % 60;

    return `${hours}h ${mins}m`;
}

function getDayName(date) {
    const days = ["sunday", 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[(new Date(date).getDay())];
}
