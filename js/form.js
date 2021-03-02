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

window.addEventListener('load', () => {
  const TITLE_MIN_LENGTH = 30;
  const TITLE_MAX_LENGTH = 100;

  const title = document.querySelector('#title');
  title.addEventListener('input', () => {
    const valueLength = title.value.length;
    if (valueLength < TITLE_MIN_LENGTH) {
      title.setCustomValidity(`Ещё ${(TITLE_MIN_LENGTH - valueLength)} симв.`);
    } else if (valueLength > TITLE_MAX_LENGTH) {
      title.setCustomValidity(`Уберите ${(valueLength - TITLE_MAX_LENGTH)} симв.`)
    } else {
      title.setCustomValidity('');
    }

    title.reportValidity();
  });


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

  const PRICE_MAX = 1000000;

  priceInput.addEventListener('input', () => {
    if (priceInput.value > PRICE_MAX) {
      priceInput.setCustomValidity(`Максимальная цена - ${(PRICE_MAX)} руб.`)
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  })

  let changeEvent = new Event('change');
  selectTypeForm.dispatchEvent(changeEvent);

  timeInForm.addEventListener('change', function(evt) {
    timeOutForm.value = evt.target.value;
  });

  timeOutForm.addEventListener('change', function(evt) {
    timeInForm.value = evt.target.value;
  });

  const roomSelect = document.querySelector('#room_number');
  const guestsSelect = document.querySelector('#capacity');

  for (let i = 0; i < roomSelect.length; i++) {
    if (guestsSelect[i].value !== '1') {
      guestsSelect[i].disabled;
    }
  }



  const getAvailableOptions = (value, selectedInput, processingInput) => {
    for (let i = 0; i < processingInput.length; i++) {
      let processingElement = processingInput[i];
      let processingValue = processingElement.value;

      processingElement.disabled = false;

      if (selectedInput.value < '2') {
        if (processingValue !== `${value}`) {
          processingElement.disabled = true;
        }
      }
      if (selectedInput === roomSelect) {
        const exeption = !(processingValue > '0' && processingValue < '3');
        const secondExeption = !(processingValue > '0' && processingValue < '4');

        if (selectedInput.value === '2') {
          if (exeption) {
            processingElement.disabled = true;
          }
        }
        if (selectedInput.value === '3') {
          if (secondExeption) {
            processingElement.disabled = true;
          }
        }
      }

      if (selectedInput === guestsSelect) {
        const exeption = selectedInput.value > '0' && selectedInput.value < '3';
        const secondExeption = selectedInput.value > '0' && selectedInput.value < '4';

        if (exeption) {
          if (!(processingValue > '0' && processingValue < '3')) {
            processingElement.disabled = true;
          }
        }
        if (secondExeption) {
          if (!(processingValue > '0' && processingValue < '4')) {
            processingElement.disabled = true;
          }
        }
      }
    }
  }

  getAvailableOptions(parseInt(roomSelect.value), roomSelect, guestsSelect);


  const controlGuestSelectOption = () => {
    const roomValue = parseInt(roomSelect.value);
    getAvailableOptions(roomValue, roomSelect, guestsSelect);
  }

  const controlRoomSelectOption = () => {
    const guestValue = parseInt(guestsSelect.value);
    getAvailableOptions(guestValue, guestsSelect, roomSelect);
  }

  roomSelect.addEventListener('change', controlGuestSelectOption);
  guestsSelect.addEventListener('change', controlRoomSelectOption);
})





export {getFormAccessibility, addressInput, offersArray};
