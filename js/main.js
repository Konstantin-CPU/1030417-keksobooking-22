// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
'use strict';

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

const OFFERS_COUNTITY = 9;

const EXAMPLE_OBJECT = {
  author: {
    avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
  },
  offer: {
    title: 'Комфортабельные апартаменты с шикарным видом на море по доступной цене',
    address: '',
    price: 0,
    type: [
      'palace',
      'flat',
      'house',
      'bungalow',
    ],
    rooms: 0,
    guests: 0,
    checkin: [
      '12:00',
      '13:00',
      '14:00',
    ],
    checkout: [
      '12:00',
      '13:00',
      '14:00',
    ],
    features: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    description: 'Просторное, уютное жильё стиля софт',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
  },
  location: {
    x: [35.65000, 35.70000],
    y: [139.70000, 139.80000],
  },
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}

const getRandomCoordinates = (elements) => {
  return getRandomNumberWithPoint(elements[0], elements[1], 5);
}

const getPhotos = () => {
  const photos = [];
  for (let i = 1; i <= getRandomNumber(1, 5); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
  }
  return photos;
}

const getRandomFeatures = (array) => {
  const items = [];
  for (let i = getRandomNumber(0, 5); i <= array.length; i++) {
    items[i] = array[Math.floor(Math.random()*items.length)];
  }
  return items;
}

const createOffer = () => {
  const locationX = getRandomCoordinates(EXAMPLE_OBJECT.location.x);
  const locationY = getRandomCoordinates(EXAMPLE_OBJECT.location.y);

  return {
    author: {
      avatar: EXAMPLE_OBJECT.author.avatar,
    },
    offer: {
      title: EXAMPLE_OBJECT.offer.title,
      address: locationX + ' ' + locationY,
      price: getRandomNumber(1000, 5000),
      type: getRandomArrayItem(EXAMPLE_OBJECT.offer.type),
      rooms: getRandomNumber(2, 5),
      guests: getRandomNumber(1, 6),
      checkin: getRandomArrayItem(EXAMPLE_OBJECT.offer.checkin),
      checkout: getRandomArrayItem(EXAMPLE_OBJECT.offer.checkout),
      features: getRandomFeatures(EXAMPLE_OBJECT.offer.features),
      description: EXAMPLE_OBJECT.offer.description,
      photos: getPhotos(),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const offersArray = new Array(OFFERS_COUNTITY + 1).fill(null).map(() => createOffer());
alert(offersArray);
