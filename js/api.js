const recievingDataAddress = 'https://22.javascript.pages.academy/keksobooking/data';
const dataSendingAddress = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  return fetch(recievingDataAddress)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((array) => {
      onSuccess(array);
    })
    .catch((err) => {
      onError(err);
    })
}

const sendData = (onSuccess, onError, body) => {
  fetch(dataSendingAddress,
    {
      method: 'POST',
      contentType: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
}

export {getData, sendData}
