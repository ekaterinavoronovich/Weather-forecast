function displayStoregeElement() {
  if (!localStorage.getItem('nameLocation')) {
    const arrLocation = [];
    localStorage.setItem('nameLocation', JSON.stringify(arrLocation));
    return;
  }

  const ArrStorege = JSON.parse(localStorage.getItem('nameLocation'));
  ArrStorege.forEach((item) => {
    requestWeather(`q=${item}`, 'weather')
      .then((data) => createLocalStorageForecast(data));
  });
}

displayStoregeElement();
function updateStorage(data) {
  const elem = document.querySelector('.part-storage');
  const storage = JSON.parse(localStorage.getItem('nameLocation'));

  if (storage.length > 9) {
    elem.firstElementChild.remove();
    storage.shift();
    localStorage.setItem('nameLocation', JSON.stringify(storage));
  }
  if (!storage.includes(data.name)) {
    storage.push(data.name);
    localStorage.setItem('nameLocation', JSON.stringify(storage));
    createLocalStorageForecast(data);
  }
}
