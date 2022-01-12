
const getGenresArray = (array) => {
    const newArray = [];
    array.forEach(item => {
        newArray.push(item.name);
    })
    array[0].name = newArray;
    return array[0];
}

module.exports = { getGenresArray }