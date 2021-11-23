import {render, renderPosition, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import FilmsListTopComponent from "../components/films-top.js";
import FilmsListCommentedComponent from "../components/films-commented.js";
import MoreButtonComponent from "../components/load-more-button.js";
import NoDataComponent from "../components/no-data.js";
import FilmCardController from "./card.js";
import SortMenuComponent, {SortType} from "../components/sort-menu.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const EXTRA_FILMS_COUNT = 2;

const renderFilmsCards = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmCardController = new FilmCardController(filmListElement, onDataChange, onViewChange);

    filmCardController.render(film);

    return filmCardController;
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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    // this._films = [];
    this._showedFilmCardControllers = [];
    this._showedTopFilmsCardsControllers = [];
    this._showedCommentedFilmsCardsControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._noDataComponent = new NoDataComponent();
    this._sortMenuComponent = new SortMenuComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsTopListComponent = new FilmsListTopComponent();
    this._filmsCommentedListComponent = new FilmsListCommentedComponent();
    this._moreButtonComponent = new MoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onMoreButtonClick = this._onMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortMenuComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
    this._sortMenuComponent.hide();
  }

  show() {
    this._container.show();
    this._sortMenuComponent.show();
    this._sortMenuComponent.setDefaultActiveState();
  }

  getSortMenuComponent() {
    return this._sortMenuComponent;
  }

  render() {
    const films = this._filmsModel.getFilms();

    const container = this._container.getElement();

    render(container, this._sortMenuComponent, renderPosition.BEFOREBEGIN);

    if (films.length === 0) {
      render(container, this._noDataComponent, renderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsListComponent, renderPosition.BEFOREEND);
    render(container, this._filmsTopListComponent, renderPosition.BEFOREEND);
    render(container, this._filmsCommentedListComponent, renderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));
    this._renderTopFilms(films.slice(0, EXTRA_FILMS_COUNT));
    this._renderCommentedFilms(films.slice(0, EXTRA_FILMS_COUNT));

    this._renderMoreButton();
  }

  _removeFilms() {
    this._showedFilmCardControllers.forEach((filmCardController) => filmCardController.destroy());
    this._showedFilmCardControllers = [];
  }

  _renderFilms(films) {
    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const newFilmsCards = renderFilmsCards(filmsListContainer, films, this._onDataChange, this._onViewChange);
    this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmsCards);
    this._showingFilmsCount = this._showedFilmCardControllers.length;
    // console.log(newFilmsCards);
  }

  _renderTopFilms(films) {
    const filmsTopListContainer = this._filmsTopListComponent.getElement().querySelector(`.films-list__container`);
    const newTopFilmsCards = renderFilmsCards(filmsTopListContainer, films, this._onDataChange, this._onViewChange);
    this._showedTopFilmsCardsControllers = this._showedTopFilmsCardsControllers.concat(newTopFilmsCards);
  }

  _renderCommentedFilms(films) {
    const filmsCommentedListContainer = this._filmsCommentedListComponent.getElement().querySelector(`.films-list__container`);
    const newCommentedFilmsCards = renderFilmsCards(filmsCommentedListContainer, films, this._onDataChange, this._onViewChange);
    this._showedCommentedFilmsCardsControllers = this._showedCommentedFilmsCardsControllers.concat(newCommentedFilmsCards);
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderMoreButton();
  }

  _onDataChange(filmCardController, oldData, newData) {
    // вырезает из массива фильмов фильм, на котором кликнули по кнопке,
    // и вставляет его с изменными данными обратно
    // const index = this._films.findIndex((it) => it === oldData);
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmCardController.render(newData);
    }
  }

  _renderMoreButton() {
    // const films = this._filmsModel.getFilms();

    // if (this._showingFilmsCount >= films.length) {
    //   return;
    // }

    remove(this._moreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    render(filmsListContainer, this._moreButtonComponent, renderPosition.AFTEREND);

    // this._moreButtonComponent.setClickHandler(() => {
    //   const prevFilmsCount = this._showingFilmsCount;
    //   this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    //   const sortedFilms = getSortedFilms(films, this._sortMenuComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
    //   const newFilmsCards = renderFilmsCards(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);

    //   this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmsCards);

    //   if (this._showingFilmsCount >= films.length) {
    //     remove(this._moreButtonComponent);
    //   }
    // });
    this._moreButtonComponent.setClickHandler(this._onMoreButtonClick);
  }

  _onMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._filmsModel.getFilms();
    // console.log(`prevFilmsCount`, prevFilmsCount);

    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    // console.log(`this._showingFilmsCount`, this._showingFilmsCount);

    const sortedFilms = getSortedFilms(films, this._sortMenuComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
    this._renderFilms(sortedFilms);
    // console.log(sortedFilms);

    if (this._showingFilmsCount >= films.length) {
      remove(this._moreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingFilmsCount);

    // const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    // filmsListContainer.innerHTML = ``;

    // const newFilmsCards = renderFilmsCards(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
    // this._showedFilmCardControllers = newFilmsCards;

    this._removeFilms();
    this._renderFilms(sortedFilms);

    if (!this._moreButtonComponent._element) {
      this._renderMoreButton();
    }
  }

  _onViewChange() {
    // setDefaultView закрывает попап фильма
    this._showedFilmCardControllers.forEach((it) => it.setDefaultView());
    this._showedTopFilmsCardsControllers.forEach((it) => it.setDefaultView());
    this._showedCommentedFilmsCardsControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }
}

// const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
// const filmsTopListContainer = this._filmsTopListComponent.getElement().querySelector(`.films-list__container`);
// const filmsCommentedListContainer = this._filmsCommentedListComponent.getElement().querySelector(`.films-list__container`);

// const newFilmsCards = renderFilmsCards(filmsListContainer, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
// const newTopFilmsCards = renderFilmsCards(filmsTopListContainer, films.slice(0, EXTRA_FILMS_COUNT), this._onDataChange, this._onViewChange);
// const newCommentedFilmsCards = renderFilmsCards(filmsCommentedListContainer, films.slice(0, EXTRA_FILMS_COUNT), this._onDataChange, this._onViewChange);

// this._showedFilmCardControllers = this._showedFilmCardControllers.concat(newFilmsCards);
// this._showedTopFilmsCardsControllers = this._showedTopFilmsCardsControllers.concat(newTopFilmsCards);
// this._showedCommentedFilmsCardsControllers = this._showedCommentedFilmsCardsControllers.concat(newCommentedFilmsCards);
