import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import FooterStatisticView from './view/footer-statistic';
import { RenderPosition, renderElement } from './utils/render';
import FilmList from './presenter/FilmList';

import { generateFilm } from './mock/film';
import { generateItem } from './mock/menu';

const FILMS_COUNT = 12;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const menuItems = generateItem(films);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderElement(siteHeaderElement, new ProfileView('Movie Buff'), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(menuItems), RenderPosition.BEFOREEND);


let filmList = new FilmList(siteMainElement);
filmList.init(films);

const siteFooterElement = document.querySelector('.footer');
const footerStatistic = siteFooterElement.querySelector('.footer__statistics');
renderElement(footerStatistic, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
