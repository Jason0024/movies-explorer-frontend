import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  // Состояния компонента
  const [isQueryError, setIsQueryError] = useState(false); // Ошибка при пустом запросе
  const [query, setQuery] = useState(''); // Строка запроса
  const location = useLocation(); // Объект маршрута из react-router-dom

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearchMovies(query);
    }
  }

  // Обработчик изменения строки запроса
  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  // Эффект для установки значения запроса из локального хранилища, если мы находимся на странице "movies" и запрос уже был выполнен
  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setQuery(localQuery);
    }
  }, [location]);

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={handleSubmit}>
        <label className="search__label" htmlFor="search-input"></label>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={handleChangeQuery}
          value={query || ''}>
        </input>

        <button className="search__button" type="submit"></button>
      </form>
      <Checkbox onFilter={onFilter} isShortMovies={isShortMovies} />
      {isQueryError && <span className="search__form-error">Нужно ввести ключевое слово</span>}
    </section>
  );
}

export default SearchForm;
