const MAIN_URL = 'https://api.jason.diploma.nomoreparties.sbs';
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const EMAIL_PATTERN = /^[A-Za-zА-Яа-яЁё\s@.-]+$/;
const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s-]+$/;


const SHOW_MORE_BUTTON_DECKTOP = 4;
const SHOW_MORE_BUTTON_TABLET = 3;
const SHOW_MORE_BUTTON_MOBILE = 2;

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};

// eslint-disable-next-line no-useless-escape

export {
  MAIN_URL,
  SHOW_MORE_BUTTON_DECKTOP,
  SHOW_MORE_BUTTON_TABLET,
  SHOW_MORE_BUTTON_MOBILE,
  EMAIL_PATTERN,
  NAME_PATTERN,
  BASE_URL,
  _checkResponse
};
