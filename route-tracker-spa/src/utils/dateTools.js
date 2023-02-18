export const modfiyeDateDay = (date, days) => {
    return new Date(date.setDate(date.getDate() + days))
}