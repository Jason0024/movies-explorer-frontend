import React from 'react';
import './SearchError.css';

// Компонент для отображения сообщения об ошибке поиска
function SearchError({ errorText }) {
  return <p className='search__error'>{errorText}</p>;
}

export default SearchError;
