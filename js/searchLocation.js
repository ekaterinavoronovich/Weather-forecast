function findLocation() {
  if (!navigator.geolocation) {
    alert("'Your browser isn't friendly with geolocation...'");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const geo = position.coords;
    const geolocation = `lat=${geo.latitude}&lon=${geo.longitude}`;
    displayWeather(geolocation);
  }

  function error() {
    alert('Unable to determine your geolocation :(');
  }
}
document.onload = findLocation();

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameLocation = `q=${event.target[0].value.trim().toLowerCase()}`;
  const promis = displayWeather(nameLocation);
  promis.then((response) => {
    updateStorage(response);
  });
  event.target[0].value = '';
});
