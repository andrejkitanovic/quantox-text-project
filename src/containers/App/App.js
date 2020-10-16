import React, { useEffect } from "react";
import "./App.scss";

import asyncComponent from '../../utility/asyncComponent/asyncComponent'

import {connect} from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {loadCards} from '../../store/actions/cards'

//Asinhrono ucitavanje komponenti radi optimizacije
const Cards = asyncComponent(() => {
  return import('../../containers/views/Cards/Cards')
})
const AddEditCard = asyncComponent(() => {
  return import('../../containers/views/AddEditCard/AddEditCard')
})

function App({loadCards}) {
  useEffect(() => {
    loadCards()
  },[loadCards])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/cards" exact component={Cards} />
          <Route path="/cards/add" component={AddEditCard} />
          <Route path="/cards/:id/edit" component={AddEditCard} />
          <Redirect to="/cards" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(null,{loadCards})(App);
