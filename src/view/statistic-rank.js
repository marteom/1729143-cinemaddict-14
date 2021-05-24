import AbstractView from './abstract.js';

const createStatisticRankTemplate = (raiting) => {
  return `<p class="statistic__rank">
  Your rank
  <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">${raiting}</span>
</p>`;
};


export default class StatisticRank extends AbstractView {
  constructor(raiting) {
    super();
    this._raiting = raiting;
  }

  getTemplate() {
    return createStatisticRankTemplate(this._raiting);
  }
}
