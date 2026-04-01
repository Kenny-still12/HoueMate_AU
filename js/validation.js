import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


export function isSelectedWeek(shift, currentWeekOffSet) {
    const shiftDate = dayjs(shift.date);
    const targetWeek = dayjs().add(currentWeekOffSet, "week");

    return shiftDate.isSame(targetWeek, "week")
}

export function hasShift(shift, shifts) {

    return shifts.some((existingShift) => existingShift.date === shift.date)

}