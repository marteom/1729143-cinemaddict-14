import {MENU_ITEMS} from './const';

export const menuItems = {
  [MENU_ITEMS.ALL]: (films) => films,
  [MENU_ITEMS.WATCHLIST]: (films) => films.filter((film) => film.isWatchList),
  [MENU_ITEMS.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [MENU_ITEMS.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};