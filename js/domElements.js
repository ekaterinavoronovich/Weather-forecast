function createElement(tag, classList, attributes, textContent, children, childrenAction, handlers) {
  const element = document.createElement(tag);
  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (attributes?.length) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (children) {
    element[childrenAction](...children);
  }

  if (handlers?.length) {
    handlers.forEach(({ event, handler }) => {
      element.addEventListener(event, handler);
    });
  }

  return element;
}

function deletDomElements(item) {
  while (item.firstChild) {
    item.firstChild.remove();
  }
}

const forecastWeekly = document.querySelector('.weekly');

function createDateForecast(list) {
  const date = createElement('p', ['date-forecast'], null, `${list.date}`);
  return date;
}

function createDivElement() {
  const div = createElement('div', ['week-forecast'], null);
  return div;
}

function createImgD(list) {
  let iconId = '';
  iconId = list.dailyIcon;
  const imageAttributes = [
    {
      prop: 'src',
      value: `http://openweathermap.org/img/wn/${iconId}@2x.png`,
    },
  ];

  const imageElement = createElement('img', ['icon-precipitation', 'IconDaily'], imageAttributes);

  return imageElement;
}

function createImgN(list) {
  let iconId = '';
  iconId = list.nightIcon;
  const imageAttributes = [
    {
      prop: 'src',
      value: `http://openweathermap.org/img/wn/${iconId}@2x.png`,
    },
  ];

  const imageElement = createElement('img', ['icon-precipitation', 'IconNight'], imageAttributes);
  return imageElement;
}

function createTempDaily(list) {
  const temp = createElement('p', ['temp-forecast-daily'], null, `${list.tempDaily}℃`);

  return temp;
}

function createTempNight(list) {
  const temp = createElement('p', ['temp-forecast-night'], null, `${list.tempNight}℃`);
  return temp;
}
function addWeeklyForecast(list) {
  const itemDateForecast = createDivElement();
  const dateForecast = createDateForecast(list);
  const imgDailyIcon = createImgN(list);
  const tempDaily = createTempDaily(list);
  const imgNightIcon = createImgD(list);
  const tempNight = createTempNight(list);
  itemDateForecast.append(dateForecast, imgDailyIcon, tempDaily, tempNight, imgNightIcon);
  forecastWeekly.append(itemDateForecast);
}

function removeBtn(event) {
  event.target.parentNode.remove();
  const location = event.target.parentNode.firstChild.textContent;
  let locationLocalstorage = JSON.parse(localStorage.getItem('nameLocation'));
  locationLocalstorage = locationLocalstorage.filter((item) => item !== location);
  localStorage.removeItem('nameLocation');
  localStorage.setItem('nameLocation', JSON.stringify(locationLocalstorage));
}

const localStorageDiv = document.querySelector('.part-storage');

function createLocalStorageForecast(list) {
  function createDivEl() {
    const div = createElement('div', ['localstoreg-item'], null);
    return div;
  }

  function createBtn() {
    const btn = createElement('button', ['btn-delet'], null, 'X', null, null, [{ event: 'click', handler: removeBtn }]);
    return btn;
  }

  function createNameLocation(list) {
    const span = createElement('span', ['name-location'], null, list.name);
    return span;
  }

  function createTempLocation(list) {
    const span = createElement('span', ['temp-location'], null, `${Math.round(list.main.temp)}℃`);
    return span;
  }

  function createimgIcon(list) {
    const iconId = list.weather[0].icon;
    const imageAttributes = [
      {
        prop: 'src',
        value: `http://openweathermap.org/img/wn/${iconId}@2x.png`,
      },
    ];
    const imageElement = createElement('img', ['img-icon'], imageAttributes);
    return imageElement;
  }
  const itemLocation = createDivEl();
  const nameLocation = createNameLocation(list);
  const tempLocation = createTempLocation(list);
  const imgIcon = createimgIcon(list);
  const btnDelet = createBtn();
  itemLocation.append(nameLocation, tempLocation, imgIcon, btnDelet);
  localStorageDiv.append(itemLocation);
}

function removeModalwindow(event) {
  event.target.parentNode.parentNode.remove();
}

function createModalwindow() {
  function createModaldiv() {
    const div = createElement('div', ['modal'], null);
    return div;
  }

  function createInnerdiv() {
    const div = createElement('div', ['modal-content'], null);
    return div;
  }
  function createInnerSpan() {
    const span = createElement('span', ['close'], null, 'Х', null, null, [{ event: 'click', handler: removeModalwindow }]);
    return span;
  }

  function createTextcontent() {
    const p = createElement('p', ['text-inner'], null, "oops....We couldn't find this location....Maybe it's somewhere outside of Earth's civilization....Please check the request...");
    return p;
  }
  const header = document.querySelector('.header');
  const modalDiv = createModaldiv();
  const innerDiv = createInnerdiv();
  const innerSpan = createInnerSpan();
  const innerTextcontent = createTextcontent();

  innerDiv.append(innerSpan, innerTextcontent);
  modalDiv.append(innerDiv);
  header.append(modalDiv);
}
