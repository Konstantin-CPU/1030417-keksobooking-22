import offersArray from './data.js';

const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');
const mapBlock = document.querySelector('#map-canvas');
const similarOffers = [];

const getSimilarOffers = (data) => {
  for (let i = 0; i < data.length; i++) {
    let newElement = popup.cloneNode(true);

    newElement.querySelector('.popup__title').textContent = data[i].offer.title;
    newElement.querySelector('.popup__text--address').textContent = data[i].offer.address;
    newElement.querySelector('.popup__text--price').textContent = data[i].offer.price + ' ₽/ночь';

    let type;
    if (data[i].offer.type === 'flat') {
      type = 'flat';
    } else if (data[i].offer.type === 'bungalow') {
      type = 'bungalow';
    } else if (data[i].offer.type === 'house') {
      type = 'house';
    } else if (data[i].offer.type === 'palace') {
      type = 'palace';
    }

    newElement.querySelector('.popup__type').textContent = type;
    newElement.querySelector('.popup__text--capacity').textContent = `${data[i].offer.rooms} комнаты для ${data[i].offer.guests} гостей`;
    newElement.querySelector('.popup__text--time').textContent = `Заезд после ${data[i].offer.checkin}, выезд до ${data[i].offer.checkout}`;

    const featuresList = newElement.querySelector('.popup__features');
    featuresList.innerHTML = '';

    for (let j = 0; j < data[i].offer.features.length; j++) {
      let feature = document.createElement('li');
      feature.classList.add('popup__feauture', `popup__feauture--${data[i].offer.features[j]}`);
      feature.textContent = data[i].offer.features[j];
      featuresList.appendChild(feature);
    }

    newElement.querySelector('.popup__description').textContent = data[i].offer.description;

    const photos = newElement.querySelector('.popup__photos');
    const newPictureTemplate = photos.children[0].cloneNode(true);
    photos.children[0].remove();
    for (let j = 0; j < data[i].offer.photos.length; j++) {
      const newPicture = newPictureTemplate.cloneNode(true);
      newPicture.src = data[i].offer.photos[j];
      photos.appendChild(newPicture);
    }

    newElement.querySelector('.popup__avatar').src = data[i].author.avatar;

    similarOffers[i] = newElement;
  }
  return similarOffers;
}

mapBlock.appendChild(getSimilarOffers(offersArray)[0]);

export default mapBlock;
