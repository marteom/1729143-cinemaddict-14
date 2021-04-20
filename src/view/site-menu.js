import AbstractView from './abstract.js';

const createMainMenuItemTemplate = (menuItem, isChecked) => {
  const {name, count} = menuItem;

  return (
    name === 'all' ? `<a href="#all" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">All movies</a>`
      : `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name.charAt(0).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`
  );

};

const createMainMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems
    .map((menuItem, index) => createMainMenuItemTemplate(menuItem, index === 0))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${menuItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  getTemplate() {
    return createMainMenuTemplate(this._menuItems);
  }
}


