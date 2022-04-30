import jwtDecode from "jwt-decode";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TokenService from "../services/TokenService";
import Footer from "./Footer";
import Header from "./Header";


function Home(props) {
  const { auth } = props;
  return (
    <div>
      <Header></Header>
      <div className="home-main">
              <div className="card text-center col-md-5 p-lg-2 mx-auto my-5">
                {/* <div className="card-header">
                  Featured
                </div> */}
                <div className="card-body">
                  <h5 className="card-title">Welcome To <span className="text-danger">MetSetGo!</span></h5>
                  <p className="card-text">Welcome you to MetSetGo, your singular destination for sports, fitness, fun and all things recreational. Time to get your lovable varsity jersey out and give your neighbour a shout or go challenge your colleague, better still make a new friend. Get Addicted to Play and create your own happily ever after!</p>
                  {auth.isLoggedIn ? (
                    <>
                    <Link to={"/"}>
                    <button className="btn btn-danger m-2">Create Event</button>
                    </Link>
                    <Link to={"/"}>
                    <button className="btn btn-danger m-2">View Events</button>
                    </Link>
                    <Link to={"/profile/" + TokenService.getUser().user_id}>
                    <button className="btn btn-danger m-2">Profile</button>
                    </Link>
                    <Link to={"/"}>
                    <button className="btn btn-danger m-2">Calendar</button>
                    </Link>
                    </>
                  ) : (
                    <>
                    <Link to={"/login"}>
                    <button className="btn btn-danger m-2">Login</button>
                    </Link>
                    <Link to={"/register"}>
                    <button className="btn btn-danger m-2">Sign Up</button>
                    </Link>

                    </>
                  )}
                  
                  
                  


                </div>
                {/* <div className="card-footer text-muted">
                  2 days ago
                </div> */}
              </div>
                    
        
        
      </div>
      <Footer></Footer>
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
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

