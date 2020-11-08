import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortMemuTemplate} from "./components/sort-menu.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createMoreButtonTemplate} from "./components/load-more-button.js";
import {createFooterStatsTemplate} from "./components/footer-stats.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {generateFilters} from "./mock/filter.js";
import {generateFilmsInfo} from "./mock/film.js";

const FILMS_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_FILMS_COUNT = 2;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStats = document.querySelector(`.footer__statistics`);

const filters = generateFilters();
const films = generateFilmsInfo(FILMS_COUNT);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, `beforeend`, createProfileTemplate());
render(siteMainElement, `beforeend`, createSiteMenuTemplate(filters));
render(siteMainElement, `beforeend`, createSortMemuTemplate());
render(siteMainElement, `beforeend`, createFilmsListTemplate());

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const filmsListContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
// for (let i = 0; i < showingFilmsCount; i++) {
//   render(filmsListContainer, `beforeend`, createFilmCardTemplate(films[i]));
// }
films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainer, `beforeend`, createFilmCardTemplate(film)));

render(filmsListContainer, `afterend`, createMoreButtonTemplate());

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainer, `beforeend`, createFilmCardTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const filmsTopListContainer = siteMainElement.querySelector(`.films-list--extra .films-list__container`);
films.slice(0, EXTRA_FILMS_COUNT)
  .forEach((film) => render(filmsTopListContainer, `beforeend`, createFilmCardTemplate(film)));
// for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
//   render(filmsTopListContainer, `beforeend`, createFilmCardTemplate(films[i]));
// }

const filmsCommentedListContainer = siteMainElement.querySelector(`.films-list--extra:last-child .films-list__container`);
films.slice(0, EXTRA_FILMS_COUNT)
  .forEach((film) => render(filmsCommentedListContainer, `beforeend`, createFilmCardTemplate(film)));
// for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
//   render(filmsCommentedListContainer, `beforeend`, createFilmCardTemplate(films[i]));
// }

render(siteFooterStats, `beforeend`, createFooterStatsTemplate());

render(siteBodyElement, `beforeend`, createFilmDetailsTemplate(films[0]));
