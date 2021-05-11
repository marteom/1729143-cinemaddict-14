import ProfileView from './view/profile';
import FooterStatisticView from './view/footer-statistic';
import { RenderPosition, renderElement } from './utils/render';
import FilmListPresenter from './presenter/film-list';
import SiteMenuPresenter from './presenter/site-menu';
import FilmsModel from './model/films';
import MenusModel from './model/menus';
import { generateFilm } from './mock/film';

const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const menusModel = new MenusModel();

const filmList = new FilmListPresenter(siteMainElement, filmsModel, menusModel);
const siteMenu = new SiteMenuPresenter(siteMainElement, menusModel, filmsModel);

siteMenu.init();
filmList.init();

const siteFooterElement = document.querySelector('.footer');
const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
