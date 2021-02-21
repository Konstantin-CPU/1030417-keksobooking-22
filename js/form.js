const selectTypeForm = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInForm = document.querySelector('#timein');
const timeOutForm = document.querySelector('#timeout');

selectTypeForm.addEventListener('change', function() {
  switch (selectTypeForm.value) {
    case 'bungalow':
      priceInput.placeholder = 0;
      priceInput.min = 0;
      break;
    case 'flat':
      priceInput.placeholder = 1000;
      priceInput.min = 1000;
      break;
    case 'house':
      priceInput.placeholder = 5000;
      priceInput.min = 5000;
      break;
    case 'palace':
      priceInput.placeholder = 10000;
      priceInput.min = 10000;
      break;
  }
});

timeInForm.addEventListener('change', function(evt) {
  timeOutForm.value = evt.target.value;
});

timeOutForm.addEventListener('change', function(evt) {
  timeInForm.value = evt.target.value;
});
