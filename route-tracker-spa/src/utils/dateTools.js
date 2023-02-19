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
    return new Date(date.setDate(date.getDate() + days))
}