import {render, renderPosition, remove} from "../utils/render.js";
import FilmCardComponent from "../components/film-card.js";
import FilmsListComponent from "../components/films-list.js";
import FilmsListTopComponent from "../components/films-top.js";
import FilmsListCommentedComponent from "../components/films-commented.js";
import MoreButtonComponent from "../components/load-more-button.js";
import FilmDetailsComponent from "../components/film-details.js";
import NoDataComponent from "../components/no-data.js";
import SortMenuComponent, {SortType} from "../components/sort-menu.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_FILMS_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
let filmDetailsShowed = {};

const renderFilmCard = (filmsListContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);

  render(filmsListContainer, filmCardComponent, renderPosition.BEFOREEND);

  const onFilmCardClick = () => {
    const filmDetailsComponent = new FilmDetailsComponent(film);

    const onDetailsCloseBtnClick = () => {
      document.removeEventListener(`keydown`, onEscPress);
      remove(filmDetailsShowed);
    };

    const onEscPress = (keyEvt) => {
      if (keyEvt.code === `Escape`) {
        onDetailsCloseBtnClick();
      }
    };

    document.addEventListener(`keydown`, onEscPress);

    if (filmDetailsShowed._element) {
      onDetailsCloseBtnClick();
    }

    render(siteBodyElement, filmDetailsComponent, renderPosition.BEFOREEND);

    filmDetailsShowed = filmDetailsComponent;

    filmDetailsShowed.setCloseHandler(onDetailsCloseBtnClick);
  };

  filmCardComponent.setClickHandler(onFilmCardClick);
};

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmListElement, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.BY_DATE:
      sortedFilms = showingFilms.sort((a, b) => b.film_info.release.date - a.film_info.release.date);
      break;
    case SortType.BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};
export default class FilmsBoardController {
  constructor(container) {
    this._container = container;

    this._noDataComponent = new NoDataComponent();
    this._sortMenuComponent = new SortMenuComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsTopListComponent = new FilmsListTopComponent();
    this._filmsCommentedListComponent = new FilmsListCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();
  }

  render(films) {
    const renderMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmsListContainer, this._moreButtonComponent, renderPosition.AFTEREND);

      this._moreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortMenuComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmsListContainer, sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._moreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    render(container, this._sortMenuComponent, renderPosition.BEFOREBEGIN);

    if (films.length === 0) {
      render(container, this._noDataComponent, renderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsListComponent, renderPosition.BEFOREEND);
    render(container, this._filmsTopListComponent, renderPosition.BEFOREEND);
    render(container, this._filmsCommentedListComponent, renderPosition.BEFOREEND);

    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const filmsTopListContainer = this._filmsTopListComponent.getElement().querySelector(`.films-list__container`);
    const filmsCommentedListContainer = this._filmsCommentedListComponent.getElement().querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(filmsListContainer, films.slice(0, showingFilmsCount));
    renderFilms(filmsTopListContainer, films.slice(0, EXTRA_FILMS_COUNT));
    renderFilms(filmsCommentedListContainer, films.slice(0, EXTRA_FILMS_COUNT));

    renderMoreButton();

    this._sortMenuComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListContainer.innerHTML = ``;

      renderFilms(filmsListContainer, sortedFilms);

      if (!this._moreButtonComponent._element) {
        renderMoreButton();
      }
    });
  }
}
