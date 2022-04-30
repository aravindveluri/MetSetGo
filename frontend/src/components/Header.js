import jwtDecode from "jwt-decode";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { LogOutAuthAction } from "../actions/authActions";

function Header(props) {
  const { auth, logout } = props;
  const history = useHistory();
  return (
    <div className="header d-flex justify-content-center py-2 shadow-sm">
      <Link to="/">
        <h5 className="font-weight-bold text-danger mx-3">MetSetGo</h5>
      </Link>
      <div className="ml-auto d-flex">
        {!auth.isLoggedIn ? (
          <React.Fragment>
            <Link to="/login">
              <button className="btn btn-danger btn-sm mx-2">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-danger btn-sm mr-5">Sign up</button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to={"/profile/" + jwtDecode(auth.user.access).user_id}>
              <h5>{jwtDecode(auth.user.access).username}</h5>
            </Link>
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => {
                logout(history);
              }}
            >
              Log Out
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      dispatch(LogOutAuthAction(history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);