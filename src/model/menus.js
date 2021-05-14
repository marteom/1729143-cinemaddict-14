import Observer from '../utils/observer.js';
import { MENU_ITEMS } from '../utils/const';

export default class Menus extends Observer {
  constructor() {
    super();
    this._activeMenuItem = MENU_ITEMS.ALL;
    this._prevMenuItem = null;
  }

  setMenuItem(updateType, menuItem) {
    //this._prevMenuItem = this._activeMenuItem;
    this._activeMenuItem = menuItem;
    this._notify(updateType, menuItem);
  }

  // getPrevMenuItem() {
  //   return this._prevMenuItem;
  // }

  getMenuItem() {
    return this._activeMenuItem;
  }

}
