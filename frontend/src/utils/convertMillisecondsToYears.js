const millisecondsPerYear = 31536000000; // количество миллисекунд в среднем году

export default (milliseconds) => {
    const years = milliseconds / millisecondsPerYear;
    return years.toFixed(0); // округляем до двух знаков после запятой
}