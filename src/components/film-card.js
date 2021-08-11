import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (className, name, isActive = false) => {
  return (
    `<button class="film-card__controls-item button
      film-card__controls-item--${className}
      ${isActive ? `film-card__controls-item--active` : ``}">
      ${name}
      </button>
    `
  );
};

const createFilmCardTemplate = (film) => {
  const {
    comments,
    film_info: {
      title,
      total_rating: rating,
      release: {date: releaseDate},
      runtime,
      genre,
      poster,
      description
    }
  } = film;

  const DESCRIPTION_LIMIT = 140;

  const getFilmDescription = () => {
    let visibleDescription = description;
    if (visibleDescription.length >= DESCRIPTION_LIMIT) {
      visibleDescription = visibleDescription.substring(0, DESCRIPTION_LIMIT - 1) + `...`;
    }
    return visibleDescription;
  };

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, film.user_details.watchlist);
  const archiveButton = createButtonMarkup(`mark-as-watched`, `Mark as watched`, film.user_details.already_watched);
  const favoritesButton = createButtonMarkup(`favorite`, `Mark as favorite`, film.user_details.favorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${Math.floor(runtime / 60)}h ${runtime % 60}m</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getFilmDescription()}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${archiveButton}
        ${favoritesButton}
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
    .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`)
    .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
    .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}

/* <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
<button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
<button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button> */
