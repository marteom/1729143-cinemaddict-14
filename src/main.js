import ProfileView from './view/profile';
import FooterStatisticView from './view/footer-statistic';
import { RenderPosition, renderElement } from './utils/render';
import FilmListPresenter from './presenter/film-list';
import SiteMenuPresenter from './presenter/site-menu';
import FilmsModel from './model/films';
import MenusModel from './model/menus';
import { UPDATE_TYPE } from './utils/const';
//import { generateFilm } from './mock/film';
import Api from './api.js';

//const FILMS_COUNT = 15;
const AUTHORIZATION = 'Basic YXJ0ZW9tOnF3ZXJ0eTEyMzU=';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

//const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);

//renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
//filmsModel.setFilms(films);

const menusModel = new MenusModel();

const filmList = new FilmListPresenter(siteMainElement, filmsModel, menusModel, api);
const siteMenu = new SiteMenuPresenter(siteMainElement, menusModel, filmsModel);

siteMenu.init();
filmList.init();

 const siteFooterElement = document.querySelector('.footer');
 const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
// renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UPDATE_TYPE.INIT, films);
    renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);
    renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UPDATE_TYPE.INIT, []);
    renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);
    renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
  });