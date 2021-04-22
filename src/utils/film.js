import { getRandomInteger } from './common';

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

export const viewFilmDetails = (element) => {
  document.body.appendChild(element);
  document.body.classList.add('hide-overflow');
};

export const hideFilmDetails = (element) => {
  document.body.removeChild(element);
  document.body.classList.remove('hide-overflow');
};

