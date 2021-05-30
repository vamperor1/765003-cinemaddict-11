import AbstractComponent from "./abstract-component.js";

const createTopFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createTopFilmsListTemplate();
  }
}
