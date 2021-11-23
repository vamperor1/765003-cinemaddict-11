import {render, renderPosition} from "./utils/render.js";
import ProfileComponent from "./components/profile.js";
// import FilterMenuComponent from "./components/filter-menu.js";
import FilterController, {ScreenType} from "./controllers/filter.js";
import FilmsBoardComponent from "./components/films-board.js";
import FooterStatsComponent from "./components/footer-stats.js";
import FilmsBoardController from "./controllers/board.js";
import StatisticsComponent from "./components/statistics.js";
import FilmsModel from "./models/films.js";
// import {generateFilters} from "./mock/filter.js";
import {generateFilmsInfo} from "./mock/film.js";

const FILMS_COUNT = 23;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStats = document.querySelector(`.footer__statistics`);

// const filters = generateFilters();
const films = generateFilmsInfo(FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const profileComponent = new ProfileComponent(filmsModel);
render(siteHeaderElement, profileComponent, renderPosition.BEFOREEND);

// render(siteMainElement, new FilterMenuComponent(filters), renderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const filmsBoardComponent = new FilmsBoardComponent();
const filmsBoardController = new FilmsBoardController(filmsBoardComponent, filmsModel);
const sortMenuComponent = filmsBoardController.getSortMenuComponent();

filterController.setSortMenuComponent(sortMenuComponent);

render(siteMainElement, filmsBoardComponent, renderPosition.BEFOREEND);

filmsBoardController.render(films);

const statisticsComponent = new StatisticsComponent(filmsModel);
render(siteMainElement, statisticsComponent, renderPosition.BEFOREEND);
statisticsComponent.hide();
statisticsComponent.render();

filterController.setScreenChangeHandler((evt) => {
  // let clickedScreenType = evt.target.closest(`.${ScreenType.FILMS}`) ? ScreenType.FILMS : ScreenType.STATS;
  let clickedScreenType = evt.target.classList.contains(ScreenType.STATS) ? ScreenType.STATS : ScreenType.FILMS;

  if (clickedScreenType === ScreenType.ACTIVE) {
    return;
  }

  switch (clickedScreenType) {
    case ScreenType.FILMS:
      filmsBoardController.show();
      statisticsComponent.hide();
      ScreenType.ACTIVE = ScreenType.FILMS;
      break;

    case ScreenType.STATS:
      filmsBoardController.hide();
      statisticsComponent.show();
      ScreenType.ACTIVE = ScreenType.STATS;
      break;
  }
});

render(siteFooterStats, new FooterStatsComponent(), renderPosition.BEFOREEND);

// filterController.setStatsClickHandler(() => {
//   filmsBoardController.hide();
//   statisticsComponent.show();
// });

// filterController.setFilterClickHandler(() => {
//   filmsBoardController.show();
//   statisticsComponent.hide();
// });
