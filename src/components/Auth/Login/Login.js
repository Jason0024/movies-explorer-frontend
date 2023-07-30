import React from 'react';
import { Link } from 'react-router-dom';
import '../Form.css';
import logoIco from '../../../images/logo.svg';
import useFormValidation from '../../../hooks/useFormValidation';
import { EMAIL_PATTERN } from '../../../utils/constants';

function Login({ onAuthorize, isLoading }) {
  const { newValues, errors, handleFormChange, isFormValid } = useFormValidation({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: newValues.email,
      password: newValues.password,
    });
  }

  // Добавим дополнительную проверку на наличие домена первого уровня в адресе электронной почты
  const isEmailValid = errors.email === '' && newValues.email.includes('.');

  return (
    <div className='form__wrapper'>
      <Link to='/' className='form__logo'>
        <img src={logoIco} alt='Иконка логотипа' />
      </Link>
      <h3 className='form__title'>Рады видеть!</h3>
      <form className='form' id='form' onSubmit={handleSubmit} noValidate>
        <label className='form__field'>
          E-mail
          <input
            name='email'
            className='form__input'
            id='email-input'
            type='email'
            required
            onChange={handleFormChange}
            pattern={EMAIL_PATTERN}
            value={newValues.email || ''}
          />
          <span className='form__input-error'>{errors.email}</span>
        </label>
        <label className='form__field'>
          Пароль
          <input
            name='password'
            className='form__input'
            id='password-input'
            type='password'
            required
            onChange={handleFormChange}
            value={newValues.password || ''}
          />
          <span className='form__input-error'>{errors.password}</span>
        </label>
        <button
          type='submit'
          disabled={!isFormValid || isLoading || !isEmailValid} // Добавим проверку на isEmailValid
          className={
            !isFormValid || isLoading || !isEmailValid
              ? 'form__button-save form__button-save_inactive'
              : 'form__button-save'
          }>
          Войти
        </button>
      </form>
      <p className='form__text'>
        Еще не зарегистрированы?
        <Link to='/signup' className='form__link'>
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
