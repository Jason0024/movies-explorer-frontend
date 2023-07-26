import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from './Navigation/Navigation';
import logoIco from '../../images/logo.svg';
import menuIco from '../../images/menu-button.svg';


function Header({ loggedIn, colorClass }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleMenuOpen() {
    setIsClicked(true);
  }

  function handleMenuClose() {
    setIsClicked(false);
  }

  return (
    <>
      {!loggedIn ? (
        <header className={`header ${colorClass}`} id='header'>
          <Link to='/' className='form__logo'>
            <img src={logoIco} alt='Иконка логотипа' />
          </Link>
          <div className='header__button-container'>
            <Link to='/signup' className='header__button'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__button header__button-green'>
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className={`header ${colorClass}`} id='header'>
          <Link to='/' className='form__logo'>
            <img src={logoIco} alt='логотип' />
          </Link>
          <div className='header__button-container_films'>
            <NavLink
              to='/movies'
              className='header__button'
              activeClassName='header__button_active'>
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className='header__button'
              activeClassName='header__button_active'>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className='header__button-container'>
            <Link to='/profile' className='header__account-button'>
            </Link>
            <button onClick={handleMenuOpen} className='header__menu-button'>
              <img src={menuIco} alt='меню' />
            </button>
          </div>
          {isClicked ? <Navigation handleMenuClose={handleMenuClose} /> : ''}
        </header>
      )}
    </>
  );
}

export default Header;
