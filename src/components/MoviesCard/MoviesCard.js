import { useState } from 'react';
import { formatDuration } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({ card, isSavedFilms, handleElectClick, handleDeleteClick, savedMovies }) {
  // Состояние isSaved отслеживает, сохранен ли фильм
  const [isSaved, setIsSaved] = useState(savedMovies.some((m) => m.movieId === card.id));

  // Обработчик клика по карточке фильма
  function onCardClick() {
    // Если фильм уже сохранен, найдем его в списке сохраненных фильмов и удалим
    if (isSaved) {
      const movieToDelete = savedMovies.find((m) => m.movieId === card.id);
      handleDeleteClick(movieToDelete);
    } else {
      // Если фильм не сохранен, добавим его в список сохраненных
      handleElectClick(card);
    }

    // Переключим состояние isSaved после добавления или удаления фильма
    setIsSaved(!isSaved);
  }

  // Обработчик клика по кнопке удаления фильма
  function onDelete() {
    handleDeleteClick(card);
  }

  // Определение класса для кнопки сохранения фильма в зависимости от состояния isSaved
  const cardSaveButtonClassName = isSaved ? 'card__save-button card__save-button_active' : 'card__save-button';

  return (
    <li className='card'>
      {/* Ссылка на трейлер фильма, открывается в новой вкладке */}
      <a href={card.trailerLink} target='_blank' rel='noreferrer'>
        {/* Изображение карточки фильма */}
        <img
          className='card__image'
          alt={card.nameRU}
          src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
        />
      </a>

      <div className='card__container'>
        <div className='card__info-container'>
          {/* Название фильма */}
          <h2 className='card__text'>{card.nameRU}</h2>
          {/* Длительность фильма */}
          <span className='card__time'>{formatDuration(card.duration)}</span>
        </div>
        {/* Если компонент используется для списка сохраненных фильмов, отображаем кнопку удаления */}
        {isSavedFilms ? (
          <button type='button' className='card__delete-button' onClick={onDelete}></button>
        ) : (
          /* Иначе, отображаем кнопку сохранения фильма с соответствующим классом */
          <button type='button' className={cardSaveButtonClassName} onClick={onCardClick}></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
