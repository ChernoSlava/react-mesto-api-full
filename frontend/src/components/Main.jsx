import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import profileBtn from '../images/Profile__Edit-Button.svg';

import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardForDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { avatar, name, about } = currentUser;
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={avatar}
            alt="Фото профиля"
            className="profile__avatar-element"
          />
          <button
            className="profile__avatar-btn"
            aria-label="Edit avatar"
            type="button"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <button
            type="button"
            className="profile__button"
            onClick={onEditProfile}>
            <img src={profileBtn} alt="Кнопка редактирования" />
          </button>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button
          type="button"
          aria-label="Add new place"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section>
        <ul className="elements">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardForDelete={onCardForDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
