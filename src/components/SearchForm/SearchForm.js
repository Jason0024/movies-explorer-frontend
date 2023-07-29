import React, { useState, useEffect, useRef } from 'react';
import './SearchForm.css';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); // Состояние для хранения списка фильмов
  const location = useLocation();
  const searchInputRef = useRef(null);

  // Обработчик изменения значения в поле ввода
  function handleChangeQuery(e) {
    setQuery(e.target.value);
    setIsQueryError(false); // Сбрасываем ошибку при изменении значения
  }

  // Обработчик отправки формы поиска
  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true); // Проверяем наличие запроса перед поиском
    } else {
      onSearchMovies(query, isShortMovies)
        .then((data) => {
          setMovies(data); // Сохраняем список фильмов в состояние
        })
        .catch((error) => {
          // Обработка ошибок при поиске фильмов
          console.error('Error while searching movies:', error);
        });
    }
  }

  // Эффект для восстановления значения поля ввода при возврате на страницу поиска
  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setQuery(localQuery);
    }
  }, [location]);

  // Эффект для фокусировки на поле ввода при монтировании компонента
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <section className='search'>
      <form className='search__form' id='form' onSubmit={handleSubmit}>
        <label className='search__label' htmlFor='search-input'></label>
        <input
          name='query'
          className='search__input'
          id='search-input'
          type='text'
          placeholder='Фильм'
          onChange={handleChangeQuery}
          value={query || ''}
          autoComplete='off' // Отключаем автозаполнение браузера
          ref={searchInputRef} // Привязываем ref к полю ввода
        />
        <button className='search__button' type='submit'></button>
      </form>
      <Checkbox onFilter={onFilter} isShortMovies={isShortMovies} />
      {isQueryError && <span className='search__form-error'>Нужно ввести ключевое слово</span>}
    </section>
  );
}

export default SearchForm;
