import AbstractComponent from "./abstract-component.js";

const FILTER_HREF = `#`;

const getFilterNameByHash = (hash) => {
  return hash.substring(FILTER_HREF.length);
};

const createFilterMarkup = (filter) => {
  const {name, count, active} = filter;
  return `<a href="#${name}" class="main-navigation__item ${active ? `main-navigation__item--active` : ``}">
  ${name === `all` ? `${name.charAt(0).toUpperCase() + name.slice(1)} movies` : name.charAt(0).toUpperCase() + name.slice(1)}
  ${name === `all` ? `</a>` : `<span class="main-navigation__item-count">${count}</span></a>`}`;
};

const createFilterMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.active)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterMenuTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target.closest(`a`);
      if (target) {
        const filterName = getFilterNameByHash(target.hash);
        handler(filterName);
      }
    });
  }
}
