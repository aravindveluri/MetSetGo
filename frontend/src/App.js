import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import Profile from "./components/Profile";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/EventPage";
import EditEvent from "./components/EditEvent";
import EventCatalog from "./components/EventCatalog";
import EditProfile from "./components/EditProfile";
import PlayerEvents from "./components/PlayerEvents";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/profile/:uid">
            <Profile></Profile>
          </Route>
          <Route exact path="/profile/:uid/edit">
            <EditProfile></EditProfile>
          </Route>
          <Route exact path="/events/create">
            <CreateEvent></CreateEvent>
          </Route>
          <Route exact path="/events/:eid">
            <EventPage></EventPage>
          </Route>
          <Route exact path="/events/:eid/edit">
            <EditEvent></EditEvent>
          </Route>
          <Route exact path="/events">
            <EventCatalog></EventCatalog>
          </Route>
          <Route exact path="/profile/:uid/events">
            <PlayerEvents></PlayerEvents>
          </Route>




        </Switch>
      </Router>
    </div>
  );
}

export default App;