import  {offerData} from './data.js';
import  {getData} from './api.js';
import  {map, L} from './map.js';

const templateContent = document.querySelector('#card').content;
const popup = templateContent.querySelector('.popup');
let similarOffers = [];

const getSimilarOffers = (data) => {
  for (let i = 0; i < data.length; i++) {
    let newElement = popup.cloneNode(true);

    newElement.querySelector('.popup__title').textContent = data[i].offer.title;
    newElement.querySelector('.popup__text--address').textContent = data[i].offer.address;
    newElement.querySelector('.popup__text--price').textContent = data[i].offer.price + ' ₽/ночь';

    let category = data[i].offer.type;
    let type = offerData.type[category];

    if (offerData.type[category] === undefined) {
      break;
    }

    newElement.querySelector('.popup__type').textContent = type;
    newElement.querySelector('.popup__text--capacity').textContent = `${data[i].offer.rooms} комнаты для ${data[i].offer.guests} гостей`;
    newElement.querySelector('.popup__text--time').textContent = `Заезд после ${data[i].offer.checkin}, выезд до ${data[i].offer.checkout}`;

    const featuresList = newElement.querySelector('.popup__features');
    featuresList.innerHTML = '';

    for (let j = 0; j < data[i].offer.features.length; j++) {
      if (data[i].offer.features === undefined) {
        break
      }
      let feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${data[i].offer.features[j]}`);
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


    const icon = L.icon(
      {
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      },
    )

    const marker = L.marker(
      {
        lat: data[i].location.x,
        lng: data[i].location.y,
      },
      {
        icon,
      },
    )

    marker.addTo(map);
    marker.bindPopup(similarOffers[i]);
  }
}


getData(
  (array) => {
    return getSimilarOffers(array);
  },
  (err) => {
    return err;
  },
);



export default similarOffers;
