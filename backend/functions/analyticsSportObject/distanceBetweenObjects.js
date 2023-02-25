import db from "../../connections/bd.js"

export default async () => {
    let data = await db.all(`
        SELECT id, "Яндекс_координата_центра_X", "Яндекс_координата_центра_Y" , "Населённый_пункт"
        FROM sportObject
        WHERE 
            "Яндекс_координата_центра_X" LIKE '%.%' AND 
            "Яндекс_координата_центра_Y" LIKE '%.%'
    `)

    let _findAverage = findAverageDistance(data)
    let _findFarthestFromCenter = findFarthestFromCenter(data, 55.7558, 37.6173)
    
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES ('Среднее расстояние между двумя кратчайшими объектами', ${_findAverage});`)
    await db.run(`REPLACE INTO statsSportObject (name, value) VALUES (
        'Дальше всего находится от москвы', 
        '${JSON.stringify(_findFarthestFromCenter)}'
    );`)

}

// Здесь функция findNearestObjects() находит для каждого объекта в массиве расстояние до ближайшего объекта, сохраняет 
// эти расстояния в отдельный массив и возвращает его. Затем функция findAverageDistance() вычисляет
// среднее значение всех элементов этого массива и выводит результат в консоль.
const findNearestObjects = (objects) => {
    const nearestDistances = [];

    for (const obj of objects) {
        let minDistance = Infinity;

        for (const otherObj of objects) {
            if (obj !== otherObj) {
                const distanceBetweenObjects = distance(
                    obj["Яндекс_координата_центра_Y"],
                    obj["Яндекс_координата_центра_X"],
                    otherObj["Яндекс_координата_центра_Y"],
                    otherObj["Яндекс_координата_центра_X"],
                );
                if (distanceBetweenObjects < minDistance) {
                    minDistance = distanceBetweenObjects;
                }
            }
        }

        nearestDistances.push(minDistance);
    }

    return nearestDistances;
}

const findAverageDistance = (objects) => {
    const nearestDistances = findNearestObjects(objects);

    const sum = nearestDistances.reduce((acc, val) => acc + val, 0);
    const avg = sum / nearestDistances.length;

    return avg
}

//Ищет максимальное расстоение от центра москвы
const findFarthestFromCenter = (objects, centerLat, centerLon) => {
    let farthestObject = null;
    let farthestDistance = -Infinity;
    for (let i = 0; i < objects.length; i++) {
        const distanceFromCenter = distance(
            centerLat,
            centerLon,
            objects[i]["Яндекс_координата_центра_X"],
            objects[i]["Яндекс_координата_центра_Y"]
        );
        if (distanceFromCenter > farthestDistance) {
            farthestObject = objects[i];
            farthestDistance = distanceFromCenter;
        }
    }

    farthestObject = {
        ...farthestObject, distance: distance(
            55.7558,
            37.6173,
            farthestObject["Яндекс_координата_центра_Y"],
            farthestObject["Яндекс_координата_центра_X"],
        )
    }

    return farthestObject;
}

//Поиск дистанции
const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Радиус Земли в километрах
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

//перевод в радианы
const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
}