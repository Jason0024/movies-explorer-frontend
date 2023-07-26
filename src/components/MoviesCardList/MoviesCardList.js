import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { SHOW_MORE_BUTTON_DECKTOP, SHOW_MORE_BUTTON_TABLET, SHOW_MORE_BUTTON_MOBILE } from '../../utils/constants';

// Функция для поиска сохраненного фильма в списке сохраненных фильмов
function getSavedMovieCard(savedMovies, card) {
  return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
}

function MoviesCardList({ cards, isSavedFilms, isLoading, isReqErr, isNotFound, handleElectClick, savedMovies, handleDeleteClick }) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  // Функция для определения количества показываемых фильмов в зависимости от ширины экрана
  function shownCount() {
    const display = window.innerWidth;
    setShownMovies(
      display > 1180 ? 16 :
        display > 1023 ? 12 :
          display > 800 ? 8 : 5
    );
  }

  // Запускаем функцию shownCount() при первой отрисовке компонента
  useEffect(() => {
    shownCount();
    // Добавляем слушатель на изменение размера окна для обновления количества показываемых фильмов
    window.addEventListener('resize', shownCount);
    // Возвращаем функцию для удаления слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', shownCount);
    };
  }, []);

  // Функция для показа дополнительных фильмов при клике на кнопку "Еще"
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

  // Создаем массив компонентов фильмов
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

  // Получаем только показываемые фильмы
  const shownMovieCards = movieCards.slice(0, shownMovies);

  return (
    <section className='cards'>
      {isLoading && <Preloader />} {/* Показываем прелоадер, если данные загружаются */}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />} {/* Показываем сообщение "Ничего не найдено", если результат поиска пуст */}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          }
        />
      )} {/* Показываем сообщение об ошибке, если запрос не удался */}
      {!isLoading && !isReqErr && !isNotFound && (
        <>
          {movieCards.length > 0 && (
            <ul className='cards__list'>
              {pathname === '/saved-movies' ? movieCards : shownMovieCards} {/* Рендерим список фильмов */}
            </ul>
          )}
          {cards.length > shownMovies && (
            <div className='cards__button-container'>
              <button className='cards__button' onClick={showMoreBtn}> {/* Кнопка "Еще" для показа дополнительных фильмов */}
                Ещё
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
