import {categories} from './data.js'

const selectTypeForm = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInForm = document.querySelector('#timein');
const timeOutForm = document.querySelector('#timeout');

selectTypeForm.addEventListener('change', function() {
  switch (selectTypeForm.value) {
    case 'bungalow':
      priceInput.placeholder = categories.bungalow.minPrice;
      priceInput.min = categories.bungalow.minPrice;
      break;
    case 'flat':
      priceInput.placeholder = categories.flat.minPrice;
      priceInput.min = categories.flat.minPrice;
      break;
    case 'house':
      priceInput.placeholder = categories.house.minPrice;
      priceInput.min = categories.house.minPrice;
      break;
    case 'palace':
      priceInput.placeholder = categories.palace.minPrice;
      priceInput.min = categories.palace.minPrice;
      break;
  }
});

let changeEvent = new Event('change');
selectTypeForm.dispatchEvent(changeEvent);

timeInForm.addEventListener('change', function(evt) {
  timeOutForm.value = evt.target.value;
});

timeOutForm.addEventListener('change', function(evt) {
  timeInForm.value = evt.target.value;
});
