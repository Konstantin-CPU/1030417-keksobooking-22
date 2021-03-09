import {mapFilterForm} from './form.js'

const selects = mapFilterForm.querySelectorAll('select');
const typeSelect = mapFilterForm.querySelector('#housing-type');
const priceSelect = mapFilterForm.querySelector('#housing-price');
const roomSelect = mapFilterForm.querySelector('#housing-rooms');
const guestSelect = mapFilterForm.querySelector('#housing-guests');
const featuresFieldset = mapFilterForm.querySelector('#housing-features');

const disableFilter = () => {
  mapFilterForm.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
  featuresFieldset.disabled = true;
};
disableFilter();

const getFilterByPrice = (data) => {
  const LOW_PRICE = 10000;

  const HIGH_PRICE = 50000;

  switch (priceSelect.value) {
    case 'low':
      return data.offer.price < LOW_PRICE;
    case 'middle':
      return data.offer.price >= LOW_PRICE && data.offer.price <= HIGH_PRICE;
    case 'high':
      return data.offer.price > HIGH_PRICE;
    case 'any':
      return true;
  }
};

const getFilterByFeatures = (data) => {
  const checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const filterAds = (data) => {
  const filterByType = typeSelect.value === 'any' || typeSelect.value === data.offer.type;
  const filterByRooms = roomSelect.value === 'any' || +roomSelect.value === data.offer.rooms;
  const filterByGuests = guestSelect.value === 'any' || +guestSelect.value === data.offer.guests;
  const filterByPrice = getFilterByPrice(data);
  const filterByFeatures = getFilterByFeatures(data);

  return filterByType && filterByRooms && filterByGuests && filterByPrice && filterByFeatures;
};

const setFilterChange = (cb) => {
  mapFilterForm.addEventListener('change', () => {
    cb();
  });
};

const setFilterReset = (cb) => {
  mapFilterForm.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};

export {disableFilter, filterAds, setFilterChange, setFilterReset};
