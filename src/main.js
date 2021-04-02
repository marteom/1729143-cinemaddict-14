import { createProfileTemplate } from './view/profile';
import { createMainMenuTemplate } from './view/site-menu';
import { createSortContentTemplate } from './view/sort-content';
import { createFilmCardTemplate } from './view/film-card';
import { createFilmsTemplate } from './view/films';
import { createFilmsListTemplate } from './view/films-list';
import { createFilmsListCaptionTemplate } from './view/films-list-caption';
import { createFilmsListContainerTemplate } from './view/films-list-container';
import { createShowMoTemplate } from './view/showmo-element';
import { createFilmsListExtraTemplate } from './view/films-list-extra';
import { createFilmsListExtraCaptionTemplate } from './view/films-list-extra-caption';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;
const extraCaptions = ['Top rated', 'Most commented'];

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMainMenuTemplate(), 'beforeend');
render(siteMainElement, createSortContentTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const siteContentFilms = document.querySelector('.films');
render(siteContentFilms, createFilmsListTemplate(), 'beforeend');

const siteContentFilmsList = document.querySelector('.films-list');
render(siteContentFilmsList, createFilmsListCaptionTemplate(), 'beforeend');
render(siteContentFilmsList, createFilmsListContainerTemplate(), 'beforeend');
render(siteContentFilmsList, createShowMoTemplate(), 'beforeend');

const siteContentFilmsListContainer = document.querySelector('.films-list__container');
for(let i=0; i<FILM_COUNT; i++){
    render(siteContentFilmsListContainer, createFilmCardTemplate(), 'beforeend');
}

for(let i=0; i<FILM_EXTRA_COUNT; i++){
    render(siteContentFilms, createFilmsListExtraTemplate(), 'beforeend');
    
    const siteContentFilmsListExtras = siteContentFilms.querySelectorAll('.films-list--extra');
    render(siteContentFilmsListExtras[i], createFilmsListExtraCaptionTemplate(extraCaptions[i]), 'beforeend');
    render(siteContentFilmsListExtras[i], createFilmsListContainerTemplate(), 'beforeend');

    const filmsListContainerExtra = siteContentFilmsListExtras[i].querySelector('.films-list__container');
    render(filmsListContainerExtra, createFilmCardTemplate(), 'beforeend');
    render(filmsListContainerExtra, createFilmCardTemplate(), 'beforeend');
}