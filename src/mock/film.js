import { getRandomInteger, getFalseOrTrue, generateValue, generateDescription } from '../helpers/utils';
import { GENRES } from '../helpers/const';
import { generateComment } from './comment';

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

export const generateFilm = () => {
  return {
    title: generateValue(titles),
    poster: generateValue(posters),
    description: generateDescription(descriptions),
    raiting: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    bornYear: getRandomInteger(1930, 2000),
    duration: `${getRandomInteger(1, 3)}h.${getRandomInteger(1, 59)}m`,
    genre: generateValue(GENRES),
    isWatchList: getFalseOrTrue(),
    isWatched: getFalseOrTrue(),
    isFavorite: getFalseOrTrue(),
    comments: Array(getRandomInteger(0,5)).fill().map(generateComment),
  };
};
