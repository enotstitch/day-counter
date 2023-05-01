import moment from '../node_modules/moment/moment';
import flatpickr from 'flatpickr';
import { flatpickrConfig } from './flatpickr';
import { declOfNum } from './declOfNum';

import {
  form,
  date,
  yearsBlock,
  daysBlock,
  hoursBlock,
  yearsText,
  daysText,
  hoursText,
} from './view';

flatpickr('input[type="text"]', flatpickrConfig);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  count();
});

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
