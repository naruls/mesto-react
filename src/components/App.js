import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});


  React.useEffect(() => {
      api.getUserInfo()
        .then((data)=>{
          setCurrentUser( {...data} );
        })
        .catch((err) => {
          console.log(err)
        });
    }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  {/*function handleConfirmClick() {
      setConfirmPopupOpen(true);
  }*/}

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(
      (data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then(
      (data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [cards , setCards ] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data)=>{
      setCards([...data])
    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
   
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c !== card));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main onEditAvatar={handleEditAvatarClick} 
        onAddPlace ={handleAddPlaceClick} 
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        card={selectedCard}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit}/>
      <Footer/>
    </CurrentUserContext.Provider>
  );
}

export default App;
