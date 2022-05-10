import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import Profile from "./components/Profile";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/EventPage";
import EditEvent from "./components/EditEvent";

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
          <Route exact path="/events/create">
            <CreateEvent></CreateEvent>
          </Route>
          <Route exact path="/events/:eid">
            <EventPage></EventPage>
          </Route>
          <Route exact path="/events/:eid/edit">
            <EditEvent></EditEvent>
          </Route>



        </Switch>
      </Router>
    </div>
  );
}

export default App;