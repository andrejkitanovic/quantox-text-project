import React, { useEffect, useRef } from "react";
import "./InputTable.scss";

const InputTable = (props) => {
  const cardNumberInputs = [];

  const name = useRef();
  const date = useRef();

  for (let i = 0; i < 4; i++) {
    cardNumberInputs.push(
      <input
        key={i}
        id={`input${i + 1}`}
        type="text"
        value={props.numbers && props.numbers[i]}
        onChange={(e) => props.updateNumbers(i, e.target.value)}
      ></input>
    );
  }

  useEffect(() => {
    switch (props.focus) {
      case "11":
        document.getElementById("input1").focus();
        break;
      case "12":
        document.getElementById("input2").focus();
        break;
      case "13":
        document.getElementById("input3").focus();
        break;
      case "14":
        document.getElementById("input4").focus();
        break;
      case "21":
        name.current.focus();
        break;
      case "22":
        date.current.focus();
        break;
      default:
        break;
    }
  }, [props.focus]);

  return (
    <form className="InputTable" onSubmit={(e) => props.submit(e)}>
      <label>Name</label>
      <input
        type="text"
        value={props.name}
        ref={name}
        onChange={(e) => props.updateName(e.target.value)}
      />

      <label>Card number</label>
      <div className="card-number">{cardNumberInputs}</div>

      <label>Expires on</label>
      <input
        type="text"
        value={props.date}
        ref={date}
        onChange={(e) => props.updateDate(e.target.value)}
      />

      <button className="submit">Save</button>
    </form>
  );
};

export default InputTable;
