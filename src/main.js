import { createProfileTemplate } from './view/profile';
import { createMainMenuTemplate } from './view/site-menu';
import { createSortContentTemplate } from './view/sort-content';
import { createFilmCardTemplate } from './view/film-card';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const FILM_COUNT = 5;
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const displayFilmList = siteMainElement.querySelector('.films');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMainMenuTemplate(), 'beforeend');
render(siteMainElement, createSortContentTemplate(), 'beforeend');