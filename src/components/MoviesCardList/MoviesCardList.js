import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { SHOW_MORE_BUTTON_DECKTOP, SHOW_MORE_BUTTON_TABLET, SHOW_MORE_BUTTON_MOBILE } from '../../utils/constants';

function getSavedMovieCard(savedMovies, card) {
  return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
}

function MoviesCardList({ cards, isSavedFilms, isLoading, isReqErr, isNotFound, handleElectClick, savedMovies, handleDeleteClick }) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  function shownCount() {
    const display = window.innerWidth;
    setShownMovies(
      display > 1180 ? 16 :
        display > 1023 ? 12 :
          display > 800 ? 8 : 5
    );
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', shownCount);
    }, 500);
  });


  function showMoreBtn() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(shownMovies + SHOW_MORE_BUTTON_DECKTOP);
    } else if (display > 1023) {
      setShownMovies(shownMovies + SHOW_MORE_BUTTON_TABLET);
    }
    else if (display < 1023) {
      setShownMovies(shownMovies + SHOW_MORE_BUTTON_MOBILE);
    }
  }

  const movieCards = cards.map((card) => (
    <MoviesCard
      key={isSavedFilms ? card._id : card.id}
      saved={getSavedMovieCard(savedMovies, card)}
      cards={cards}
      card={card}
      isSavedFilms={isSavedFilms}
      handleElectClick={handleElectClick}
      handleDeleteClick={handleDeleteClick}
      savedMovies={savedMovies}
    />
  ));

  const shownMovieCards = movieCards.slice(0, shownMovies);

  return (
    <section className='cards'>
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          }
        />
      )}
      {!isLoading && !isReqErr && !isNotFound && (
        <>
          {pathname === '/saved-movies' ? (
            <>
              <ul className='cards__list'>
                {movieCards}
              </ul>
              <div className='cards__button-container'></div>
            </>
          ) : (
            <>
              <ul className='cards__list'>
                {shownMovieCards}
              </ul>
              <div className='cards__button-container'>
                {cards.length > shownMovies && (
                  <button className='cards__button' onClick={showMoreBtn}>
                    Ещё
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;