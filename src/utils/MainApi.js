import { MAIN_URL } from './constants';
import { _checkResponse } from './constants';

// Функция для авторизации пользователя
function userAuthorize(email, password) {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST', // Используем метод POST для отправки данных авторизации
    headers: {
      Accept: 'application/json', // Указываем, что ожидаем ответ в формате JSON
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
    body: JSON.stringify({ email, password }), // Преобразуем данные в JSON и отправляем их в теле запроса
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
}
// Функция для регистрации пользователя
function userRegistration(name, email, password) {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST', // Используем метод POST для отправки данных регистрации
    headers: {
      Accept: 'application/json', // Указываем, что ожидаем ответ в формате JSON
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
    body: JSON.stringify({ name, email, password }), // Преобразуем данные в JSON и отправляем их в теле запроса
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
}
// Функция для получения данных пользователя
function getData(token) {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET', // Используем метод GET для запроса данных пользователя
    headers: {
      Accept: 'application/json', // Указываем, что ожидаем ответ в формате JSON
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
      Authorization: `Bearer ${token}`, // Передаем токен авторизации в заголовке запроса
    },
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
}
// Функция для получения информации о пользователе
function getUserInfo() {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET', // Используем метод GET для запроса информации о пользователе
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Передаем токен авторизации из локального хранилища в заголовке запроса
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
}
// Функция для обновления информации о пользователе
function uploadUserInfo(data) {
  // console.log(data); // Можно использовать для отладочных целей, чтобы проверить переданные данные
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'PATCH', // Используем метод PATCH для обновления информации о пользователе
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Передаем токен авторизации из локального хранилища в заголовке запроса
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
    body: JSON.stringify({
      // Тело запроса содержит данные, которые нужно обновить
      name: data.name, // В поле "name" передаем значение "name" объекта, переданного в uploadUserInfo
      email: data.email, // В поле "email" передаем значение "email" объекта, переданного в uploadUserInfo
    }),
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
}
// Функция для получения карточек фильмов
const getCards = () => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'GET', // Используем метод GET для запроса списка карточек фильмов
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Передаем токен авторизации из локального хранилища в заголовке запроса
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
};
// Функция для добавления карточки фильма
const addCard = (data) => {
  // console.log(data); // Можно использовать для отладочных целей, чтобы проверить переданные данные
  return fetch(`${MAIN_URL}/movies`, {
    method: 'POST', // Используем метод POST для создания новой карточки фильма
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Передаем токен авторизации из локального хранилища в заголовке запроса
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
    body: JSON.stringify({
      // Тело запроса содержит данные, которые нужно добавить в новую карточку
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: 'https://api.nomoreparties.co' + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
};
// Функция для удаления карточки фильма
const deleteCard = (cardId) => {
  return fetch(`${MAIN_URL}/movies/${cardId}`, {
    method: 'DELETE', // Используем метод DELETE для удаления карточки фильма
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Передаем токен авторизации из локального хранилища в заголовке запроса
      'Content-Type': 'application/json', // Указываем тип содержимого - JSON
    },
  }).then((res) => _checkResponse(res)); // Обрабатываем ответ с помощью функции _checkResponse
};

export {
  userRegistration,
  userAuthorize,
  getData,
  getUserInfo,
  uploadUserInfo,
  getCards,
  addCard,
  deleteCard,
}