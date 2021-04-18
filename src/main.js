import ProfileView from './view/profile'; //import { createProfileTemplate } from './view/profile';
import SiteMenuView from './view/site-menu.js'; //import { createMainMenuTemplate } from './view/site-menu';
import SortContentView from './view/sort-content'; //import { createSortContentTemplate } from './view/sort-content';
import FilmCardView from './view/film-card'; //import { createFilmCardTemplate } from './view/film-card';
import FilmsView from './view/films'; //import { createFilmsTemplate } from './view/films';
import FilmsListView from './view/films-list'; //import { createFilmsListTemplate } from './view/films-list';
import FilmsListCaptionView from './view/films-list-caption'; //import { createFilmsListCaptionTemplate } from './view/films-list-caption';
import FilmsListContainerView from './view/films-list-container'; //import { createFilmsListContainerTemplate } from './view/films-list-container';
import ShowMoView from './view/showmo-element'; //import { createShowMoTemplate } from './view/showmo-element';
import FilmsListExtraView from './view/films-list-extra'; //import { createFilmsListExtraTemplate } from './view/films-list-extra';
import FilmsListExtraCaptionView from './view/films-list-extra-caption'; //import { createFilmsListExtraCaptionTemplate } from './view/films-list-extra-caption';
import FooterStatisticView from './view/footer-statistic'; //import { createFooterStatisticTemplate } from './view/footer-statistic';
import FilmDetailsView from './view/film-details'; //import { createFilmDetailsTemplate } from './view/film-details';
import { generateFilm } from './mock/film';
import { generateItem } from './mock/menu';
import { EXTRA_CAPTIONS } from './helpers/const';
import { getMostCommented, getTopRat, renderElement, RenderPosition } from './helpers/utils';

// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = 23;
const FILM_EXTRA_COUNT = 2;
let film_count_showed = FILM_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const menuItems = generateItem(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView('Movie Buff').getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteHeaderElement, createProfileTemplate('Movie Buff'), 'beforeend');
renderElement(siteMainElement, new SiteMenuView(menuItems).getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteMainElement, createMainMenuTemplate(menuItems), 'beforeend');
renderElement(siteMainElement, new SortContentView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteMainElement, createSortContentTemplate(), 'beforeend');
renderElement(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteMainElement, createFilmsTemplate(), 'beforeend');

const siteContentFilms = document.querySelector('.films');
renderElement(siteContentFilms, new FilmDetailsView(films[0]).getElement(), RenderPosition.AFTERBEGIN); //renderTemplate(siteContentFilms, createFilmDetailsTemplate(films[0]), 'afterend');
renderElement(siteContentFilms, new FilmsListView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilms, createFilmsListTemplate(), 'beforeend');

const siteContentFilmsList = document.querySelector('.films-list');
renderElement(siteContentFilmsList, new FilmsListCaptionView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsList, createFilmsListCaptionTemplate(), 'beforeend');
renderElement(siteContentFilmsList, new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsList, createFilmsListContainerTemplate(), 'beforeend');

const siteContentFilmsListContainer = document.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  renderElement(siteContentFilmsListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsListContainer, createFilmCardTemplate(films[i]), 'beforeend');
}

if (FILMS_COUNT > FILM_COUNT_PER_STEP) {
  renderElement(siteContentFilmsList, new ShowMoView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsList, createShowMoTemplate(), 'beforeend');
  const showMoreButton = siteContentFilmsList.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
      .forEach((film) =>
      renderElement(siteContentFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND) //renderTemplate(siteContentFilmsListContainer, createFilmCardTemplate(film), 'beforeend'),
      );

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= FILMS_COUNT) {
      showMoreButton.remove();
    }
  });
}

renderElement(siteContentFilms, new FilmsListExtraView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilms, createFilmsListExtraTemplate(), 'beforeend');
renderElement(siteContentFilms, new FilmsListExtraView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilms, createFilmsListExtraTemplate(), 'beforeend');
const siteContentFilmsListExtras = siteContentFilms.querySelectorAll('.films-list--extra');
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderElement(siteContentFilmsListExtras[i], new FilmsListExtraCaptionView(EXTRA_CAPTIONS[i]).getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsListExtras[i], createFilmsListExtraCaptionTemplate(EXTRA_CAPTIONS[i]), 'beforeend');
  renderElement(siteContentFilmsListExtras[i], new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND); //renderTemplate(siteContentFilmsListExtras[i], createFilmsListContainerTemplate(), 'beforeend',);
}

const topRat = getTopRat(films, FILM_EXTRA_COUNT);
for (let i = 0; i < topRat.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[0].querySelector('.films-list__container');
  renderElement(filmsListContainerExtra, new FilmCardView(topRat[i]).getElement(), RenderPosition.BEFOREEND) //renderTemplate(filmsListContainerExtra, createFilmCardTemplate(topRat[i]), 'beforeend',);
}

const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
for (let i = 0; i < mostCommented.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector('.films-list__container');
  renderElement(filmsListContainerExtra, new FilmCardView(mostCommented[i]).getElement(), RenderPosition.BEFOREEND);//renderTemplate(filmsListContainerExtra, createFilmCardTemplate(mostCommented[i]), 'beforeend');
}

const siteFooterElement = document.querySelector('.footer');
const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
  renderElement(footerStatistic, new FooterStatisticView(films.length).getElement(), RenderPosition.BEFOREEND); //renderTemplate(footerStatistic, createFooterStatisticTemplate(films.length), 'beforeend',
