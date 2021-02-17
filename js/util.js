// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = (min, max) => {
  if (min < 0 || max <= min) {
    return 'Перепроверьте введенные значения!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomNumberWithPoint = (min, max, numbersAfterPoint) => {
  if (min < 0 || max <= min) {
    return 'Перепроверьте введенные значения!';
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(numbersAfterPoint));
}

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}

const getRandomCoordinates = (elements) => {
  return getRandomNumberWithPoint(elements[0], elements[1], 5);
}

const getPhotos = () => {
  const photos = [];
  for (let i = 0; i <= getRandomNumber(1, 3); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
}

const getRandomArray = (array) => {

  array.slice();

  array.sort(() => Math.random() - 0.5);

  const arrayLength = getRandomNumber(1, array.length);

  const newArray = [];
  for (let i = 0; i < arrayLength; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

export {getRandomNumber, getRandomNumberWithPoint, getRandomArrayItem, getRandomCoordinates, getPhotos, getRandomArray};
