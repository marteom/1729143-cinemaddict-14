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
import FilmsListEmptyView from './view/films-list-empty';
import { generateFilm } from './mock/film';
import { generateItem } from './mock/menu';
import { EXTRA_CAPTIONS } from './helpers/const';
import { getMostCommented, getTopRat, renderElement, RenderPosition, viewFilmDetails } from './helpers/utils';
import { remove } from './utils/render';

const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = 27;
const FILM_EXTRA_COUNT = 2;
let film_count_showed = FILM_COUNT_PER_STEP;
let filmCardElement = null;

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

if(films.length === 0){
  renderElement(siteContentFilmsList, new FilmsListEmptyView().getElement(), RenderPosition.BEFOREEND);
}
else{
  renderElement(siteContentFilmsList, new FilmsListCaptionView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteContentFilmsList, new FilmsListContainerView().getElement(), RenderPosition.BEFOREEND);

  const siteContentFilmsListContainer = document.querySelector('.films-list__container');
  for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
    filmCardElement = new FilmCardView(films[i]);
    films.length > i ? renderElement(siteContentFilmsListContainer, filmCardElement.getElement(), RenderPosition.BEFOREEND) : '';
    filmCardElement.setClickHandler(() => {
    });
  }

  if (FILMS_COUNT > FILM_COUNT_PER_STEP) {
    const showMoButtonComponent = new ShowMoView();
    renderElement(siteContentFilmsList, showMoButtonComponent.getElement(), RenderPosition.BEFOREEND);
    showMoButtonComponent.setClickHandler(() => {
      films
        .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
        .forEach((film) =>
          filmCardElement = new FilmCardView(film),
          renderElement(siteContentFilmsListContainer, filmCardElement.getElement(), RenderPosition.BEFOREEND),
          // filmCardElement.setClickHandler(() => {
          // })
        );

      film_count_showed += FILM_COUNT_PER_STEP;

      if (film_count_showed >= FILMS_COUNT) {
        remove(showMoButtonComponent);
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
    filmCardElement = new FilmCardView(topRat[i]);
    renderElement(filmsListContainerExtra, filmCardElement.getElement(), RenderPosition.BEFOREEND);

    filmCardElement.setClickHandler(() => {
    });
  }

  const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
  for (let i = 0; i < mostCommented.length; i++) {
    const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector('.films-list__container');
    filmCardElement = new FilmCardView(mostCommented[i]);
    renderElement(filmsListContainerExtra, filmCardElement.getElement(), RenderPosition.BEFOREEND);
    
    filmCardElement.setClickHandler(() => {
    });

  }

  const siteFooterElement = document.querySelector('.footer');
  const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
  renderElement(footerStatistic, new FooterStatisticView(films.length).getElement(), RenderPosition.BEFOREEND);

}
