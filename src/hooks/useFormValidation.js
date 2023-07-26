import { useState, useCallback } from 'react';

const useFormValidation = () => {
  // Состояния для хранения значений полей формы, сообщений об ошибках и валидности формы
  const [newValues, setNewValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Функция для обработки изменений в полях формы
  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Обновляем состояние newValues, добавляя новое значение в соответствии с именем поля
    setNewValues({
      ...newValues,
      [name]: value,
    });

    // Проверяем валидность поля
    const isFormValid = event.target.checkValidity();

    // Обновляем состояние errors, добавляя сообщение об ошибке, если поле невалидно
    setErrors({
      ...errors,
      [name]: isFormValid ? '' : event.target.validationMessage,
    });

    // Проверяем валидность всей формы и обновляем соответствующее состояние isFormValid
    setIsFormValid(isFormValid);
  };

  // Функция для сброса состояний формы в исходное состояние с возможностью передать новые значения
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setNewValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setNewValues, setErrors, setIsFormValid],
  );

  // Возвращаем состояния и функции для использования в компонентах
  return {
    newValues,
    errors,
    handleFormChange,
    isFormValid,
    resetForm,
  };
};

export default useFormValidation;
