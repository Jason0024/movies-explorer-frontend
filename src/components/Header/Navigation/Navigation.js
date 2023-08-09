import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import accountIco from '../../../images/acc-button.svg';

function Navigation({ handleMenuClose }) {
  return (
    <div className='navigation__overlay'>
      <div onClick={handleMenuClose} className='navigation__container-empty'></div>
      <div className='navigation__container'>
        <button className='navigation__close-button' onClick={handleMenuClose}></button>
        <nav className='navigation__nav'>
          <NavLink
            exact
            to='/'
            onClick={handleMenuClose}
            className='navigation__link'
            activeClassName='navigation__link_active'>
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            onClick={handleMenuClose}
            className='navigation__link'
            activeClassName='navigation__link_active'>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            onClick={handleMenuClose}
            className='navigation__link'
            activeClassName='navigation__link_active'>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to='/profile' onClick={handleMenuClose} className='navigation__account-button'>
          <img src={accountIco} alt='аккаунт' />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
