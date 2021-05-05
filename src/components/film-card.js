import {createElement} from "../utils.js";

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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
