import Observer from '../utils/observer.js';
import { MENU_ITEMS } from '../utils/const';

export default class Menus extends Observer {
  constructor() {
    super();
    this._activeMenuItem = MENU_ITEMS.ALL;
  }

  setMenuItem(updateType, menuItem) {
    this._activeMenuItem = menuItem;
    this._notify(updateType, menuItem);
  }

  getMenuItem() {
    return this._activeMenuItem;
  }

}
