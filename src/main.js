import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu.js';
import SortContentView from './view/sort-content';
import FilmCardView from './view/film-card';
import FilmsView from './view/films';
import FilmsListView from './view/films-list';
import FilmsListCaptionView from './view/films-list-caption';
import FilmsListContainerView from './view/films-list-container';
import ShowMoView from './view/showmo-element';
import FilmsListExtraView from './view/films-list-extra';
import FilmsListExtraCaptionView from './view/films-list-extra-caption';
import FooterStatisticView from './view/footer-statistic';
import { generateFilm } from './mock/film';
import { generateItem } from './mock/menu';
import { EXTRA_CAPTIONS } from './helpers/const';
import { getMostCommented, getTopRat, renderElement, RenderPosition } from './helpers/utils';

const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = 23;
const FILM_EXTRA_COUNT = 2;
let film_count_showed = FILM_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const menuItems = generateItem(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView('Movie Buff').getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(menuItems).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortContentView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

const siteContentFilms = document.querySelector('.films');
renderElement(siteContentFilms, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const siteContentFilmsList = document.querySelector('.films-list');
renderElement(siteContentFilmsList, new FilmsListCaptionView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteContentFilmsList, new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND);

const siteContentFilmsListContainer = document.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  renderElement(siteContentFilmsListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (FILMS_COUNT > FILM_COUNT_PER_STEP) {
  renderElement(siteContentFilmsList, new ShowMoView().getElement(), RenderPosition.BEFOREEND);
  const showMoreButton = siteContentFilmsList.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
      .forEach((film) =>
        renderElement(siteContentFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND),
      );

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= FILMS_COUNT) {
      showMoreButton.remove();
    }
  });
}

renderElement(siteContentFilms, new FilmsListExtraView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteContentFilms, new FilmsListExtraView().getElement(), RenderPosition.BEFOREEND);
const siteContentFilmsListExtras = siteContentFilms.querySelectorAll('.films-list--extra');
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderElement(siteContentFilmsListExtras[i], new FilmsListExtraCaptionView(EXTRA_CAPTIONS[i]).getElement(), RenderPosition.BEFOREEND);
  renderElement(siteContentFilmsListExtras[i], new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND);
}

const topRat = getTopRat(films, FILM_EXTRA_COUNT);
for (let i = 0; i < topRat.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[0].querySelector('.films-list__container');
  renderElement(filmsListContainerExtra, new FilmCardView(topRat[i]).getElement(), RenderPosition.BEFOREEND);
}

const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
for (let i = 0; i < mostCommented.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector('.films-list__container');
  renderElement(filmsListContainerExtra, new FilmCardView(mostCommented[i]).getElement(), RenderPosition.BEFOREEND);
}

const siteFooterElement = document.querySelector('.footer');
const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
renderElement(footerStatistic, new FooterStatisticView(films.length).getElement(), RenderPosition.BEFOREEND);
