import {getRandomArrayItems, getRandomInRange} from "../utils/common.js";
import {
  FILMS_TITLES,
  FILMS_POSTERS,
  FILM_DISCRIPTIONS,
  FILM_DIRECTORS,
  FILM_WRITERS,
  FILM_ACTORS,
  COUNTRIES,
  GENRES,
  AGE_RATINGS
} from "../const.js";
import {generateComments} from "../mock/comments.js";

// const DESCRIPTION_LIMIT = 140;

// const getFilmDescription = () => {
//   let description = getRandomArrayItems(getRandomInRange(1, 5), FILM_DISCRIPTIONS).join(` `);
//   if (description.length >= DESCRIPTION_LIMIT) {
//     description = description.substring(0, DESCRIPTION_LIMIT - 1) + `...`;
//   }
//   return description;
// };

const generateFilmInfo = () => {
  return {
    'comments': generateComments(getRandomInRange(1, 5)),
    'film_info': {
      'title': getRandomArrayItems(1, FILMS_TITLES).join(),
      'description': getRandomArrayItems(getRandomInRange(1, 5), FILM_DISCRIPTIONS).join(` `),
      // 'description': getFilmDescription(),
      'alternative_title': getRandomArrayItems(1, FILMS_TITLES).join(),
      'total_rating': getRandomInRange(0, 10) + parseFloat((Math.random().toFixed(1))),
      'poster': `./images/posters/${getRandomArrayItems(1, FILMS_POSTERS)}`,
      'age_rating': parseFloat(getRandomArrayItems(1, AGE_RATINGS)),
      'director': getRandomArrayItems(1, FILM_DIRECTORS).join(),
      'writers': getRandomArrayItems(getRandomInRange(1, 2), FILM_WRITERS),
      'actors': getRandomArrayItems(getRandomInRange(1, 5), FILM_ACTORS),
      'release': {
        'date': new Date(getRandomInRange(1950, 1970), getRandomInRange(0, 11), getRandomInRange(1, 28)),
        'release_country': getRandomArrayItems(1, COUNTRIES).join()
      },
      'runtime': getRandomInRange(71, 115),
      'genre': getRandomArrayItems(getRandomInRange(1, 3), GENRES)
    },
    "user_details": {
      "watchlist": false,
      "already_watched": false,
      "watching_date": new Date(`2021`, getRandomInRange(0, 11), getRandomInRange(1, 28)),
      "favorite": false
    }
  };
};

export const generateFilmsInfo = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmInfo);
};
