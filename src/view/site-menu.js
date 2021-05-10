import AbstractView from './abstract.js';

const createMainMenuItemTemplate = (menuItem, activeMenuItem) => {
  const {type, name, count} = menuItem;
  return (
    name === 'all' ? `<a href="#all" class="main-navigation__item ${type === activeMenuItem ? 'main-navigation__item--active' : ''}">All movies</a>`
      : `<a href="#${name}" class="main-navigation__item ${type === activeMenuItem ? 'main-navigation__item--active' : ''}">${name.charAt(0).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`
  );

};

const createMainMenuTemplate = (menuItems, activeMenuItem) => {
  const menuItemsTemplate = menuItems
    .map((menuItem) => createMainMenuItemTemplate(menuItem, activeMenuItem))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${menuItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(menuItems, activeMenuItem) {
    super();
    this._menuItems = menuItems;
    this._activeMenuItem = activeMenuItem;
    this._activeMenuItemChangeHandler = this._activeMenuItemChangeHandler.bind(this);
  }

  getTemplate() {
    return createMainMenuTemplate(this._menuItems, this._activeMenuItem);
  }

  _activeMenuItemChangeHandler(evt) {
    evt.preventDefault();
    if(evt.target.className.trim() === 'main-navigation__item'){
      const hrefMenu = evt.target.getAttribute("href");
      let menuItem = hrefMenu.slice(1, hrefMenu.length);
      this._callback.activeMenuItemChange(menuItem);
    }
  }

  setActiveMenuItemChangeHandler(callback) {
    this._callback.activeMenuItemChange = callback;
    this.getElement().addEventListener('click', this._activeMenuItemChangeHandler);
  }

}


