'use strict';

// ////////////////////////////////////////////////////////////////////////////////// //
// PUBLIC
// ////////////////////////////////////////////////////////////////////////////////// //

function floor(number, min) {
    number = parseInt(number) || min;
    number = number < min
        ? min
        : number;

    return number;
}

function roof(number, max) {
    number = parseInt(number) || max;
    number = number > max
        ? max
        : number;

    return number;
}

function minMax(number, min, max) {
    return roof(floor(number, min), max);
}

function splitUnderscore(item, keyName) {
    let object = {};

    for (let key in item) {
        if (key.indexOf(keyName) === -1) continue;

        let split = key.split('_')[1];

        object[split] = item[key];
        delete item[key];
    }

    return object;
}

function splitUnderscoreInItem(item) {
    for (let key in item) {
        if (key.indexOf('_') === -1) continue;
        let split = key.split('_')[0];

        item[split] = splitUnderscore(item, split);
    }

    return item;
}

function splitUnderscoreInArray(array) {
    let data = array;

    for (let i in data) {
        data[i] = splitUnderscoreInItem(data[i]);
    }

    return data;
}

function addUniqueItemsToArray(array, input) {
    for (let i in input) {
        let inputItem = input[i];
        let inputExists = false;

        for (let x in array) {
            let arrayItem = array[x];

            if (inputItem.id === arrayItem.id) inputExists = true;
        }

        if (!inputExists) {
            array.push(inputItem);
        }
    }

    return array;
}

function sortArrayOnProperty(array, property) {
    if (array.length < 2) return array;

    let data = array;

    data.sort((a, b) => {
        let propA = a[property].toUpperCase();
        let propB = b[property].toUpperCase();

        if (propA < propB) {
            return -1;
        } else if (propA > propB) {
            return 1;
        } else {
            return 0;
        }
    });

    return data;
}

function mergeArraysOnUniqueId(array, newArray) {
    let data = array;

    for (let i in newArray) {
        let exists = false;

        for (let n in array) {
            if (newArray[i].id === array[n].id) exists = true;
        }

        if (!exists) data.push(newArray[i]);
    }

    return data;
}

function pruneArrayFromExistingIds(array, existingArray) {
    let data = [];

    for (let i in array) {
        let exists = false;

        for (let n in existingArray) {
            if (array[i].id === existingArray[n].id) exists = true;
        }

        if (!exists) data.push(array[i]);
    }

    return data;
}

// ////////////////////////////////////////////////////////////////////////////////// //
// EXPORTS
// ////////////////////////////////////////////////////////////////////////////////// //

module.exports.floor = floor;
module.exports.roof = roof;
module.exports.minMax = minMax;
module.exports.splitUnderscore = splitUnderscore;
module.exports.splitUnderscoreInItem = splitUnderscoreInItem;
module.exports.splitUnderscoreInArray = splitUnderscoreInArray;
module.exports.addUniqueItemsToArray = addUniqueItemsToArray;
module.exports.sortArrayOnProperty = sortArrayOnProperty;
module.exports.mergeArraysOnUniqueId = mergeArraysOnUniqueId;
module.exports.pruneArrayFromExistingIds = pruneArrayFromExistingIds;