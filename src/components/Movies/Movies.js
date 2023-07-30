import React, { useState, useEffect, useCallback } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import ArrowToTop from '../ArrowToTop/ArrowToTop';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMoviesByTitle, filterMovieDuration } from '../../utils/utils';
import { getCards } from '../../utils/MoviesApi';

function Movies({ loggedIn, handleElectClick, savedMovies, handleDeleteClick }) {
  const [isLoading, setIsLoading] = useState(false); // Загрузка прелоадера
  const [initialMovies, setInitialMovies] = useState([]); // Отфильтрованные фильмы по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованные фильмы по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); // Включен ли чекбокс короткометражек
  const [isReqErr, setIsReqErr] = useState(false); // Ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены

  // Функция для фильтрации фильмов
  function handleFilterMovies(movies, query, isShort) {
    const filteredMovies = filterMoviesByTitle(movies, query, isShort); // Фильтруем полученный массив по запросу и чекбоксу "короткометражки"
    const filteredAndSortedMovies = isShort ? filterMovieDuration(filteredMovies) : filteredMovies; // Фильтруем по длительности, если чекбокс "короткометражки" включен

    setFilteredMovies(filteredAndSortedMovies); // Обновляем список отфильтрованных фильмов в состоянии
    localStorage.setItem('movies', JSON.stringify(filteredAndSortedMovies)); // Сохраняем отфильтрованные фильмы в локальное хранилище
    localStorage.setItem('allMovies', JSON.stringify(movies)); // Сохраняем все фильмы в локальное хранилище
  }

  // Обработчик для чекбокса "короткометражки"
  function handleShortMovies() {
    const isShort = !isShortMovies; // Переключаем значение чекбокса

    // Фильтруем фильмы по длительности на основе переключенного значения чекбокса
    const filteredAndSortedMovies = isShort ? filterMovieDuration(initialMovies) : initialMovies;
    setFilteredMovies(filteredAndSortedMovies); // Обновляем список отфильтрованных фильмов в состоянии

    setIsShortMovies(isShort); // Устанавливаем новое состояние чекбокса
    localStorage.setItem('shortMovies', JSON.stringify(isShort)); // Сохраняем состояние чекбокса в локальное хранилище
  }

  // Обработчик для поиска фильмов
  const onSearchMovies = useCallback((query) => {
    const isShort = isShortMovies; // Получаем текущее состояние чекбокса "короткометражки"

    localStorage.setItem('movieSearch', query); // Сохраняем запрос в локальное хранилище
    localStorage.setItem('shortMovies', JSON.stringify(isShort)); // Сохраняем состояние чекбокса в локальное хранилище

    // Получаем список всех фильмов из локального хранилища
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));

    if (allMovies) {
      // Если уже есть все фильмы в локальном хранилище, используем их для фильтрации
      handleFilterMovies(allMovies, query, isShort);
    } else {
      // Если фильмов в локальном хранилище нет, делаем запрос на сервер
      setIsLoading(true); // Устанавливаем состояние загрузки
      getCards()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShort); // Фильтруем полученные фильмы
          setIsReqErr(false); // Сбрасываем состояние ошибки запроса
        })
        .catch((err) => {
          setIsReqErr(true); // Устанавливаем состояние ошибки запроса в случае ошибки
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false); // В любом случае снимаем состояние загрузки
        });
    }
  }, [isShortMovies]);

  // Эффект для установки состояния чекбокса "короткометражки" из локального хранилища
  useEffect(() => {
    const isShort = localStorage.getItem('shortMovies') === 'true';
    setIsShortMovies(isShort);
  }, []);

  // Эффект для установки списка фильмов из локального хранилища
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (movies) {
      setInitialMovies(movies);
      setFilteredMovies(localStorage.getItem('shortMovies') === 'true' ? filterMovieDuration(movies) : movies);
    }
  }, []);

  // Эффект для определения, есть ли фильмы по запросу
  useEffect(() => {
    const isMoviesNotFound = filteredMovies.length === 0 && localStorage.getItem('movieSearch');
    setIsNotFound(isMoviesNotFound);
  }, [filteredMovies]);

  return (
    <main className='movies'>
      <Header colorClass="other" loggedIn={loggedIn} />
      <ArrowToTop />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        cards={filteredMovies}
        isSavedFilms={false}
        isLoading={isLoading}
        isReqErr={isReqErr}
        isNotFound={isNotFound}
        handleElectClick={handleElectClick}
        handleDeleteClick={handleDeleteClick}
      />
      <Footer />
    </main>
  );
}

export default Movies;
