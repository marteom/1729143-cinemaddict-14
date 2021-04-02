import { createProfileTemplate } from './view/profile';
import { createMainMenuTemplate } from './view/site-menu';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMainMenuTemplate(), 'beforeend');