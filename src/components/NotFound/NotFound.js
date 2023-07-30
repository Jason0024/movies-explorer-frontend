import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  useEffect(() => {
    const handleGoBack = () => {
      history.goBack();
    };

    window.addEventListener('popstate', handleGoBack);

    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [history]);

  return (
    <section className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__text'>Страница не найдена</p>
      <button className='not-found__button' onClick={() => history.goBack()}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
