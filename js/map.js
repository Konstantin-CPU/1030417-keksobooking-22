import {getFormAccessibility, getFilterAccessibility, addressInput} from './form.js';
import {filterAds, setFilterChange, setFilterReset} from './filter.js'
import {createCards} from './popup.js'
import {getData} from './api.js'

const L = window.L;
const _ = window._;

const map = L.map('map-canvas')
  .on('load', () => {
    getFormAccessibility(true);
  })
  .setView({
    lat: 35.6894,
    lng: 139.732,
  }, 10);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.684,
    lng: 139.752,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
)

const smallMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  let coordinates = evt.target.getLatLng();
  let latitude = coordinates.lat.toFixed(5);
  let longitude = coordinates.lng.toFixed(5);
  addressInput.value = `${latitude}, ${longitude}`;
});

let smallMarkers = [];

const createSimilarAds = similarAds => {
  smallMarkers.forEach((marker) => marker.remove());

  similarAds
    .slice()
    .filter(filterAds)
    .slice(0, 10)
    .forEach((ad) => {
      const smallMarker = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng,
        },
        {
          icon: smallMarkerIcon,
        },
      );

      smallMarker
        .addTo(map)
        .bindPopup(createCards(ad));

      smallMarkers.push(smallMarker);
    });
};

const RERENDER_DELAY = 500;

getData((ads) => {
  createSimilarAds(ads);
  setFilterReset(() => createSimilarAds(ads));
  setFilterChange(_.debounce(
    () => createSimilarAds(ads),
    RERENDER_DELAY,
  ));
  getFilterAccessibility(true);
},
(err) => {
  getFilterAccessibility();
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'brown';

  alertContainer.textContent = err;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
});

export {map, mainMarker}
