// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomNumber = function (min, max) {
  if (min < 0 || max <= min) {
    return 'Перепроверьте введенные значения!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomNumberWithPoint = function (min, max, numbersAfterPoint) {
  if (min < 0 || max <= min) {
    return 'Перепроверьте введенные значения!';
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(numbersAfterPoint));
}

alert(getRandomNumber(0, 1000));
alert(getRandomNumberWithPoint(1.1, 1.2, 4));
