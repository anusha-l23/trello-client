import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";

class Card extends Component {
  state = {
    editing: false,
  };


  startEditing = () =>

    this.setState({
      
      editing: true,
      text: this.props.card.text
      
    });


  endEditing = () => this.setState({ editing: false });

  editCard = async text => {
    const { card, dispatch } = this.props;

    this.endEditing();
console.log(card, text);
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card?._id, cardText: text }

    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    console.log(listId, "listId")
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
  };

  render() {
    
    const { card, index } = this.props;
    console.log(card, "card data")

   
    const { editing } = this.state;

    if (!editing && card) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
                <div className="Card-Icons">
                  <div className="Card-Icon" onClick={this.startEditing}>
                    <ion-icon name="create" />
                  </div>
                </div>
{card?.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card?.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
