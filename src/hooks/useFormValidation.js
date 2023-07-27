import { useState, useCallback } from 'react';

const useFormValidation = () => {
  // Состояния для хранения значений полей формы, сообщений об ошибках и валидности формы
  const [newValues, setNewValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Функция для обработки изменений в полях формы
  const handleFormChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setNewValues({ ...newValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsFormValid(evt.target.closest('form').checkValidity());
  };

  // Функция для сброса состояний формы в исходное состояние с возможностью передать новые значения
  const resetForm = useCallback(() => {
    setNewValues({});
    setErrors({});
    setIsFormValid(false);
  }, []);

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
