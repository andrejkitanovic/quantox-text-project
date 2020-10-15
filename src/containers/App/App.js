import React from "react";
import "./App.scss";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Cards from '../../containers/views/Cards/Cards'
import AddCard from '../../containers/views/AddCard/AddCard'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/cards" exact component={Cards} />
          <Route path="/cards/add" component={AddCard} />
          <Route path="/cards/:id/edit" component={AddCard} />
          <Redirect to="/cards" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
