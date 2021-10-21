import {render, renderPosition} from "./utils/render.js";
import ProfileComponent from "./components/profile.js";
// import FilterMenuComponent from "./components/filter-menu.js";
import FilterController from "./controllers/filter.js";
import FilmsBoardComponent from "./components/films-board.js";
import FooterStatsComponent from "./components/footer-stats.js";
import FilmsBoardController from "./controllers/board.js";
import FilmsModel from "./models/movies.js";
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

render(siteHeaderElement, new ProfileComponent(), renderPosition.BEFOREEND);

// render(siteMainElement, new FilterMenuComponent(filters), renderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const filmsBoardComponent = new FilmsBoardComponent();
const filmsBoardController = new FilmsBoardController(filmsBoardComponent, filmsModel);

render(siteMainElement, filmsBoardComponent, renderPosition.BEFOREEND);

filmsBoardController.render(films);

render(siteFooterStats, new FooterStatsComponent(), renderPosition.BEFOREEND);
