import AbstractComponent from "./abstract-component.js";
import {getRating} from "../utils/common.js";


const createProfileTemplate = (filmsModel) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRating(filmsModel.getFilms())}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsModel);
  }
}
