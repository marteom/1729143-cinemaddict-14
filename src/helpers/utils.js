export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getFalseOrTrue = () => {
  return getRandomInteger(0,1) === 0 ? false : true;
};

export const generateValue = (inputArr) => {
  const randomIndex = getRandomInteger(0, inputArr.length - 1);
  return inputArr[randomIndex];
};

export const generateDescription = (descriptions) => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateValue(descriptions));
};

export const getMostCommented = (filmsArray, cntTop) => {
  return filmsArray
    .sort(function (a, b) {
      return (a.comments).length - (b.comments).length;
    })
    .slice(-cntTop);
};

export const getTopRat = (filmsArray, cntTop) => {
  return filmsArray
    .sort(function (a, b) {
      return a.raiting - b.raiting;
    })
    .slice(-cntTop);
};
