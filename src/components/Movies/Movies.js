import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import ArrowToTop from '../ArrowToTop/ArrowToTop';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMoviesByTitle, filterMovieDuration } from '../../utils/utils';
import { getCards } from '../../utils/MoviesApi';

function Movies({ loggedIn, handleElectClick, savedMovies, handleDeleteClick }) {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(false); // Загрузка прелоадера
  const [initialMovies, setInitialMovies] = useState([]); // Отфильтрованные фильмы по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованные фильмы по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); // Включен ли чекбокс короткометражек
  const [isReqErr, setIsReqErr] = useState(false); // Ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены

  // Обработчик для поиска фильмов
  function onSearchMovies(query, isShortMovies) {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortMovies);

    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      getCards()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShortMovies);
          setIsReqErr(false);
        })
        .catch((err) => {
          setIsReqErr(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // Функция для фильтрации фильмов
  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMoviesByTitle(movies, query, short); // Фильтруем полученный массив по запросу
    setInitialMovies(moviesList); // Записываем в стейт
    setFilteredMovies(short ? filterMovieDuration(moviesList) : moviesList); // Если чекбокс тру, то фильтруем по длине и записываем в стейт
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  // Обработчик для чекбокса "короткометражки"
  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterMovieDuration(initialMovies).length === 0) {
        setFilteredMovies(filterMovieDuration(initialMovies));
      } else {
        setFilteredMovies(filterMovieDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isShortMovies);
  }

  // Эффект для установки состояния чекбокса "короткометражки" из локального хранилища
  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  // Эффект для установки списка фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterMovieDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  // Эффект для определения, есть ли фильмы по запросу
  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
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
