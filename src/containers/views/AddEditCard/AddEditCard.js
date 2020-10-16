import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";


import Card from "../../../components/Card/Card";
import InputForm from "../../../components/InputTable/InputTable";

import {addCard} from '../../../store/actions/cards'

//Izvlacimo prva dva broja trenutne godine
let yearFirstTwoNumbers = String(new Date().getFullYear());
yearFirstTwoNumbers = yearFirstTwoNumbers.slice(0, 2);

const AddEditCard = (props) => {
  let { id } = useParams();

  const [card, setCard] = useState({
    id: null,
    name: "",
    numbers: ["", "", "", ""],
    date: "",
  });
  const [focus,setFocus] = useState();

  useEffect(() => {
    if (props.cards && props.cards.length > 0 && id) {
      const card = props.cards.find((card) => card.id === parseInt(id));
      setCard({
        id: card.id,
        name: card.name,
        numbers: card.numbers,
        date: card.month + "/" + (card.year % 100),
      });
    }
  }, [id, props.cards]);
  

  const setFocusHandler = (row,column) => {
    console.log(row,column)
    setFocus(row + "" + column)
  }

  //Formatiramo datum
  const formatedDate = {
    month: parseInt(card.date.split("/")[0]),
    year: parseInt(yearFirstTwoNumbers + card.date.split("/")[1]),
  };

  const changeNameHandler = (property) => {
    setCard((p) => ({ ...p, name: property }));
  };

  const changeNumberHandler = (index, property) => {
    //Proveravamo da li je property broj
    if (isNaN(property)) {
      return;
    }
    const numbersToUpdate = [...card.numbers];
    if (
      //Proveravamo da li prvi red brojeva setujemo i da li je broj izemdju 4 i 6 posto te brojeve prihvatamo kao validne
      (index === 0 && property.length > 0 && property.charAt(0) < 4) ||
      property.charAt(0) > 6
    ) {
      return;
    }
    //Svako polje moze da ima maksimalno 4 broja
    if (property.length < 5) {
      numbersToUpdate[index] = property;
      setCard((p) => ({ ...p, numbers: numbersToUpdate }));
    }
  };

  const changeDateHandler = (property) => {
    let value = property;
    const split = property.split("/");

    //Proveravamo da li imamo dva broja i da li imamo samo jedan spliter /
    if (
      (isNaN(split[0]) && (split[1] ? isNaN(split[1]) : true)) ||
      split.length > 2
    ) {
      return;
    }

    //Proveravamo da li je mesec veci od 12 ako jeste onda je to broj godine
    if (parseInt(split[0]) > 12) {
      //Do ovog sme da dodje jedino ako nije setovana godina, ukoliko jeste ne dodajemo nista
      if (!split[1]) {
        //Formatiramo datum tako da ako neko unese 1221 to ce biti 12 mesec 2021 godina
        value = card.date + "/" + property.charAt(property.length - 1);
      } else return;
    }

    //Proveravamo da li vec imamo godinu
    if (split[1] && split[1].length > 2) {
      return;
    }

    //Setujemo ukoliko su sve provere prosle
    setCard((p) => ({ ...p, date: value }));
  };

  const submitCard = (e) => {
    e.preventDefault();

    //Proveravamo da li su godine cetvorocifren broj i da li je korisnik uneo datum
    if (formatedDate.year > 999 && formatedDate.month) {
      //Proveravamo da li je datum na kartici istekao
      if (
        formatedDate.year <= new Date().getFullYear() &&
        formatedDate.month <= new Date().getMonth()
      ) {
        console.log("Vasa kartica je istekla");
        return;
      }
    } else {
      console.log("Niste uneli validan datum");
      return;
    }

    //Proveravamo da li ima neko uneseno polje za broj kreditne kartice cija je duzina 4
    let numberLengthCheck = card.numbers.some((number) => number.length < 4);
    if (numberLengthCheck) {
      console.log("Niste uneli broj kartice");
      return;
    }

    //Proveravamo da li je korisnik uneo ime
    if (!card.name) {
      console.log("Niste uneli ime");
      return;
    }


    let updatedCards = props.cards;
    const formatedCard = {
      id: new Date().getTime(),
      name: card.name,
      numbers: card.numbers,
      month: formatedDate.month,
      year: formatedDate.year,
    };
    if (!card.id) {
          //Dodajemo novu karticu
      if(updatedCards){
        updatedCards.push(formatedCard)
      }else updatedCards = [formatedCard]

      localStorage.setItem("cards", JSON.stringify(updatedCards));
      props.addCard(formatedCard)
    }else {
      //Editujemo vec postojecu karticu
      let cardIndex = props.cards.findIndex(propsCard => propsCard.id === card.id)
      updatedCards[cardIndex] = formatedCard

      localStorage.setItem("cards", JSON.stringify(updatedCards));
    }
    props.history.push("/cards")
  };

  return (
    <div className="Cards-view">
      <h1>{props.location.pathname === "/cards/add" ? "Add card" : "Edit card"}</h1>
      <Card
        card={{ ...card, month: formatedDate.month, year: formatedDate.year }}
        edit
        setFocus={setFocusHandler}
      />
      <InputForm
        {...card}
        updateNumbers={changeNumberHandler}
        updateName={changeNameHandler}
        updateDate={changeDateHandler}
        submit={submitCard}
        focus={focus}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state,
  };
};

export default connect(mapStateToProps, {addCard})(AddEditCard);
