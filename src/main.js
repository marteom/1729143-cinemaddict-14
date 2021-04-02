import { createProfileTemplate } from './view/profile';
import { createMainMenuTemplate } from './view/site-menu';
import { createSortContentTemplate } from './view/sort-content';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMainMenuTemplate(), 'beforeend');
render(siteMainElement, createSortContentTemplate(), 'beforeend');