import {COMMENTS_AUTHORS, COMMENTS_TEXTS, COMMENTS_EMOTIONS} from "../const.js";
import {getRandomArrayItems, getRandomDate} from "../utils/common.js";

const generateComment = () => {
  return {
    'author': getRandomArrayItems(1, COMMENTS_AUTHORS).join(),
    'comment': getRandomArrayItems(1, COMMENTS_TEXTS).join(),
    'date': getRandomDate(),
    'emotion': getRandomArrayItems(1, COMMENTS_EMOTIONS).join()
  };
};

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
