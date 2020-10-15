import React from "react";
import "./Card.scss";

import { Link } from "react-router-dom";

const AddCard = (props) => {
  return (
    <Link to="/cards/add">
      <div className="Card add"></div>
    </Link>
  );
};

export default AddCard;
