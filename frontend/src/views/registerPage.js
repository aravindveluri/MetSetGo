import { useState, useContext } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import RegisterAuthAction from "../actions/registerActions";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";

function Register(props) {
  console.log(props)
  const { isRegistered, register } = props;
  const [userState, setUserState] = useState({}); 
  
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    register(userState, history)
  };

  return (
    <div>
      <Header ></Header>
      <div className="sign-in-main">
        <div className="container d-flex">
          <div className="sign-in-container py-5 m-auto border">
            <div className="sign-in-header">
              <h4 className="font-weight-bold">Sign Up</h4>
              <p className="sign-in-intro">
                <span className="text-muted">Already signed up to MetSetGo? </span>
                <span className="text-danger font-weight-bold">Sign In</span>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="username">Username</label>
                    <input className="form-control"
                      type="text"
                      id="username"
                      onChange={e => setUserState({ ...userState, username: e.target.value })}
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="email">Email</label>
                    <input className="form-control"
                      type="text"
                      id="email"
                      onChange={e => setUserState({ ...userState, email: e.target.value })}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control"
                      type="text"
                      id="phone"
                      onChange={e => setUserState({ ...userState, phone: e.target.value })}
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="fname">First Name</label>
                    <input className="form-control"
                      type="text"
                      id="fname"
                      onChange={e => setUserState({ ...userState, fname: e.target.value })}
                      placeholder="First Name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="lname">Last Name</label>
                    <input className="form-control"
                      type="text"
                      id="lname"
                      onChange={e => setUserState({ ...userState, lname: e.target.value })}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="gender">Gender</label>
                    <input className="form-control"
                      type="text"
                      id="gender"
                      onChange={e => setUserState({ ...userState, gender: e.target.value })}
                      placeholder="Gender"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="bio">Bio</label>
                    <input className="form-control"
                      type="text"
                      id="bio"
                      onChange={e => setUserState({ ...userState, bio: e.target.value })}
                      placeholder="Bio"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="password">Password</label>
                    <input className="form-control"
                      type="password"
                      id="password"
                      onChange={e => setUserState({ ...userState, password: e.target.value })}
                      placeholder="Password"
                      required
                      name="pwd"
                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your password must be at least 8 characters long, contain letters and numbers, and must not contain spaces or emoji.
                    </small>
                  </div>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="form-row">
                  <div className="col my-2">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input className="form-control"
                      type="password"
                      id="confirm-password"
                      onChange={e => setUserState({ ...userState, password2: e.target.value })}
                      placeholder="Confirm Password"
                      required
                      name="pwd2"

                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                    {userState.password2 !== userState.password ? "Passwords do not match" : ""}
                    </small>
                    
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-danger btn-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

// One global state
const mapStateToProps = (state) => {
  return {
    isRegistered: state.registerReducer.isRegistered
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (userState, history) => {
      dispatch(RegisterAuthAction(userState, history))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);