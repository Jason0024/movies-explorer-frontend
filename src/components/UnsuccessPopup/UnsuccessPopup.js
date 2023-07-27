import React from 'react';
import './UnsuccessPopup.css';

function UnsuccessPopup({ onClose, isSuccess, isUpdate }) {
  return (
    <div className={`popup ${!isSuccess ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          id='success-close-button'
          type='button'
          className='popup__close-button'
          onClick={onClose}
        />
        <h2 className='popup__signup-title'>{`${isUpdate ? 'Редактирование прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'
          }`}</h2>
      </div>
    </div>
  );
}

export default UnsuccessPopup;
