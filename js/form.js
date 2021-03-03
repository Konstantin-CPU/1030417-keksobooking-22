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

  const getAvailableOptions = (selectedInput, processingInput) => {
    for (let i = 0; i < processingInput.length; i++) {

      roomSelect.setCustomValidity('');

      processingInput[i].disabled = false;

      if (selectedInput.value === '100') {
        if (processingInput[i].value !== '0') {
          processingInput[i].disabled = true;
        }
      }

      if (selectedInput.value === '1') {
        if (processingInput[i].value !== '1') {
          processingInput[i].disabled = true;
        }
      }

      if (selectedInput.value > 1 && selectedInput.value < 4) {
        if (processingInput[i].value < '1' || processingInput[i].value > selectedInput.value) {
          processingInput[i].disabled = true;
        }
      }
    }
  }

  getAvailableOptions(roomSelect, guestsSelect)

  const controlGuestSelectOption = () => {
    getAvailableOptions(roomSelect, guestsSelect);
  }

  roomSelect.addEventListener('change', controlGuestSelectOption);
  guestsSelect.addEventListener('change', () => {
    roomSelect.setCustomValidity('');
  })

  adInfoForm.addEventListener('submit', (evt) => {
    if (roomSelect.value === '100') {
      if (guestsSelect.value !== '0') {
        evt.preventDefault();
        roomSelect.setCustomValidity('Не для гостей!');
      }
    }

    if (roomSelect.value === '1') {
      if (guestsSelect.value !== '1') {
        evt.preventDefault();
        roomSelect.setCustomValidity('Ошибка');
      }
    }

    if (roomSelect.value > 1 && roomSelect.value < 4) {
      if (guestsSelect.value < '1' || guestsSelect.value.value > roomSelect.value) {
        evt.preventDefault();
        roomSelect.setCustomValidity('Гостей не может быть больше комнат!');
      }
    }
    roomSelect.reportValidity();
  })
})
export {getFormAccessibility, addressInput, offersArray};
