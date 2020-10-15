import React from "react";
import "./Cards.scss";

import AddCard from "../../../components/Card/AddCard";
import Card from "../../../components/Card/Card";

const cardDummy = {
  id: 1,
  type:0, //Check if its visa - mastercard - discover
  numbers: ["4234", "4567", "8321", "0402"],
  name: "Andrej Kitanovic",
  year: 2020,
  month: 9
};

const Cards = (props) => {
  return (
    <div className="Cards-view">
      <h1>My Cards</h1>

      <Card card={cardDummy} />
      
      <AddCard />
    </div>
  );
};

export default Cards;
