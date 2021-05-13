import SiteMenuView from '../view/site-menu';
import { RenderPosition, renderElement, remove, replace } from '../utils/render';
import { MENU_ITEMS, UPDATE_TYPE } from '../utils/const';

export default class SiteMenu {
  constructor(siteMainElement, menusModel, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._menusModel = menusModel;
    this._filmsModel = filmsModel;
    this._siteMenuViewComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleMenuItemChange = this._handleMenuItemChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._menusModel.addObserver(this._handleModelEvent);
  }

  _getMenuItem() {
    return this._menusModel.getMenuItem();
  }

  _handleModelEvent() {
    this.init();
  }

  _handleMenuItemChange(activeMenuItem) {
    if (this._menusModel.getMenuItem() === activeMenuItem) {
      return;
    }

    this._menusModel.setMenuItem(UPDATE_TYPE.MAJOR, activeMenuItem);
  }

  _getMenus() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: MENU_ITEMS.ALL,
        name: 'All movies',
        count: films.length,
      },
      {
        type: MENU_ITEMS.WATCHLIST,
        name: 'Watchlist',
        count: films.filter((film) => film.isWatchList).length,
      },
      {
        type: MENU_ITEMS.HISTORY,
        name: 'History',
        count: films.filter((film) => film.isWatched).length,
      },
      {
        type: MENU_ITEMS.FAVORITES,
        name: 'Favorites',
        count: films.filter((film) => film.isFavorite).length,
      },
    ];
  }

  getMenuComponent() {
    return this._siteMenuViewComponent;
  }

  setActiveMenuItemChangeHandler() {

  }

  init() {
    const menuItems = this._getMenus();
    const prevFilterComponent = this._siteMenuViewComponent;

    this._siteMenuViewComponent = new SiteMenuView(menuItems, this._getMenuItem());
    this._siteMenuViewComponent.setActiveMenuItemChangeHandler(this._handleMenuItemChange);

    if (prevFilterComponent === null) {
      renderElement(this._siteMainElement, this._siteMenuViewComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._siteMenuViewComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
