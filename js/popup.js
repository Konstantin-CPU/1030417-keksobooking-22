import  {offerData} from './data.js';

const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');

const createCards = (data) => {
  let newElement = popup.cloneNode(true);

  newElement.querySelector('.popup__title').textContent = data.offer.title;
  newElement.querySelector('.popup__text--address').textContent = data.offer.address;
  newElement.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';

  let category = data.offer.type;
  let type = offerData.type[category];

  if (offerData.type[category] === undefined) {
    throw new Error('Ошибка!');
  }

  newElement.querySelector('.popup__type').textContent = type;
  newElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  newElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  const featuresList = newElement.querySelector('.popup__features');
  featuresList.innerHTML = '';

  for (let j = 0; j < data.offer.features.length; j++) {
    if (data.offer.features === undefined) {
      break
    }
    let feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${data.offer.features[j]}`);
    feature.textContent = data.offer.features[j];
    featuresList.appendChild(feature);
  }

  newElement.querySelector('.popup__description').textContent = data.offer.description;

  const photos = newElement.querySelector('.popup__photos');
  const newPictureTemplate = photos.children[0].cloneNode(true);
  photos.children[0].remove();
  for (let j = 0; j < data.offer.photos.length; j++) {
    const newPicture = newPictureTemplate.cloneNode(true);
    newPicture.src = data.offer.photos[j];
    photos.appendChild(newPicture);
  }

  newElement.querySelector('.popup__avatar').src = data.author.avatar;

  return newElement;
}

export {createCards};
