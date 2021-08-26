
function Card(props) {

function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
      <div className="element">
        <div className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleCardClick}></div>
        <button type="button" className="element__delete-button"></button>
        <div className="element__bottom">
          <h2 className="element__name">{props.card.name}</h2>
          <div className="element__like-place">
            <button type="button" className="element__like-button element__like-button_deactivate"></button>
            <p className="element__like-count">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
  );
}

export default Card;
