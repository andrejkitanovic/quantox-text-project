import React from "react";
import "./InputTable.scss";

const InputTable = (props) => {
  const cardNumberInputs = [];

  for (let i = 0; i < 4; i++) {
    cardNumberInputs.push(
      <input key={i} type="text" value={props.numbers[i]} onChange={(e) => props.updateNumbers(i,e.target.value)}></input>
    );
  }

  return (
    <form className="InputTable" onSubmit={(e) => props.submit(e)}>
      <label>Name</label>

      <input type="text" value={props.name} onChange={(e) => props.updateName(e.target.value)} />

      <label>Card number</label>

      <div className="card-number">{cardNumberInputs}</div>

      <label>Expires on</label>

      <input type="text" value={props.date} onChange={(e) => props.updateDate(e.target.value)}/>

      <button className="submit">Save</button>
    </form>
  );
};

export default InputTable;
