import React from "react";
import "./Card.scss";

// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import visa from "../../assets/Card/0.png";
import discover from "../../assets/Card/discover.png";
import master from "../../assets/Card/master.png";

import pin from "../../assets/Card/pin.png";

const typeMap = new Map();
typeMap.set(4, visa);
typeMap.set(5, master);
typeMap.set(6, discover);

const Card = ({ card, history, edit, setFocus }) => {
  let formatedDate = null;

  if (card.year && card.month) {
    const formatMonth = card.month > 9 ? card.month : "0" + card.month;
    let formatYear = card.year > 1000 ? card.year % 100 : "";
    if (formatYear && formatYear < 10) {
      console.log(formatYear);
      formatYear = "0" + formatYear;
    }
    formatedDate = `${formatMonth}/${formatYear}`;
  }

  const pushToEditCard = () => {
    if (!edit) {
      history.push(`cards/${card.id}/edit`);
    }
  };

  const focusHandler = (row, column) => {
    if (edit) {
      setFocus(row, column);
    }
  };

  let cardNumber = [];
  for (let i = 0; i < 4; i++) {
    cardNumber.push(
      <p key={i} onClick={() => focusHandler(1, i+1)}>
        {card.numbers[i]}
      </p>
    );
  }

  return (
    <div
      className={"Card" + (edit ? " edit" : " view")}
      onClick={pushToEditCard}
    >
      <div className="type-holder">
        {card.numbers && card.numbers[0] && (
          <img
            src={typeMap.get(parseInt(card.numbers[0].charAt(0)))}
            alt="Card type"
            loading="lazy"
          />
        )}
      </div>

      <div className="pin-holder">
        <img src={pin} alt="Pin" loading="lazy" />
      </div>

      <div className="numbers-flex">{cardNumber}</div>

      <div className="name-year-flex">
        <p onClick={() => focusHandler(2, 1)}>{card.name}</p>
        <p onClick={() => focusHandler(2, 2)}>{formatedDate}</p>
      </div>
    </div>
  );
};

export default withRouter(React.memo(Card));
