import React, { useContext, useEffect, useState } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about } = currentUser;

  const [title, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name: title,
      about: description,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setName(name);
      setDescription(about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      btnClass="profile-btn"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <fieldset className="popup__set">
        <input
          id="name"
          type="text"
          name="name"
          className="popup__field popup__field_type_name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          value={title || ''}
          onChange={handleChangeName}
        />
        <span className="popup__field-error popup__field-error_field_name">
          Необходимо заполнить данное поле
        </span>
        <input
          id="job"
          type="text"
          name="job"
          className="popup__field popup__field_type_job"
          placeholder="Ваша работа"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__field-error popup__field-error_field_job">
          Необходимо заполнить данное поле
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
