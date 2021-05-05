import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import { getRandomInteger } from './common';

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

export const generateValue = (inputArr) => {
  const randomIndex = getRandomInteger(0, inputArr.length - 1);
  return inputArr[randomIndex];
};

export const generateDescription = (descriptions) => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateValue(descriptions));
};

export const getMostCommented = (filmsArray, cntTop) => {
  return filmsArray.sort((a, b) => {
    return (a.comments).length - (b.comments).length;
  })
    .slice(-cntTop);
};

export const getTopRat = (filmsArray, cntTop) => {
  return filmsArray.sort((a, b) => {
    return a.raiting - b.raiting;
  })
    .slice(-cntTop);
};

export const sortFilmsByDate = (FilmA, FilmB) => {
  return dayjs(FilmB.releaseDate) - dayjs(FilmA.releaseDate);
};

export const sortFilmsByRating = (FilmA, FilmB) => {
  return parseFloat(FilmB.raiting) - parseFloat(FilmA.raiting);
};

