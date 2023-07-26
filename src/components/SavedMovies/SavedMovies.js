import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import ArrowToTop from '../ArrowToTop/ArrowToTop';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import { filterMoviesByTitle, filterMovieDuration } from '../../utils/utils';

function SavedMovies({ loggedIn, savedMovies, handleDeleteClick }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');

  //submit
  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMoviesByTitle(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterMovieDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
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