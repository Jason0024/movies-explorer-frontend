import React, { useState, useEffect, useRef } from 'react';
import './SearchForm.css';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  // Загружаем сохраненные данные из локального хранилища при монтировании компонента
  const savedQuery = localStorage.getItem('searchQuery') || '';
  const savedIsShortMovies = localStorage.getItem('isShortMovies') === 'true';

  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState(savedQuery);
  const [isInitialSearchComplete, setIsInitialSearchComplete] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(savedIsShortMovies);
  const movies = useState([]);
  const location = useLocation();
  const isFilterAppliedRef = useRef(false);

  // Обработчик изменения значения в поле ввода
  function handleChangeQuery(e) {
    setQuery(e.target.value);
    setIsQueryError(false); // Сбрасываем ошибку при изменении значения
    setIsInitialSearchComplete(false);
    setIsCheckboxActive(false);
  }

  // Обработчик отправки формы поиска
  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true); // Проверяем наличие запроса перед поиском
    } else {
      onSearchMovies(query);
    }
  }

  // Обработчик изменения значения чекбокса
  const handleFilterChange = (isChecked) => {
    setIsCheckboxActive(isChecked);
    // Вызываем функцию onFilter с текущим состоянием чекбокса
    onFilter(isChecked);
  };

  // Сохраняем данные в локальное хранилище при изменении поискового запроса или состояния переключателя короткометражек
  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('isShortMovies', isCheckboxActive.toString());
  }, [isCheckboxActive]);

  useEffect(() => {
    // Запускаем поиск фильмов с текущим запросом и фильтром (isShortMovies)
    onSearchMovies(query);
  }, [query, isShortMovies, onSearchMovies]);

  useEffect(() => {
    // Применяем фильтр короткометражек, если он уже был применен ранее
    if (isInitialSearchComplete && location.pathname === '/movies') {
      if (!isFilterAppliedRef.current) {
        onFilter(isShortMovies);
        isFilterAppliedRef.current = true;
      }
    } else {
      isFilterAppliedRef.current = false;
    }
  }, [isInitialSearchComplete, location, onFilter, isShortMovies]);

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
          value={query || ''}
        />

        <button className="search__button" type="submit"></button>
      </form>
      <Checkbox onFilter={handleFilterChange} isShortMovies={isShortMovies} isActive={isCheckboxActive} />
      {isQueryError && <span className="search__form-error">Нужно ввести ключевое слово</span>}
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </section>
  );
}

export default SearchForm;
