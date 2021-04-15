import { createProfileTemplate } from "./view/profile";
import { createMainMenuTemplate } from "./view/site-menu";
import { createSortContentTemplate } from "./view/sort-content";
import { createFilmCardTemplate } from "./view/film-card";
import { createFilmsTemplate } from "./view/films";
import { createFilmsListTemplate } from "./view/films-list";
import { createFilmsListCaptionTemplate } from "./view/films-list-caption";
import { createFilmsListContainerTemplate } from "./view/films-list-container";
import { createShowMoTemplate } from "./view/showmo-element";
import { createFilmsListExtraTemplate } from "./view/films-list-extra";
import { createFilmsListExtraCaptionTemplate } from "./view/films-list-extra-caption";
import { createFooterStatisticTemplate } from "./view/footer-statistic";
import { createFilmDetailsTemplate } from './view/film-details';
import { createFilmCommentsTemplate } from './view/film-comments';
import { generateFilm } from "./mock/film";
import { generateItem } from "./mock/menu";
import { EXTRA_CAPTIONS } from "./helpers/const";
import { getMostCommented, getTopRat } from "./helpers/utils";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_COUNT_PER_STEP = 5;
const FILMS_COUNT = 23;
const FILM_EXTRA_COUNT = 2;
let film_count_showed = FILM_COUNT_PER_STEP;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const menuItems = generateItem(films);
console.log(films);
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, createProfileTemplate(), "beforeend");
render(siteMainElement, createMainMenuTemplate(menuItems), "beforeend");
render(siteMainElement, createFilmDetailsTemplate(films[0]), "beforeend");
//render(siteMainElement, createFilmCommentsTemplate, "beforeend");
render(siteMainElement, createSortContentTemplate(), "beforeend");
render(siteMainElement, createFilmsTemplate(), "beforeend");

const siteContentFilms = document.querySelector(".films");
render(siteContentFilms, createFilmsListTemplate(), "beforeend");

const siteContentFilmsList = document.querySelector(".films-list");
render(siteContentFilmsList, createFilmsListCaptionTemplate(), "beforeend");
render(siteContentFilmsList, createFilmsListContainerTemplate(), "beforeend");

const siteContentFilmsListContainer = document.querySelector(".films-list__container");
for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  render(
    siteContentFilmsListContainer,
    createFilmCardTemplate(films[i]),
    "beforeend"
  );
}

if (FILMS_COUNT > FILM_COUNT_PER_STEP) {
  render(siteContentFilmsList, createShowMoTemplate(), "beforeend");
  const showMoreButton = siteContentFilmsList.querySelector(".films-list__show-more");
  showMoreButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    films
      .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
      .forEach((film) =>
        render(
          siteContentFilmsListContainer,
          createFilmCardTemplate(film),
          "beforeend"
        )
      );

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= FILMS_COUNT) {
      showMoreButton.remove();
    }
  });
}

render(siteContentFilms, createFilmsListExtraTemplate(), "beforeend");
render(siteContentFilms, createFilmsListExtraTemplate(), "beforeend");
const siteContentFilmsListExtras = siteContentFilms.querySelectorAll(".films-list--extra");
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(
    siteContentFilmsListExtras[i],
    createFilmsListExtraCaptionTemplate(EXTRA_CAPTIONS[i]),
    "beforeend"
  );
  render(
    siteContentFilmsListExtras[i],
    createFilmsListContainerTemplate(),
    "beforeend"
  );
}

const topRat = getTopRat(films, FILM_EXTRA_COUNT);
for (let i = 0; i < topRat.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[0].querySelector(".films-list__container");
  render(
    filmsListContainerExtra,
    createFilmCardTemplate(topRat[i]),
    "beforeend"
  );
}

const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
for (let i = 0; i < mostCommented.length; i++) {
  const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector(".films-list__container");
  render(
    filmsListContainerExtra,
    createFilmCardTemplate(mostCommented[i]),
    "beforeend"
  );
}

const siteFooterElement = document.querySelector(".footer");
const footerStatistic = siteFooterElement.querySelector(".footer__statistics");
render(
  footerStatistic,
  createFooterStatisticTemplate(films.length),
  "beforeend"
);
