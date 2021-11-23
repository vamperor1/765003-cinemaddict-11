import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {getRating} from "../utils/common.js";
import {StatisticsFilter} from "../const.js";

const BAR_HEIGHT = 50;

const createStatisticTemplate = (filmsModel, filter) => {
  const totalDuration = filmsModel.getTotalDuration(filter);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getRating(filmsModel.getFilms())}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${filter === `all-time` ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${filter === `today` ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${filter === `week` ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${filter === `month` ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${filter === `year` ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsModel.getWatchedFilms(filter).length}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hours}<span class="statistic__item-description">h</span>
        ${totalDuration.minutes}<span class="statistic__item-description">m</span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${filmsModel.getTopGenre(filter) || ``}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filter = StatisticsFilter.ALL_TIME;
    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createStatisticTemplate(this._filmsModel, this._filter);
  }

  recoveryListeners() {
    this.setFilterChangeHandler();
  }

  rerender() {
    super.rerender();
    this._chart = this._renderStatistics();
  }

  render() {
    this._chart = this._renderStatistics();
    this.setFilterChangeHandler();
  }

  setFilterChangeHandler() {
    this.getElement().querySelectorAll(`.statistic__filters-input`).forEach((element) => {
      element.addEventListener(`change`, (evt) => {
        this._filter = evt.target.value;
        this.rerender();
      });
    });
  }

  // _getContext() {
  //   this._canvas = this.getElement().querySelector(`.statistic__chart`);
  //   this._context = this.getElement().querySelector(`.statistic__chart`).getContext(`2d`);

  //   this._context.canvas.parentNode.style.height = BAR_HEIGHT * Object.keys(genres).length;
  //   this._canvas.height = BAR_HEIGHT * Object.keys(genres).length;

  //   return this._context;
  // }

  _renderStatistics() {
    const genres = this._filmsModel.getGenresStatistics(this._filter);

    const statisticCtx = document.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * Object.keys(genres).length;

    if (this._chart) {
      this._chart.destroy();
      this._context = null;
    }

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `bar`,
      data: {
        labels: Object.keys(genres),
        datasets: [{
          // yAxisID: `yAxis`,
          data: Object.values(genres),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        layout: {
          padding: {
            right: 50
          }
        },
        indexAxis: `y`,
        barThickness: 24,
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `end`,
            align: `end`,
            offset: 10,
          },
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          y: {
            ticks: {
              font: {
                size: 20,
              },
              color: `#ffffff`,
              beginAtZero: true,
            }
          },
          x: {
            ticks: {
              display: false,
              beginAtZero: true,
            }
          },
        }
      }
    });

    return this._chart;
  }
}
