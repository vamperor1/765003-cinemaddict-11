import {render, renderPosition, remove, replace} from "../utils/render.js";
import FilmCardComponent from "../components/film-card.js";
import FilmDetailsComponent from "../components/film-details.js";

export const EmptyComment = {};
export default class FilmCardController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._bodyElement = document.querySelector(`body`);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._changeFilmUserDetails = this._changeFilmUserDetails.bind(this);
  }

  _changeFilmUserDetails(data) {
    const userDetails = Object.assign({}, this._film.user_details);
    const newFilm = Object.assign({}, this._film, {"user_details": userDetails});
    newFilm.user_details[`${data}`] = !this._film.user_details[`${data}`];
    this._onDataChange(this, this._film, newFilm);
  }

  render(film) {
    // console.log(film.user_details.watching_date);
    const oldFilmCardComponent = this._filmCardComponent;
    // const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardComponent(film);

    /* Устанавливает обработчик клика по карточке фильма.
    33 - закрывает все открытые попапы с инфой о фильме, если есть открытые
    34 - открывает попап с инфой о фильме */
    this._filmCardComponent.setClickHandler(() => {
      this._onViewChange();
      this._renderFilmDetails();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    /* Меняем данные с false на true и наоборот при нажатии на кнопки добавления/удаления в списки фильмов */
    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmUserDetails(`watchlist`);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmUserDetails(`already_watched`);
    });

    this._filmCardComponent.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmUserDetails(`favorite`);
    });
    /* ^ */

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      // replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, renderPosition.BEFOREEND);
    }

    // render(this._container, this._filmCardComponent, renderPosition.BEFOREEND);
  }

  _renderFilmDetails() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    render(this._bodyElement, this._filmDetailsComponent, renderPosition.BEFOREEND);

    /* Меняем данные с false на true и наоборот при нажатии на кнопки добавления/удаления в списки фильмов */
    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._changeFilmUserDetails(`watchlist`);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._changeFilmUserDetails(`already_watched`);
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._changeFilmUserDetails(`favorite`);
    });
    /* ^ */

    this._filmDetailsComponent.setCloseHandler(() => {
      this._detailsCloseHandler();
    });
  }

  _detailsCloseHandler() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._detailsCloseHandler();
    }
  }

  setDefaultView() {
    if (this._filmDetailsComponent) {
      this._detailsCloseHandler();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent);
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}


