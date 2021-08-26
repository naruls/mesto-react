import React from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';
import ImagePopup from './ImagePopup.js';

import api from '../utils/Api';

function Main(props) {

const [userName, setUserName] = React.useState('');
const [userDescription, setUserDescription] = React.useState('');
const [userAvatar, setUserAvatar] = React.useState('');
const [cards , setСards ] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data)=>{
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
      })
      .catch((err) => {
    console.log(err);
  });
    api.getInitialCards()
      .then((data)=>{
      setСards([...data])
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  return (
      <main className="container">

  <PopupWithForm name="change" title="Редактировать профиль" formName="popupForm"  isOpen={props.isEditProfileOpen} onClose={props.onClose}
  children={<>
              <input id="profile-name" type="text" className="popup__input popup__input_user_name" name="name" required minLength="2" maxLength="40"/>
              <span id="profile-name-error" className="popup__input-error"></span> 
              <input id="profile-description" type="text" className="popup__input popup__input_user_description" name="description" required minLength="2" maxLength="200"/>
              <span id="profile-description-error" className="popup__input-error"></span> 
            </>}
  />
  <PopupWithForm name="add" title="Новое место" formName="popupCardForm"  isOpen={props.isAddPlaceOpen} onClose={props.onClose}
    children={<>
              <input id="mesto-name" type="text" className="popup__input popup__input_mesto_name" name="mestoName" placeholder="Название" required minLength="2" maxLength="30"/>
              <span id="mesto-name-error" className="popup__input-error"></span> 
              <input id="mesto-description" type="url" className="popup__input popup__input_mesto_link" name="mestoDescription" placeholder="Ссылка на картинку" required/>
              <span id="mesto-description-error" className="popup__input-error"></span> 
            </>}
  />
  <PopupWithForm name="avatar" title="Обновить аватар" formName="popupAvatarForm"  isOpen={props.isEditAvatarOpen} onClose={props.onClose}
    children={<>
              <input id="avatar-description" type="url" className="popup__input popup__input_avatar_link" name="avatarDescription" placeholder="Ссылка на картинку" required/>
              <span id="avatar-description-error" className="popup__input-error"></span> 
            </>}
  />
    <PopupWithForm name="confirm" title="Вы уверены?" formName="popupFormConfirm"  isOpen={props.isConfirmOpen} onClose={props.onClose}
  />
  <ImagePopup isOpen={props.isImageOpen} onClose={props.onClose} card={props.card}/>
  <section className="profile background">
      <img src={userAvatar} className="profile__avatar" alt="Жак-Ив Кусто"/>
        <div className="profile__frontground" onClick={props.onEditAvatar}></div>
    <div className="profile__info">
      <div className="profile__top-info">
        <h1 className="profile__name">{userName}</h1>
        <button className="profile__change-button" type="button" onClick={props.onEditProfile}></button>
      </div>
      <p className="profile__description">{userDescription}</p>
    </div>
    <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
  </section>
  <section className="elements background">
  </section>
  <div id="card-template">
    {cards.map(card => (
      <Card card={card} onCardClick={props.onCardClick} key={card._id}/>
    ))}
  </div>
  </main>
  );
}

export default Main;