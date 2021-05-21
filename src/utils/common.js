import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const getUtcDateNow = () => {
  dayjs.extend(utc);
  return dayjs.utc().format();
};

export const getProfileRating = (countWatched) => {
  if(countWatched === 0) {
    return '';
  }
  else if(countWatched >= 1 && countWatched <= 10) {
    return 'novice';
  }
  else if(countWatched >= 11 && countWatched <= 20) {
    return 'fan';
  }
  else if(countWatched > 20) {
    return 'movie buff';
  }
};
