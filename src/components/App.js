import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';



function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({});

function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
}
function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
}
function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
}
/*function handleConfirmClick() {
    setConfirmPopupOpen(true);
}*/
function handleCardClick (card) {
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
  return (
  <div>
    <Header/>
    <Main onEditAvatar={handleEditAvatarClick} 
          onAddPlace ={handleAddPlaceClick} 
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          isEditProfileOpen={isEditProfilePopupOpen}
          isAddPlaceOpen={isAddPlacePopupOpen}
          isEditAvatarOpen={isEditAvatarPopupOpen}
          isConfirmOpen={isConfirmPopupOpen}
          isImageOpen={isImagePopupOpen}
          card={selectedCard}/>
    <Footer/>
  </div>
  );
}

export default App;
