export const renderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItems = (itemsAmount, array) => {
  const randomArray = [];

  while (randomArray.length < itemsAmount) {
    let currentItem = array[Math.floor(Math.random() * array.length)];
    if (randomArray.indexOf(currentItem) < 0) {
      randomArray.push(currentItem);
    }
  }

  return randomArray;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInRange(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTEREND:
      container.after(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
