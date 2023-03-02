import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import auth from '../utils/auth';

import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [authorizatUserEmail, setAuthorizatUserEmail] = useState('');

  const [selectedCard, setSelectedCard] = useState({});
  const [cardForDelete, setCardForDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    Promise.all([api.getUserInfoFromServer(), api.getCards()])

      .then(([user, items]) => {
        setCurrentUser(user);
        setCards(items);
      })
      .catch(err => {
        console.log(err);
      });
  }, [loggedIn]);

  const handlerUpdateUser = data => {
    setIsLoading(true);
    api
      .setUserInfoToServer(data)
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = data => {
    setIsLoading(true);
    api
      .setUserAvatarToServer(data)
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        const newCards = cards.map(currentCard =>
          currentCard._id === card._id ? newCard : currentCard,
        );
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCardDelete = e => {
    e.preventDefault();

    setIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        // eslint-disable-next-line no-shadow
        const newCard = cards.filter(e => e !== cardForDelete);
        setCards(newCard);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = data => {
    setIsLoading(true);
    api
      .postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const handleCardForDelete = card => {
    setCardForDelete(card);
    setConfirmPopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };

  const handleCheckToken = useCallback(() => {
    const token = localStorage.getItem('jwt');
    auth
      .checkToken(token)
      .then(res => {
        setAuthorizatUserEmail((res.data || res).email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }, [history]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken]);

  const handleRegistration = data => {
    auth
      .registration(data)
      .then(() => {
        setIsSignUpSuccess(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setIsSignUpSuccess(false);
        console.log(err);
      })
      .finally(() => {
        handleInfoTooltipOpen();
      });
  };

  const handleAuthorization = values => {
    auth
      .authorization(values)
      .then(data => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        setAuthorizatUserEmail(values.email);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          onSingOut={handleSignOut}
          authorizatUserEmail={authorizatUserEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} />
          </Route>
          <Route path="/sign-in">
            <Login onAuthorization={handleAuthorization} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardForDelete={handleCardForDelete}
          />
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handlerUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSignUpSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
