import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NoMatch from "./components/NoMatch/NoMatch";
import Requested from "./components/Requested/Requested";
import { getSavedMembersFromDatabase } from "./utilities/databaseManager";
import TeamMembers from "./components/TeamMembers/TeamMembers";

// creating and exporting the context
export const AddedMembersContext = createContext();

function App() {
  const [addedMembers, setAddedMembers] = useState([]);
  const [confirmedMembers, setConfirmedMembers] = useState([]);

  useEffect(() => {
    // Retriving all savedMembers From database
    const savedMembersFromDatabase = getSavedMembersFromDatabase();
    const savedMembersArrFromDatabase = Object.values(savedMembersFromDatabase);

    // Splitting the date into tow part added/requested members and confirmed members
    const addedMembersFromDatabase = savedMembersArrFromDatabase.filter(
      (m) => m.isConfirmed === false
    );
    const confirmedMembersFromDatabase = savedMembersArrFromDatabase.filter(
      (m) => m.isConfirmed === true
    );

    // Setting two states
    setAddedMembers(addedMembersFromDatabase);
    setConfirmedMembers(confirmedMembersFromDatabase);
  }, []);

  return (
    <AddedMembersContext.Provider
      value={{
        addedMembers,
        setAddedMembers,
        confirmedMembers,
        setConfirmedMembers,
      }}
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/requested">
            <Requested />
          </Route>
          <Route path="/teammembers">
            <TeamMembers />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AddedMembersContext.Provider>
  );
}

export default App;
