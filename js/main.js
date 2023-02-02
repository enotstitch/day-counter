import moment from 'moment';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

const form = document.querySelector('.day-counter__wrap');
const date = document.querySelector('.day-counter__date');
const yearsBlock = document.querySelector('.result-item__num--years');
const daysBlock = document.querySelector('.result-item__num--days');
const hoursBlock = document.querySelector('.result-item__num--hours');
const yearsText = document.querySelector('.result-item__text--years');
const daysText = document.querySelector('.result-item__text--days');
const hoursText = document.querySelector('.result-item__text--hours');

let nextDay = moment().add('days', 1).format('YYYY-MM-DD');

flatpickrConfig = {
  locale: Russian,
  altInput: true,
  minDate: nextDay,
  position: 'auto center',
};

flatpickr('input[type="text"]', flatpickrConfig);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  count();
});

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

const count = () => {
  const dateValue = moment(date.value);
  const now = moment();
  let dateDiff = dateValue - now;

  if (isNaN(dateValue)) {
    return;
  }

  let years = dateValue.diff(now, 'years');
  yearsBlock.textContent = years;

  let leapYears = 0;
  let nextYear = dateValue.year();
  let year = now.year();

  for (leapYears; year <= nextYear; year++) {
    if (moment([year]).isLeapYear()) {
      leapYears++;
    }
  }

  let days = Math.round(dateDiff / 1000 / 60 / 60 / 24 + leapYears) % 365;
  daysBlock.textContent = days;

  let hours = Math.round(dateDiff / 1000 / 60 / 60) % 24;
  hoursBlock.textContent = hours;

  yearsText.textContent = declOfNum(years, ['год', 'года', 'лет']);
  daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
  hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
};
