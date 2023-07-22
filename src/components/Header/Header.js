import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImg from '../../images/logo.svg';


function Header() {
  return (
    <>
      <header className="header" id="header">
        <Link to="/" className="form__logo">
          <img src={logoImg} alt="Логотип проекта" />
        </Link>
        <div className="header__button-container">
          <Link to="/signup" className="header__button">
            Регистрация
          </Link>
          <Link to="/signin" className="header__button header__button-green">
            Войти
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
