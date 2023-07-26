import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import useFormValidation from '../../hooks/useFormValidation';
import { EMAIL_PATTERN, NAME_PATTERN } from '../../utils/constants';

function Profile({ signOut, onUpdateUser, loggedIn, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { newValues, errors, handleFormChange, isFormValid, resetForm } = useFormValidation();
  const [isLastValues, setIsLastValues] = useState(false);

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
    if (currentUser.name === newValues.name && currentUser.email === newValues.email) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValues]);

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
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? 'profile__button-save form__button-save_inactive'
                : 'profile__button-save'
            }>
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
