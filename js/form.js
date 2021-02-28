import {offersArray, offerData} from './data.js'

const adInfoForm = document.querySelector('.ad-form');
const adInfoFormFieldsets = document.querySelector('.notice')
  .querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = document.querySelector('.map__filters-container')
  .querySelectorAll('select, fieldset');

const getFormAccessibility = (boolean) => {
  if (boolean === true) {
    adInfoForm.classList.remove('ad-form--disabled');
    adInfoFormFieldsets.forEach(element => {
      element.disabled = false;
    });
    mapFilterForm.classList.remove('map__filters--disabled');
    mapFilterFormElements.forEach(element => {
      element.disabled = false;
    });
  } else {
    adInfoForm.classList.add('ad-form--disabled');
    adInfoFormFieldsets.forEach(element => {
      element.disabled = true;
    });
    mapFilterForm.classList.add('map__filters--disabled');
    mapFilterFormElements.forEach(element => {
      element.disabled = true;
    });
  }
}

getFormAccessibility();

const addressInput = document.querySelector('#address');
addressInput.value = '35.6894, 139.692';

const selectTypeForm = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInForm = document.querySelector('#timein');
const timeOutForm = document.querySelector('#timeout');

const minPrice = offerData.minPrice;

const setMinPrice = () =>  {
  const minPriceKeys = Object.keys(minPrice);
  minPriceKeys.forEach(element => {
    if (element === selectTypeForm.value) {
      priceInput.placeholder = minPrice[element];
      priceInput.min = minPrice[element];
    }
  });
};

selectTypeForm.addEventListener('change', setMinPrice);

let changeEvent = new Event('change');
selectTypeForm.dispatchEvent(changeEvent);

timeInForm.addEventListener('change', function(evt) {
  timeOutForm.value = evt.target.value;
});

timeOutForm.addEventListener('change', function(evt) {
  timeInForm.value = evt.target.value;
});

export {getFormAccessibility, addressInput, offersArray};
