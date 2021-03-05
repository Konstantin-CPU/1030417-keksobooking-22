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

export {getData}
