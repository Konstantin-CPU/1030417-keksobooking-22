const getData = (onSuccess, onError) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
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
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      contentType: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
    })
    .catch(() => {
      onError();
    });
}

export {getData, sendData}
