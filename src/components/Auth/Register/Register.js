import React from 'react';
import { Link } from 'react-router-dom';
import '../Form.css';
import logoIco from '../../../images/logo.svg';
import useFormValidation from '../../../hooks/useFormValidation';

function Register({ onRegister, isLoading }) {
  const { newValues, errors, handleFormChange, isFormValid } = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(newValues);
  }

  return (
    <>
      <div className='form__wrapper'>
        <Link to='/' className='form__logo'>
          <img src={logoIco} alt='Иконка логотипа' />
        </Link>
        <h3 className='form__title'>Добро пожаловать!</h3>
        <form className='form' id='form' onSubmit={handleSubmit} noValidate>
          <label className='form__field'>
            Имя
            <input
              name='name'
              className='form__input'
              type='text'
              minLength='2'
              maxLength='40'
              required
              onChange={handleFormChange}
              value={newValues.name}
              pattern='^[A-Za-zА-Яа-яЁё\s -]+$'
            />
            <span className='form__input-error'>{errors.name}</span>
          </label>
          <label className='form__field'>
            E-mail
            <input
              name='email'
              className='form__input'
              type='email'
              required
              onChange={handleFormChange}
              value={newValues.email}
            />
            <span className='form__input-error'>{errors.email}</span>
          </label>
          <label className='form__field'>
            Пароль
            <input
              name='password'
              className='form__input'
              type='password'
              required
              onChange={handleFormChange}
              value={newValues.password}
            />
            <span className='form__input-error'>{errors.password}</span>
          </label>
          <button
            type='submit'
            disabled={!isFormValid || isLoading}
            className={
              !isFormValid || isLoading
                ? 'form__button-save form__button-save_inactive'
                : 'form__button-save'
            }
          >
            Зарегистрироваться
          </button>
        </form>
        <p className='form__text'>
          Уже зарегистрированы?
          <Link to='/signin' className='form__link'>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
