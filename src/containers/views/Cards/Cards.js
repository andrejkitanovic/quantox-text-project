import React from "react";

import {connect} from 'react-redux'

import AddCard from "../../../components/Card/AddCard";
import Card from "../../../components/Card/Card";

const Cards = (props) => {

  let cards = null

  if(props.cards){
    cards = props.cards.map(card => <Card card={card} key={card.id}/>)
  }

  return (
    <div className="Cards-view">
      <h1>My Cards</h1>
      {cards}

      <AddCard />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cards:state
  }
}

export default connect(mapStateToProps)(Cards);
