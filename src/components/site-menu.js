const createFilterMarkup = (filter, isDefault) => {
  const {name, link, amount} = filter;
  return `<a href="${link}" class="main-navigation__item ${isDefault ? `main-navigation__item--active` : ``}">${name}
  ${isDefault ? `</a>` : `<span class="main-navigation__item-count">${amount}</span></a>`}`;
};

export const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
