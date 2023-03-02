import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardForDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { id } = currentUser;
  const isOwnCard = (card.owner._id || card.owner) === id;
  const isLiked = card.likes.some(i => (i._id || i) === id);

  const cardDeleteButtonClassName = `${
    isOwnCard
      ? 'element__delete-button'
      : 'element__delete-button element__delete-button_hidden'
  }`;
  const cardLikeButtonClassName = `${
    isLiked ? 'element__heart element__heart_active' : 'element__heart'
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleCardKeyDown(e) {
    if (e.key === 'Enter') {
      onCardClick(card);
    }
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelete() {
    onCardForDelete(card);
  }

  return (
    <li className="element">
      <button
        type="button"
        aria-label="Delete"
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
      />
      <img
        role="presentation"
        className="element__image"
        src={card.link}
        alt={card.name}
        onKeyDown={handleCardKeyDown}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button
            onClick={handleLikeClick}
            aria-label="Like"
            type="button"
            name="heart"
            className={cardLikeButtonClassName}
            value=" "
          />
          <p className="element__number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
