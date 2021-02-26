import {offerData} from './data.js'

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
