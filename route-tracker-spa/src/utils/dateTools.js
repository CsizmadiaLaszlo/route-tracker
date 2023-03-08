/**
 * Returns a new Date object with the specified number of days added to the original date.
 *
 * @function modfiyeDateDay
 *
 * @param {Date} date - The original date to modify.
 * @param {number} days - The number of days to add to the original date. A negative value can be used to subtract days.
 *
 * @returns {Date} A new Date object with the specified number of days added.
 *
 * @example
 * // Example usage:
 * const myDate = new Date('2022-02-19');
 * const modifiedDate = modfiyeDateDay(myDate, 7); // Returns a new Date object with the date set to 2022-02-26.
 */

export const modfiyeDateDay = (date, days) => {
    return new Date(date.getTime() + days * (24 * 60 * 60 * 1000));
}

export const getDaysOfWeek = (date) => {
    let week= [];
    let current = new Date(date);

    // If current day is Sunday, adjust start of week accordingly
    if (current.getDay() === 0) {
        current.setDate(current.getDate() - 6);
    } else {
        current.setDate((current.getDate() - current.getDay() +1));
    }

    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        );
        current.setDate(current.getDate() +1);
    }
    return week;
};