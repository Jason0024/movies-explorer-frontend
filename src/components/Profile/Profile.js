import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import useFormValidation from '../../hooks/useFormValidation';
import { EMAIL_PATTERN, NAME_PATTERN, TOP_LEVEL_DOMAIN_PATTERN } from '../../utils/constants';

function Profile({ signOut, onUpdateUser, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const { newValues, errors, handleFormChange, isFormValid, resetForm } = useFormValidation();
  const [isLastValues, setIsLastValues] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: newValues.name,
      email: newValues.email,
    });
  }

  useEffect(() => {
    if (currentUser.name === newValues.name) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
  }, [currentUser.name, newValues.name]);

  useEffect(() => {
    // Проверяем, проходит ли email валидацию и есть ли домен верхнего уровня в email
    const isEmailValid = errors.email === '' && TOP_LEVEL_DOMAIN_PATTERN.test(newValues.email);
    setIsEmailValid(isEmailValid);
  }, [errors.email, newValues.email]);

  return (
    <>
      <Header colorClass="other" loggedIn={loggedIn} />
      <section className='profile'>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <form id='form' className='profile__form' onSubmit={handleSubmit} noValidate>
          <label className='profile__field'>
            Имя
            <input
              name='name'
              className='profile__input'
              id='name-input'
              type='text'
              minLength='2'
              maxLength='40'
              required
              onChange={handleFormChange}
              value={newValues.name || ''}
              pattern={NAME_PATTERN}
            />
            <span className='profile__input-error'>{errors.name}</span>
          </label>

          <div className='profile__border'></div>
          <label className='profile__field'>
            E-mail
            <input
              name='email'
              className='profile__input'
              id='email-input'
              type='email'
              required
              onChange={handleFormChange}
              pattern={EMAIL_PATTERN}
              value={newValues.email || ''}
            />
            <span className='profile__input-error'>{errors.email}</span>
          </label>
          <button
            type='submit'
            disabled={!isFormValid || (isLastValues && !isEmailValid)}
            className={
              !isFormValid || (isLastValues && !isEmailValid)
                ? 'profile__button-save form__button-save_inactive'
                : 'profile__button-save'
            }
          >
            Редактировать
          </button>

          <button type='button' className='profile__logout' onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
