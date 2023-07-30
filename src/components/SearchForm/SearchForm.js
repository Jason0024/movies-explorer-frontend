import React, { useState, useEffect, useRef } from 'react';
import './SearchForm.css';
import Checkbox from '../Checkbox/Checkbox';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState('');
  const [isInitialSearchComplete, setIsInitialSearchComplete] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [movies, setMovies] = useState([]); // Добавлено состояние для хранения списка фильмов
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
      // Вызываем функцию onSearchMovies с текущим запросом
      onSearchMovies(query);
    }
  }

  // Обработчик изменения значения чекбокса
  const handleFilterChange = (isChecked) => {
    // Вызываем функцию onFilter с текущим состоянием чекбокса
    onFilter(isChecked);
    setIsCheckboxActive(true);
  };

  // Эффект для применения фильтра, когда компонент уже отрендерен
  useEffect(() => {
    if (isInitialSearchComplete && location.pathname === '/movies') {
      // Проверяем, был ли уже применен фильтр
      if (!isFilterAppliedRef.current) {
        // Применяем фильтр, передав текущее значение isShortMovies
        onFilter(isShortMovies);
        isFilterAppliedRef.current = true;
      }
    } else {
      isFilterAppliedRef.current = false;
    }
  }, [isInitialSearchComplete, location, onFilter, isShortMovies]);

  // Эффект для обновления списка фильмов при изменении значения query или isShortMovies
  useEffect(() => {
    // Очищаем список фильмов перед обновлением
    setMovies([]);
    // Запускаем поиск фильмов с текущим запросом и фильтром (isShortMovies)
    onSearchMovies(query);
  }, [query, isShortMovies, onSearchMovies]); // Добавлен 'onSearchMovies' в массив зависимостей

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
