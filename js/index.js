const cityName = document.querySelector('.city-name');
const currentTime = document.querySelector('.current-time');
const weekDay = document.querySelector('.week-day');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const airTemp = document.querySelector('.airTemp');
const namePrecipitation = document.querySelector('.namePrecipitation');
const iconPrecipitation = document.querySelector('.icon-precipitation');
let iconId = '';

function requestWeather(nameLocation, typeForecast) {
  return fetch(`https://api.openweathermap.org/data/2.5/${typeForecast}?${nameLocation}&appid=dbf692c3be3da845df6291dc9f6e03fd&units=metric&lang=en`)
    .then((response) => response.json())
    .catch(() => createModalwindow());
}

async function displayWeather(nameLocation) {
  const current = await requestWeather(nameLocation, 'weather');
  if (current.cod === '404') {
    createModalwindow();
    return;
  }

  const weekly = await requestWeather(nameLocation, 'forecast');
  renderCurrentForecast(current);
  renderWeeklyForecast(weekly);
  return current;
}

const currentTimezone = new Date();
const timeZone = currentTimezone.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
const dateZone = currentTimezone.toLocaleString('en-GB', { month: 'long', day: 'numeric', weekday: 'long' });
currentTime.textContent = timeZone;
weekDay.textContent = dateZone;
const tomorrow = new Date(currentTimezone);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDayTime = tomorrow.setHours(3, 0, 0, 0);
const unixDayTime = tomorrowDayTime / 1000;

function CreateArrUnixTime(time) {
  const arr = [];
  let newTime = time;
  for (let i = 0; i < 10; i += 1) {
    newTime += 43200;
    arr.push(newTime);
  }
  return arr;
}

const arrUnixTime = CreateArrUnixTime(unixDayTime);
const joke = document.querySelector('.textJoke');

const itemsFun = ['Wherever you go, no matter what the weather, always bring your own sunshine', 'How do you prevent a summer cold? Catch it in the winter', 'Bad weather always looks worse through a window', 'If you wait long enough, it will be good weather.. Japanese Proverb'];
let i = 0;
function changeJoke() {
  joke.textContent = itemsFun[i];
  i += 1;
  if (i === itemsFun.length) {
    i = 0;
  }
}

setInterval(changeJoke, 10000);

function renderCurrentForecast(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  humidity.textContent = `${data.main.humidity} %`;
  namePrecipitation.textContent = `${data.weather[0].description}`;
  airTemp.textContent = `${Math.round(data.main.temp)}℃`;
  iconId = data.weather[0].icon;
  iconPrecipitation.setAttribute('src', `http://openweathermap.org/img/wn/${iconId}@2x.png`);
}

function isObjFull(obj) {
  const iterObj = obj;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in iterObj) {
    if (iterObj[key] === undefined) {
      return false;
    }
  }
  return true;
}

function renderWeeklyForecast(data) {
  const forecast = data.list;
  const arrFiltered = forecast.filter((item) => arrUnixTime.includes(item.dt));

  createForecast(arrFiltered);

  function createForecast(array) {
    const dayForecast = {
      date: undefined,
      dailyIcon: undefined,
      tempDaily: undefined,
      tempNight: undefined,
      nightIcon: undefined,
    };
    deletDomElements(forecastWeekly);

    array.forEach((item) => {
      if (item.dt_txt.slice(11) === '12:00:00') {
        dayForecast.date = item.dt_txt.slice(0, 10);
        dayForecast.dailyIcon = item.weather[0].icon;
        dayForecast.tempDaily = Math.round(item.main.temp);
      }
      if (item.dt_txt.slice(11) === '00:00:00') {
        dayForecast.nightIcon = item.weather[0].icon;
        dayForecast.tempNight = Math.round(item.main.temp);
      }
      if (isObjFull(dayForecast)) {
        addWeeklyForecast(dayForecast);
        // eslint-disable-next-line no-restricted-syntax
        for (const key in dayForecast) {
         dayForecast[key] = undefined;
        }
      }
    });
  }
}
