import offersArray from './data.js';

const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');
const similarOffers = [];

for (let i = 0; i < offersArray.length; i++) {
  let newElement = popup.cloneNode(true);

  newElement.querySelector('.popup__title').textContent = offersArray[i].offer.title;
  newElement.querySelector('.popup__text--address').textContent = offersArray[i].offer.address;
  newElement.querySelector('.popup__text--price').textContent = offersArray[i].offer.price + ' ₽/ночь';

  let type;
  if (offersArray[i].offer.type === 'flat') {
    type = 'flat';
  } else if (offersArray[i].offer.type === 'bungalow') {
    type = 'bungalow';
  } else if (offersArray[i].offer.type === 'house') {
    type = 'house';
  } else if (offersArray[i].offer.type === 'palace') {
    type = 'palace';
  }

  newElement.querySelector('.popup__type').textContent = type;
  newElement.querySelector('.popup__text--capacity').textContent = `${offersArray[i].offer.rooms} комнаты для ${offersArray[i].offer.guests} гостей`;
  newElement.querySelector('.popup__text--time').textContent = `Заезд после ${offersArray[i].offer.checkin}, выезд до ${offersArray[i].offer.checkout}`;

  const featuresList = newElement.querySelector('.popup__features');
  featuresList.innerHTML = '';

  for (let j = 0; j < offersArray[i].offer.features.length; j++) {
    let feature = document.createElement('li');
    feature.classList.add('popup__feauture', `popup__feauture--${offersArray[i].offer.features[j]}`);
    feature.textContent = offersArray[i].offer.features[j];
    featuresList.appendChild(feature);
  }

  newElement.querySelector('.popup__description').textContent = offersArray[i].offer.description;

  const photos = newElement.querySelector('.popup__photos');
  for (let j = 0; j < offersArray[i].offer.photos.length; j++) {
    let newPicture = photos.children[0].cloneNode(true);
    newPicture.src = offersArray[i].offer.photos[j];
    photos.appendChild(newPicture);
  }

  newElement.querySelector('.popup__avatar').src = offersArray[i].author.avatar;

  similarOffers[i] = newElement;
}

const mapBlock = document.querySelector('#map-canvas');
mapBlock.appendChild(similarOffers[0]);

export default similarOffers;
