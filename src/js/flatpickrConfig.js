import moment from 'moment';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

const nextDay = moment().add(1, 'days').format('YYYY-MM-DD');

export const flatpickrConfig = {
  locale: Russian,
  altInput: true,
  minDate: nextDay,
  position: 'auto center',
};
