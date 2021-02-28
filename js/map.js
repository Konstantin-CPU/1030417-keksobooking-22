import {getFormAccessibility, addressInput, offersArray} from './form.js';
import popupData from './popup.js';

const L = window.L;

const map = L.map('map-canvas')
  .on('load', () => {
    getFormAccessibility(true);
  })
  .setView({
    lat: 35.6894,
    lng: 139.732,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
)

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

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  let coordinates = evt.target.getLatLng();
  let latitude = coordinates.lat.toFixed(5);
  let longitude = coordinates.lng.toFixed(5);
  addressInput.value = `${latitude}, ${longitude}`;
});





for (let i = 0; i < offersArray.length; i++) {
  const icon = L.icon(
    {
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
  )

  const marker = L.marker(
    {
      lat: offersArray[i].location.x,
      lng: offersArray[i].location.y,
    },
    {
      icon,
    },
  )

  marker.addTo(map);
  marker.bindPopup(popupData[i]);
}