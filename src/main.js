import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortMemuTemplate} from "./components/sort-menu.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createMoreButtonTemplate} from "./components/load-more-button.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";


const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, `beforeend`, createProfileTemplate());
render(siteMainElement, `beforeend`, createSiteMenuTemplate());
render(siteMainElement, `beforeend`, createSortMemuTemplate());
render(siteMainElement, `beforeend`, createFilmsListTemplate());

const filmsListContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainer, `beforeend`, createFilmCardTemplate());
}

render(filmsListContainer, `afterend`, createMoreButtonTemplate());

const filmsTopListContainer = siteMainElement.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsTopListContainer, `beforeend`, createFilmCardTemplate());
}

const filmsCommentedListContainer = siteMainElement.querySelector(`.films-list--extra:last-child .films-list__container`);
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsCommentedListContainer, `beforeend`, createFilmCardTemplate());
}

render(siteBodyElement, `beforeend`, createFilmDetailsTemplate());
