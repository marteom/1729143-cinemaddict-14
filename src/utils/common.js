import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { RATING_VALUES } from './const';

export const getUtcDateNow = () => {
  dayjs.extend(utc);
  return dayjs.utc().format();
};

export const getProfileRating = (countWatched) => {
  if(countWatched === 0) {
    return '';
  }
  else if(countWatched > 0 && countWatched <= RATING_VALUES.NOVICE) {
    return 'novice';
  }
  else if(countWatched > RATING_VALUES.NOVICE && countWatched <= RATING_VALUES.FAN) {
    return 'fan';
  }
  else if(countWatched >= RATING_VALUES.MOVIE_BUFF) {
    return 'movie buff';
  }
};
