const MAIN_URL = 'https://api.jason.diploma.nomoreparties.sbs';
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const EMAIL_PATTERN = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+";
const NAME_PATTERN = "^[a-zA-Zа-яА-ЯЁё,.'\\-\\s]+$";


const MAX_SHORT_DURATION = 40;

const SHOW_MORE_BUTTON_DECKTOP = 4;
const SHOW_MORE_BUTTON_TABLET = 3;
const SHOW_MORE_BUTTON_MOBILE = 2;
const MAX_SCREEN_SIZE_DESCTOP = 1180;
const MAX_SCREEN_SIZE_TABLET = 1023;
const MAX_SCREEN_SIZE_MOBILE = 800;
const MAX_MOVIES_COUNT_DESKTOP = 12;
const MAX_MOVIES_COUNT_TABLET = 8;
const MAX_MOVIES_COUNT_MOBILE = 5;


const _checkResponse = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};

// eslint-disable-next-line no-useless-escape

export {
  MAIN_URL,
  BASE_URL,
  EMAIL_PATTERN,
  NAME_PATTERN,
  SHOW_MORE_BUTTON_DECKTOP,
  SHOW_MORE_BUTTON_TABLET,
  SHOW_MORE_BUTTON_MOBILE,
  MAX_SCREEN_SIZE_DESCTOP,
  MAX_SCREEN_SIZE_TABLET,
  MAX_SCREEN_SIZE_MOBILE,
  MAX_MOVIES_COUNT_DESKTOP,
  MAX_MOVIES_COUNT_TABLET,
  MAX_MOVIES_COUNT_MOBILE,
  MAX_SHORT_DURATION,
  _checkResponse
};
