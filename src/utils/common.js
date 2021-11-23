import moment from "moment";
import {RatingLevel} from "../const";

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

// export const castDateFormat = (value) => {
//   return value < 10 ? `0${value}` : String(value);
// };

export const formatFilmRuntime = (runtime) => {
  const filmRuntime = moment.duration(runtime, `minutes`);
  return `${Math.floor(filmRuntime.asHours())}h ${filmRuntime.minutes()}m`;
};

export const formatFilmReleaseYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatFilmReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const formatCommentDateRelative = (date) => {
  return moment(date).fromNow();
};

export const getRating = (filmsWatched) => {
  const filmsQuantity = filmsWatched.filter((film) => film.user_details.already_watched).length;

  if (filmsQuantity > 0 && filmsQuantity <= 10) {
    return RatingLevel.NOVICE;
  } else if (filmsQuantity > 10 && filmsQuantity <= 20) {
    return RatingLevel.FAN;
  } else if (filmsQuantity >= 21) {
    return RatingLevel.MOVIEBUFF;
  }

  return ``;
};
