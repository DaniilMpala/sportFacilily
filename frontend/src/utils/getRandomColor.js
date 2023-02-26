export default () => {
    // Генерируем три случайных числа от 0 до 255
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Конвертируем числа в hex-строки и объединяем их
    const hexRed = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue = blue.toString(16).padStart(2, '0');
    const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

    return hexColor;
}