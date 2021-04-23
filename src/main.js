import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
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
import FilmDetailsView from './view/film-details';
import { generateFilm } from './mock/film';
import { generateItem } from './mock/menu';
import { EXTRA_CAPTIONS } from './utils/const';
import { getMostCommented, getTopRat, viewFilmDetails, hideFilmDetails } from './utils/film';
import { remove, RenderPosition, renderElement } from './utils/render';


const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    const filmDetails = document.querySelector('.film-details');
    filmDetails !== null ? hideFilmDetails(filmDetails) : '';
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const renderFilmCard = (filmsListContainer, film) => {
  const filmElement = new FilmCardView(film);
  renderElement(filmsListContainer, filmElement, RenderPosition.BEFOREEND);
  filmElement.setClickHandler(() => {
    const filmDetails = new FilmDetailsView(film);
    viewFilmDetails(filmDetails.getElement());
    document.addEventListener('keydown', onEscKeyDown);
    filmDetails.setClickHandler(() => {
      hideFilmDetails(filmDetails.getElement());
    });
  });

  return filmElement;
};

const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = 13;
const FILM_EXTRA_COUNT = 2;
let film_count_showed = FILM_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const menuItems = generateItem(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(menuItems), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortContentView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsView(), RenderPosition.BEFOREEND);

const siteContentFilms = document.querySelector('.films');
renderElement(siteContentFilms, new FilmsListView(), RenderPosition.BEFOREEND);

const siteContentFilmsList = document.querySelector('.films-list');

if(films.length === 0){
  renderElement(siteContentFilmsList, new FilmsListEmptyView(), RenderPosition.BEFOREEND);
}
else{
  renderElement(siteContentFilmsList, new FilmsListCaptionView(), RenderPosition.BEFOREEND);
  renderElement(siteContentFilmsList, new FilmsListContainerView(), RenderPosition.BEFOREEND);

  const siteContentFilmsListContainer = document.querySelector('.films-list__container');
  for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
    if(films.length > i){
      renderFilmCard(siteContentFilmsListContainer, films[i]);
    }
  }

  if (FILMS_COUNT > FILM_COUNT_PER_STEP) {
    const showMoButtonComponent = new ShowMoView();
    renderElement(siteContentFilmsList, showMoButtonComponent, RenderPosition.BEFOREEND);
    showMoButtonComponent.setClickHandler(() => {
      films
        .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
        .forEach((film) => {
          renderFilmCard(siteContentFilmsListContainer, film);
        });

      film_count_showed += FILM_COUNT_PER_STEP;

      if (film_count_showed >= FILMS_COUNT) {
        remove(showMoButtonComponent);
      }
    });
  }

  renderElement(siteContentFilms, new FilmsListExtraView(), RenderPosition.BEFOREEND);
  renderElement(siteContentFilms, new FilmsListExtraView(), RenderPosition.BEFOREEND);
  const siteContentFilmsListExtras = siteContentFilms.querySelectorAll('.films-list--extra');
  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    renderElement(siteContentFilmsListExtras[i], new FilmsListExtraCaptionView(EXTRA_CAPTIONS[i]), RenderPosition.BEFOREEND);
    renderElement(siteContentFilmsListExtras[i], new FilmsListContainerView(), RenderPosition.BEFOREEND);
  }

  const topRat = getTopRat(films, FILM_EXTRA_COUNT);
  for (let i = 0; i < topRat.length; i++) {
    const filmsListContainerExtra = siteContentFilmsListExtras[0].querySelector('.films-list__container');
    renderFilmCard(filmsListContainerExtra, topRat[i]);
  }

  const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
  for (let i = 0; i < mostCommented.length; i++) {
    const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector('.films-list__container');
    renderFilmCard(filmsListContainerExtra, mostCommented[i]);
  }

  const siteFooterElement = document.querySelector('.footer');
  const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
  renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
}
