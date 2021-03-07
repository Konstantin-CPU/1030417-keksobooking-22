import {mapFilterForm} from './form.js'

const SELECTS = mapFilterForm.querySelectorAll('select');

const TYPE_SELECT = mapFilterForm.querySelector('#housing-type');

const PRICE_SELECT = mapFilterForm.querySelector('#housing-price');

const ROOMS_SELECT = mapFilterForm.querySelector('#housing-rooms');

const GUESTS_SELECT = mapFilterForm.querySelector('#housing-guests');

const FEATURES_FIELDSET = mapFilterForm.querySelector('#housing-features');

const disableFilter = () => {
  mapFilterForm.classList.add('map__filters--disabled');
  SELECTS.forEach((select) => {
    select.disabled = true;
  });
  FEATURES_FIELDSET.disabled = true;
};
disableFilter();
const enableFilter = () => {
  mapFilterForm.classList.remove('map__filters--disabled');
  SELECTS.forEach((select) => {
    select.disabled = false;
  });
  FEATURES_FIELDSET.disabled = false;
};

const getFilterByPrice = (data) => {
  const LOW_PRICE = 10000;

  const HIGH_PRICE = 50000;

  switch (PRICE_SELECT.value) {
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
  const CHECKED_FEATURES = FEATURES_FIELDSET.querySelectorAll('input:checked');
  return Array.from(CHECKED_FEATURES).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const filterAds = (data) => {
  const FILTER_BY_TYPE = TYPE_SELECT.value === 'any' || TYPE_SELECT.value === data.offer.type;

  const FILTER_BY_ROOMS = ROOMS_SELECT.value === 'any' || +ROOMS_SELECT.value === data.offer.rooms;

  const FILTER_BY_GUESTS = GUESTS_SELECT.value === 'any' || +GUESTS_SELECT.value === data.offer.guests;

  const FILTER_BY_PRICE = getFilterByPrice(data);

  const FILTER_BY_FEATURES = getFilterByFeatures(data);

  return FILTER_BY_TYPE && FILTER_BY_ROOMS && FILTER_BY_GUESTS && FILTER_BY_PRICE && FILTER_BY_FEATURES;
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

export {enableFilter, disableFilter, filterAds, setFilterChange, setFilterReset};
