import { getRandomInteger, generateValue } from '../helpers/utils';
import { EMOTIONS } from '../helpers/const';
import dayjs from 'dayjs';

const autors = [
  'autor-1',
  'autor-2',
  'autor-3',
  'autor-4',
  'autor-5',
];

const comments = [
  'comment-1',
  'comment-2',
  'comment-3',
  'comment-4',
  'comment-5',
];

export const generateComment = () => {
  return {
    id: getRandomInteger(1,100),
    emotion: generateValue(EMOTIONS),
    date: dayjs().format('YYYY/MM/DD HH:mm'),
    autor: generateValue(autors),
    comment: generateValue(comments),
  };
};
