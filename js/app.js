const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");


const shifts = [];



addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        break: formData.break,
        workPlace: formData.workPlace
    }
    console.log(shift)
    shifts.push(newShift)
})



