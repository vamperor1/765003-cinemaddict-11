import {render, renderPosition} from "./utils.js";
import ProfileComponent from "./components/profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortMenuComponent from "./components/sort-menu.js";
import FilmsListComponent from "./components/films-list.js";
import FilmCardComponent from "./components/film-card.js";
import MoreButtonComponent from "./components/load-more-button.js";
import FooterStatsComponent from "./components/footer-stats.js";
import FilmDetailsComponent from "./components/film-details.js";
import NoData from "./components/no-data.js";
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

render(siteHeaderElement, new ProfileComponent().getElement(), renderPosition.BEFOREEND);

// Отрисует одну карточку фильма и добавит логику рабты с ней (попап по клику на ней).
const renderFilmCard = (filmsListContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);

  const filmCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  const filmCardElements = [filmCardPoster, filmCardTitle, filmCardComments];

  render(filmsListContainer, filmCardComponent.getElement(), renderPosition.BEFOREEND);

  const onFilmCardClick = (evt) => {
    if (filmCardElements.includes(evt.target)) {
      const filmDetailsComponent = new FilmDetailsComponent(film);
      const filmDetails = document.querySelector(`.film-details`);
      const detailsCloseBtn = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

      const onDetailsCloseBtnClick = () => {
        filmDetailsComponent.getElement().remove();
        filmDetailsComponent.removeElement();
        detailsCloseBtn.removeEventListener(`click`, onDetailsCloseBtnClick);
      };

      const onEscPress = (keyEvt) => {
        if (keyEvt.code === `Escape`) {
          onDetailsCloseBtnClick();
          document.removeEventListener(`keydown`, onEscPress);
        }
      };

      if (filmDetails) {
        detailsCloseBtn.removeEventListener(`click`, onDetailsCloseBtnClick);
        filmDetails.remove();
      }

      render(siteBodyElement, filmDetailsComponent.getElement(), renderPosition.BEFOREEND);

      detailsCloseBtn.addEventListener(`click`, onDetailsCloseBtnClick);
      document.addEventListener(`keydown`, onEscPress);
    }
  };

  filmCardComponent.getElement().addEventListener(`click`, onFilmCardClick);
};

// Отрисует все карточки (в цикл передается функция по отрисовке одной краточки renderFilmCard), а также
// кнопку "Еще" и добавит её логику.
const renderFilmList = () => {
  if (films.length === 0) {
    render(siteMainElement, new NoData().getElement(), renderPosition.BEFOREEND);
    return;
  }

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  const filmsListComponent = new FilmsListComponent();
  render(siteMainElement, filmsListComponent.getElement(), renderPosition.BEFOREEND);

  const filmsListContainer = filmsListComponent.getElement().querySelector(`.films-list .films-list__container`);
  const filmsTopListContainer = filmsListComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
  const filmsCommentedListContainer = filmsListComponent.getElement().querySelector(`.films-list--extra:last-child .films-list__container`);

  films.slice(0, showingFilmsCount)
  .forEach((film) => renderFilmCard(filmsListContainer, film));

  films.slice(0, EXTRA_FILMS_COUNT)
  .forEach((film) => renderFilmCard(filmsTopListContainer, film));

  films.slice(0, EXTRA_FILMS_COUNT)
  .forEach((film) => renderFilmCard(filmsCommentedListContainer, film));

  const moreButtonComponent = new MoreButtonComponent();
  render(filmsListContainer, moreButtonComponent.getElement(), renderPosition.AFTEREND);

  moreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => renderFilmCard(filmsListContainer, film));

    if (showingFilmsCount >= films.length) {
      moreButtonComponent.getElement().remove();
      moreButtonComponent.removeElement();
    }
  });
};

render(siteMainElement, new SiteMenuComponent(filters).getElement(), renderPosition.BEFOREEND);

render(siteMainElement, new SortMenuComponent().getElement(), renderPosition.BEFOREEND);

renderFilmList();

render(siteFooterStats, new FooterStatsComponent().getElement(), renderPosition.BEFOREEND);
