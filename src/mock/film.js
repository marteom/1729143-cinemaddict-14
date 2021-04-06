// import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getFalseOrTrue = () => {
  return getRandomInteger(0,1) === 0 ? false : true;
};

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const titles = [
  'made-for-each-other',
  'popeye-meets-sinbad',
  'sagebrush-trail',
  'santa-claus-conquers-the-martians',
  'the-dance-of-life',
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
];

const posters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const genres = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
];

const generateValue = (inputArr) => {
  const randomIndex = getRandomInteger(0, inputArr.length - 1);
  return inputArr[randomIndex];
};

export const generateFilm = () => {

  const description = new Array(getRandomInteger(1, 5)).fill().map(() => generateValue(descriptions));

  return {
    title: generateValue(titles),
    poster: generateValue(posters),
    description,
    raiting: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    bornYear: getRandomInteger(1930, 2000),
    duration: `${getRandomInteger(1, 3)}h.${getRandomInteger(1, 59)}m`,
    genre: generateValue(genres),
    isWatchList: getFalseOrTrue(),
    isWatched: getFalseOrTrue(),
    isFavorite: getFalseOrTrue(),
    // comments: {
    //   emotion: '',
    //   date: '',
    //   autor: '',
    //   comment: '',
    // },
  };
};
