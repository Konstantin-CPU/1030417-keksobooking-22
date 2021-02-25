import {getRandomNumber, getRandomArrayItem, getRandomCoordinates, getPhotos, getRandomArray} from './util.js'

const OFFERS_COUNTITY = 9;

const exampleObject = {
  author: {
    avatar: 'img/avatars/user01.png',
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

const createOffer = () => {
  const locationX = getRandomCoordinates(exampleObject.location.x);
  const locationY = getRandomCoordinates(exampleObject.location.y);
  const rooms = getRandomNumber(1, 5);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    offer: {
      title: exampleObject.offer.title + '. Количество комнат: ' + rooms,
      address: locationX + ' ' + locationY,
      price: getRandomNumber(1000, 5000),
      type: getRandomArrayItem(exampleObject.offer.type),
      rooms: rooms,
      guests: getRandomNumber(1, 6),
      checkin: getRandomArrayItem(exampleObject.offer.checkin),
      checkout: getRandomArrayItem(exampleObject.offer.checkout),
      features: getRandomArray(exampleObject.offer.features),
      description: exampleObject.offer.description,
      photos: getPhotos(),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const offerData = {
  type: {
    bungalow: 'Бунгало',
    house: 'Дом',
    flat: 'Квартира',
    palace: 'Дворец',
  },
  minPrice: {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  },
}

const offersArray = new Array(OFFERS_COUNTITY + 1).fill(null).map(() => createOffer());
export {offersArray, offerData};
