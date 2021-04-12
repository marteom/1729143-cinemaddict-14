const menuItems = {
  all: (films) => {return ''},
  watchlist: (films) => {return films.filter((film) => film.isWatchList).length},
  history: (films) => {return films.filter((film) => film.isWatched).length},
  favorites: (films) => {return films.filter((film) => film.isFavorite).length},
};

export const generateItem = (films) => {
  return Object.entries(menuItems).map(([menuItemName, countMenuItem]) => {
    return {
      name: menuItemName,
      count: countMenuItem(films),
    };
  });
};
