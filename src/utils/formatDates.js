
export const formatDatePretty = (date) => {
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    return `${day}/${month}/${year} ${hours}:${minutes}`
}

const addZero = (value) => {
    return value <= 9 ? '0' + value : value;
}
