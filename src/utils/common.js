import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getFalseOrTrue = () => {
  return getRandomInteger(0,1) === 0 ? false : true;
};

export const getUtcDateNow = () => {
  dayjs.extend(utc);
  return dayjs.utc().format();
};

export const getWatchedData = () => {
  const isWatched = getFalseOrTrue();
  return {
    'already_watched': isWatched,
    'watching_date': isWatched ? `${getRandomInteger(2020,2021)}-${getRandomInteger(3,12)}-${getRandomInteger(10,25)}T00:00:00.000Z` : '',
  };
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
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
