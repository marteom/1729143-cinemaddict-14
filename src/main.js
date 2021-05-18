import FooterStatisticView from './view/footer-statistic';
import { RenderPosition, renderElement } from './utils/render';
import FilmListPresenter from './presenter/film-list';
import SiteMenuPresenter from './presenter/site-menu';
import FilmsModel from './model/films';
import MenusModel from './model/menus';
import { UPDATE_TYPE } from './utils/const';
import Api from './api.js';

export const AUTHORIZATION = 'Basic YXJ0ZW9tOnF3ZXJ0eTEyMzU=';
export const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();

const menusModel = new MenusModel();

const filmList = new FilmListPresenter(siteHeaderElement, siteMainElement, filmsModel, menusModel, api);
const siteMenu = new SiteMenuPresenter(siteMainElement, menusModel, filmsModel);

siteMenu.init();
filmList.init();

const siteFooterElement = document.querySelector('.footer');
const footerStatistic = siteFooterElement.querySelector('.footer__statistics');

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UPDATE_TYPE.INIT, films);
    renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UPDATE_TYPE.INIT, []);
    renderElement(footerStatistic, new FooterStatisticView(0), RenderPosition.BEFOREEND);
  });
