import SmartView from './smart';
import dayjs from 'dayjs';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderChart = (statisticCtx, labelsArray, dataArray) => {
  const BAR_HEIGHT = 50;

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labelsArray, //['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
      datasets: [{
        data: dataArray, //[11, 8, 7, 4, 3],
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        //barThickness: 24, // +
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          //barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}

const getGenresCounts = (films) => {
  let allGenres = [];
  films.forEach((film) => {
    if(film.isWatched){
      allGenres.push(...film.genres)
    }
  });

  let genresCounts = {};
  allGenres.forEach(function(a){
    genresCounts[a] = genresCounts[a] + 1 || 1;
  });

  return genresCounts;
}

const createStatisticsTemplate = (films, genresCounts) => {
  const getTotalDuration = () => {
    let totalDuration = 0;
    films.forEach((film) => film.isWatched ? totalDuration += film.duration : '');
    return {
      hours: dayjs({ minute: totalDuration }).hour(),
      minutes: dayjs({ minute: totalDuration }).minute(),
    }
  };

  const youWatchedValue =  films.filter((film) => film.isWatched).length;
  const totalDurationValue = getTotalDuration();

  const getTopGenre = () => {
    let max = -Infinity;
    const maxWatchedGenre = Object.entries(genresCounts).reduce((a, [key, val]) => {
        if (val > max) {
          max = val;
          return [key];
        }
        if (val === max) a.push(key);
        return a;
      }, [])

    return maxWatchedGenre.length > 0 ? maxWatchedGenre[0] : ''; 
  };

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Movie buff</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${youWatchedValue} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${totalDurationValue.hours} <span class="statistic__item-description">h</span> ${totalDurationValue.minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${getTopGenre()}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};


export default class Statistics extends SmartView {
  constructor(films) {
    super();
    this._films = films;
    this._statChart = null;
    this._ganresInfo = getGenresCounts(this._films);

    this._setChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._films, this._ganresInfo);
  }

  removeElement() {
    super.removeElement();

    if (this._statChart !== null) {
      this._statChart = null;
    }
  }

  _setChart() {
    if (this._statChart !== null) {
      this._statChart = null;
    }

    const statisticCtx = this.getElement().querySelector('.statistic__chart');

    this._statChart = renderChart(statisticCtx, Object.keys(this._ganresInfo), Object.values(this._ganresInfo));
  }

}
