import React from "react";

import { Link } from "react-router-dom";

import visa from "../../assets/Card/0.png";
import discover from "../../assets/Card/discover.png";
import master from "../../assets/Card/master.png";

import pin from "../../assets/Card/pin.png";

const typeMap = new Map();
typeMap.set(4, visa);
typeMap.set(5, master);
typeMap.set(6, discover);

const Card = ({ card }) => {
  const cardNumber =
    card.numbers && card.numbers.map((number,index) => <p key={index}>{number}</p>);

  let formatedDate = null;

  if (card.year && card.month) {
    const formatMonth = card.month > 9 ? card.month : "0" + card.month;
    const formatYear = card.year > 1000 ? card.year % 100 : ""
    formatedDate = `${formatMonth}/${formatYear}`;
  }

  return (
    <Link className="Card" to={card.id ? `cards/${card.id}/edit` : ""}>
      <div className="type-holder">
        {card.numbers[0] && <img src={typeMap.get(parseInt(card.numbers[0].charAt(0)))} alt="Card type" loading="lazy" />}
      </div>

      <div className="pin-holder">
        <img src={pin} alt="Pin" loading="lazy" />
      </div>

      <div className="numbers-flex">{cardNumber}</div>

      <div className="name-year-flex">
        <p>{card.name}</p>
        <p>{formatedDate}</p>
      </div>
    </Link>
  );
};

export default Card;
