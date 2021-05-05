import { generateValue, generateDescription } from '../utils/film';
import { getRandomInteger, getFalseOrTrue } from '../utils/common';
import { GENRES } from '../utils/const';
import { generateComment } from './comment';
import { nanoid } from 'nanoid';

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

const directors = [
  'Anthony Mann',
  'Steven Spielberg',
  'Woody Allen',
  'Luc Besson',
  'Stanley Kubrick',
];

const actors = [
  'Tom Cruise',
  'Benedict Cumberbatch',
  'Keanu Reeves',
  'Milla Jovovich',
  'Keira Knightley',
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

const countries = [
  'USA',
  'Russia',
  'Poland',
  'Germany',
  'Italy',
];

export const generateFilm = () => {
  return {
    id: nanoid(),
    title: generateValue(titles),
    poster: generateValue(posters),
    country: generateValue(countries),
    description: generateDescription(descriptions),
    raiting: `${getRandomInteger(1, 9)}.${getRandomInteger(1, 9)}`,
    bornYear: getRandomInteger(1930, 2000),
    duration: getRandomInteger(15, 200),
    genres: Array(getRandomInteger(1,3)).fill().map(() => generateValue(GENRES)),
    isWatchList: getFalseOrTrue(),
    isWatched: getFalseOrTrue(),
    isFavorite: getFalseOrTrue(),
    comments: Array(getRandomInteger(0,5)).fill().map(generateComment),
    detailsAge: getRandomInteger(0, 18),
    director: generateValue(directors),
    writers: Array(getRandomInteger(1,3)).fill().map(() => generateValue(directors)),
    actors: Array(getRandomInteger(1,5)).fill().map(() => generateValue(actors)),
    releaseDate: `${getRandomInteger(1985,2021)}-${getRandomInteger(10,12)}-${getRandomInteger(10,25)}T00:00:00.000Z`,
  };
};
