import {categories} from './data.js'

const selectTypeForm = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInForm = document.querySelector('#timein');
const timeOutForm = document.querySelector('#timeout');

priceInput.placeholder = categories.categoryFlat.minPrice;

selectTypeForm.addEventListener('change', function() {
  switch (selectTypeForm.value) {
    case 'bungalow':
      priceInput.placeholder = categories.categoryBungalow.minPrice;
      priceInput.min = categories.categoryBungalow.minPrice;
      break;
    case 'flat':
      priceInput.placeholder = categories.categoryFlat.minPrice;
      priceInput.min = categories.categoryFlat.minPrice;
      break;
    case 'house':
      priceInput.placeholder = categories.categoryHouse.minPrice;
      priceInput.min = categories.categoryHouse.minPrice;
      break;
    case 'palace':
      priceInput.placeholder = categories.categoryPalace.minPrice;
      priceInput.min = categories.categoryPalace.minPrice;
      break;
  }
});

timeInForm.addEventListener('change', function(evt) {
  timeOutForm.value = evt.target.value;
});

timeOutForm.addEventListener('change', function(evt) {
  timeInForm.value = evt.target.value;
});
