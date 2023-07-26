import React, { useState, useEffect, useCallback } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import ArrowToTop from '../ArrowToTop/ArrowToTop';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import { filterMoviesByTitle, filterMovieDuration } from '../../utils/utils';

function SavedMovies({ loggedIn, savedMovies, handleDeleteClick }) {
  // Состояния для хранения отфильтрованных фильмов, состояния чекбокса "короткометражки" и состояния отображения ошибки "Ничего не найдено"
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Функция для обработки поиска фильмов
  const onSearchMovies = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Функция для обработки чекбокса "короткометражки"
  const handleShortMovies = useCallback(() => {
    setIsShortMovies((prevIsShortMovies) => !prevIsShortMovies);
  }, []);

  // Эффект для фильтрации фильмов при изменении запроса или состояния чекбокса "короткометражки"
  useEffect(() => {
    // Фильтруем фильмы по запросу
    const moviesList = filterMoviesByTitle(savedMovies, searchQuery);
    // Если чекбокс "короткометражки" включен, фильтруем также по длительности
    setFilteredMovies(
      isShortMovies ? filterMovieDuration(moviesList) : moviesList
    );
  }, [savedMovies, isShortMovies, searchQuery]);

  // Эффект для проверки, есть ли фильмы по запросу
  useEffect(() => {
    // Устанавливаем состояние, показывающее, найдены ли фильмы по запросу
    setIsNotFound(!filteredMovies.length);
  }, [filteredMovies]);

  return (
    <main className='movies'>
      <Header colorClass="other" loggedIn={loggedIn} />
      <ArrowToTop />
      <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies} />
      <MoviesCardList
        isNotFound={isNotFound}
        isSavedFilms={true}
        cards={filteredMovies}
        savedMovies={savedMovies}
        handleDeleteClick={handleDeleteClick}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
