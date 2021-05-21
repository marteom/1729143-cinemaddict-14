import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import objectSupport from 'dayjs/plugin/objectSupport';
import { STAT_FILTERS } from '../utils/const';

export const getHumanizeCommentDate = (inputCommentDate) => {
  return dayjs(inputCommentDate).format('YYYY/MM/DD HH:mm');
};

export const getHumanizeReleaseDate = (inputReleaseDate) => {
  return dayjs(inputReleaseDate).format('DD MMMM YYYY');
};

export const getHumanizeDuration = (duration) => {
  dayjs.extend(objectSupport);
  return dayjs({ minute: duration }).format('H[h] m[m]');
};

export const sortFilmsByDate = (FilmA, FilmB) => {
  return dayjs(FilmB.releaseDate) - dayjs(FilmA.releaseDate);
};

export const sortFilmsByRating = (FilmA, FilmB) => {
  return parseFloat(FilmB.raiting) - parseFloat(FilmA.raiting);
};

export const getFilmsStatSorted = (films, statFilter) => {
  const filmsStat = [];

  films.forEach((film) => {
    if(!film.watched.already_watched){
      return;
    }

    switch (statFilter) {
      case STAT_FILTERS.TODAY:
        dayjs.extend(isToday);
        dayjs(film.watched.watching_date).isToday() ? filmsStat.push(film) : '';
        break;
      case STAT_FILTERS.WEEK:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'week'), dayjs()) ? filmsStat.push(film) : '';
        break;
      case STAT_FILTERS.MONTH:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'month'), dayjs()) ? filmsStat.push(film) : '';
        break;
      case STAT_FILTERS.YEAR:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'year'), dayjs()) ? filmsStat.push(film) : '';
        break;
    }
  });

  return filmsStat;

};
