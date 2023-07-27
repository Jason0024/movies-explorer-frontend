import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import UnsuccessPopup from '../UnsuccessPopup/UnsuccessPopup';
import ArrowToTop from '../ArrowToTop/ArrowToTop';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import {
  userRegistration,   // Функция для регистрации пользователя
  userAuthorize,      // Функция для авторизации пользователя
  getData,            // Функция для получения данных
  getUserInfo,        // Функция для получения информации о пользователе
  uploadUserInfo,     // Функция для обновления информации о пользователе
  getCards,           // Функция для получения списка карточек фильмов
  addCard,            // Функция для добавления карточки фильма
  deleteCard,         // Функция для удаления карточки фильма
} from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const localPath = location.pathname;

  // Эффект авторизации из локального хранилища будет выполняться при монтировании компонента
  useEffect(() => {
    const jwt = localStorage.getItem('jwt'); // Получаем токен авторизации из локального хранилища
    if (jwt) {
      // Если токен авторизации существует
      getData(jwt) // Вызываем функцию getData для получения данных пользователя
        .then((res) => {
          if (res) {
            localStorage.removeItem('allMovies'); // Удаляем данные всех фильмов из локального хранилища
            setIsLoggedIn(true); // Устанавливаем состояние isLoggedIn в true, предполагая, что у вас есть состояние, которое отвечает за статус авторизации
          }
          history.push(localPath); // Перенаправляем пользователя на указанный путь
        })
        .catch((err) => {
          console.log(err); // Обрабатываем возможную ошибку при запросе данных пользователя
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Эффект будет выполняться при монтировании компонента и при изменении значения isLoggedIn или history
  useEffect(() => {
    if (isLoggedIn) {
      // Если пользователь авторизован
      getUserInfo() // Вызываем функцию getUserInfo для получения информации о пользователе
        .then((profileInfo) => {
          setCurrentUser(profileInfo); // Устанавливаем состояние currentUser с полученными данными пользователя
        })
        .catch((err) => {
          console.log(err); // Обрабатываем возможную ошибку при запросе информации о пользователе
        });

      getCards() // Вызываем функцию getCards для получения списка карточек фильмов
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse()); // Устанавливаем состояние savedMovies с полученными данными карточек фильмов, развернутыми в обратном порядке
        })
        .catch((err) => {
          console.log(err); // Обрабатываем возможную ошибку при запросе списка карточек фильмов
        });
    }
  }, [isLoggedIn, history]);

  // Функция для обработки регистрации пользователя
  function handleUserRegistration({ name, email, password }) {
    userRegistration(name, email, password) // Вызываем функцию userRegistration для регистрации пользователя с переданными данными
      .then(() => {
        // Если регистрация прошла успешно
        handleUserAuthorization({ email, password }); // Вызываем функцию handleUserAuthorization для авторизации пользователя с теми же данными
      })
      .catch((err) => {
        // Если произошла ошибка при регистрации
        setIsSuccess(false); // Устанавливаем состояние isSuccess в false, чтобы показать, что регистрация не удалась
        console.log(err); // Выводим ошибку в консоль для дальнейшего анализа
      });
  }
  // Функция для обработки авторизации пользователя
  function handleUserAuthorization({ email, password }) {
    setIsLoading(true); // Устанавливаем состояние isLoading в true, чтобы показать, что запрос на авторизацию начался
    userAuthorize(email, password) // Вызываем функцию userAuthorize для авторизации пользователя с переданными данными
      .then((res) => {
        // Если авторизация прошла успешно
        if (res) {
          setIsLoggedIn(true); // Устанавливаем состояние isLoggedIn в true, предполагая, что у вас есть состояние, которое отвечает за статус авторизации
          localStorage.setItem('jwt', res.token); // Сохраняем токен авторизации в локальном хранилище
          history.push('./movies'); // Перенаправляем пользователя на страницу с фильмами (проверьте, что переменная "history" определена ранее в коде)
        }
      })
      .catch((err) => {
        // Если произошла ошибка при авторизации
        setIsSuccess(false); // Устанавливаем состояние isSuccess в false, чтобы показать, что авторизация не удалась
        console.log(err); // Выводим ошибку в консоль для дальнейшего анализа
      })
      .finally(() => {
        setIsLoading(false); // Вне зависимости от успешности авторизации, устанавливаем isLoading обратно в false
      });
  }
  // Функция для обновления информации о пользователе
  function handleUserUpdate(newUserInfo) {
    setIsLoading(true); // Устанавливаем состояние isLoading в true, чтобы показать, что запрос на обновление информации о пользователе начался
    uploadUserInfo(newUserInfo) // Вызываем функцию uploadUserInfo для обновления информации о пользователе с переданными данными
      .then((data) => {
        // Если обновление прошло успешно
        setIsUpdate(true); // Устанавливаем состояние isUpdate в true, предполагая, что у вас есть состояние, которое отвечает за успешное обновление
        setCurrentUser(data); // Обновляем состояние currentUser с новыми данными пользователя, которые вернул сервер
      })
      .catch((err) => {
        // Если произошла ошибка при обновлении
        setIsSuccess(false); // Устанавливаем состояние isSuccess в false, чтобы показать, что обновление не удалось
        console.log(err); // Выводим ошибку в консоль для дальнейшего анализа
        handleUnauthorized(err); // Вызываем функцию для обработки неавторизованной ошибки, если необходимо
      })
      .finally(() => {
        setIsLoading(false); // Вне зависимости от успешности обновления, устанавливаем isLoading обратно в false
      });
  }
  // Функция для обработки добавления карточки в избранное
  function handleCardElect(card) {
    addCard(card) // Вызываем функцию addCard для добавления карточки фильма с переданными данными
      .then((newMovie) => {
        // Если добавление прошло успешно
        setSavedMovies([newMovie, ...savedMovies]); // Обновляем состояние savedMovies, добавляя новую карточку в начало списка
      })
      .catch((err) => {
        // Если произошла ошибка при добавлении
        setIsSuccess(false); // Устанавливаем состояние isSuccess в false, чтобы показать, что добавление не удалось
        console.log(err); // Выводим ошибку в консоль для дальнейшего анализа
        handleUnauthorized(err); // Вызываем функцию для обработки неавторизованной ошибки, если необходимо
      });
  }
  // Функция для обработки удаления карточки из избранного
  function handleCardDelete(card) {
    deleteCard(card._id) // Вызываем функцию deleteCard для удаления карточки фильма с переданным id карточки
      .then(() => {
        // Если удаление прошло успешно
        setSavedMovies((state) => state.filter((item) => item._id !== card._id)); // Обновляем состояние savedMovies, удаляя из списка карточку с переданным id
      })
      .catch((err) => {
        // Если произошла ошибка при удалении
        setIsSuccess(false); // Устанавливаем состояние isSuccess в false, чтобы показать, что удаление не удалось
        console.log(err); // Выводим ошибку в консоль для дальнейшего анализа
        handleUnauthorized(err); // Вызываем функцию для обработки неавторизованной ошибки, если необходимо
      });
  }

  // Функция для выхода пользователя из системы (логаут)
  function handleSignOut() {
    setIsLoggedIn(false); // Устанавливаем состояние isLoggedIn в false, предполагая, что у вас есть состояние, которое отвечает за статус авторизации
    localStorage.removeItem('jwt'); // Удаляем токен авторизации из локального хранилища
    localStorage.removeItem('movies'); // Удаляем сохраненные фильмы из локального хранилища (если есть такие данные)
    localStorage.removeItem('movieSearch'); // Удаляем результаты поиска фильмов из локального хранилища (если есть такие данные)
    localStorage.removeItem('shortMovies'); // Удаляем сохраненные короткометражные фильмы из локального хранилища (если есть такие данные)
    localStorage.removeItem('allMovies'); // Удаляем все фильмы из локального хранилища (если есть такие данные)
    history.push('/'); // Перенаправляем пользователя на главную страницу
  }

  // Функция для закрытия всплывающего окна с сообщением об ошибке (неудачной операции)
  function closeUnsuccessPopup() {
    setIsSuccess(true); // Устанавливаем состояние isSuccess в true, чтобы скрыть всплывающее окно с сообщением об ошибке
    setIsUpdate(false); // Устанавливаем состояние isUpdate в false, предполагая, что у вас есть состояние, которое отвечает за успешное обновление (сбрасываем состояние, чтобы в будущем обработать другие сценарии успешного обновления)
  }

  // Функция для обработки ошибки "неавторизован" (код 401)
  function handleUnauthorized(err) {
    if (err === 'Error: 401') {
      // Если получена ошибка с кодом 401 (неавторизован)
      handleSignOut(); // Вызываем функцию handleSignOut для выхода пользователя из системы
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__content'>
          <Switch>
            <Route path='/' exact>
              <Header loggedIn={isLoggedIn} colorClass="main" />
              <Main />
              <ArrowToTop />
              <Footer />
            </Route>
            <Route path='/signin'>
              {!isLoggedIn ? (
                <Login onAuthorize={handleUserAuthorization} isLoading={isLoading} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <Route path='/signup'>
              {!isLoggedIn ? (
                <Register onRegister={handleUserRegistration} isLoading={isLoading} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <ProtectedRoute
              path='/movies'
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              handleDeleteClick={handleCardDelete}
              component={Movies}
              handleElectClick={handleCardElect}></ProtectedRoute>
            <ProtectedRoute
              path='/saved-movies'
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              handleDeleteClick={handleCardDelete}
              component={SavedMovies}></ProtectedRoute>
            <ProtectedRoute
              path='/profile'
              signOut={handleSignOut}
              onUpdateUser={handleUserUpdate}
              loggedIn={isLoggedIn}
              component={Profile}
              isLoading={isLoading}></ProtectedRoute>

            <Route path='/*'>
              <NotFound />
            </Route>
          </Switch>
          <UnsuccessPopup isSuccess={isSuccess} onClose={closeUnsuccessPopup} />
          <UnsuccessPopup isSuccess={!isUpdate} isUpdate={isUpdate} onClose={closeUnsuccessPopup} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
