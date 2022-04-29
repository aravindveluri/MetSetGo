import { useContext, useState } from "react";
import { connect } from "react-redux";
import LoginAuthAction from "../actions/authActions";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
  const { loginState, login } = props;
  const [userState, setUserState] = useState({})
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault();
    userState.username.length > 0 && login(userState, history)
  };

  return (
    <div>
      <Header/>
      <div className="sign-in-main">
        <div className="container d-flex">
          <div className="sign-in-container py-5 m-auto border">
            <div className="sign-in-header">
              <h4 className="font-weight-bold">Login</h4>
              <p className="sign-in-intro">
                <span className="text-muted">New to MetSetGo? </span>
                <span className="text-danger font-weight-bold">Sign Up</span>
              </p>
              {/* <div className="login-social-media py-3">
                <button className="btn btn-primary btn-block btn-sm">
                  Continue with Google
                </button>
              </div> */}
            </div>
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group my-2">
                <label htmlFor="username" className="my-2">Username</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  onChange={(event) => {
                    const username = event.target.value;
                    setUserState({ ...userState, ...{ username } });
                  }}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small> */}
              </div>
              <div className="form-group my-2">
                <label htmlFor="InputPassword1" className="my-2">Password</label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  onChange={(event) => {
                    const password = event.target.value;
                    setUserState({ ...userState, ...{ password } });
                  }}
                />
              </div>
              <button type="submit" className="btn btn-danger btn-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );};

const mapStateToProps = (state) => {
  return {
    loginState: state.authReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userState, history) => {
      dispatch(LoginAuthAction(userState, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage); 