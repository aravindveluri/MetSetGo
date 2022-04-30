import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createEventAction, getSports, getVenues } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";

function CreateEvent(props) {
  const { auth, userData, getSports, getVenues, createEvent } = props
  
  const [formState, setFormState] = useState({});
  const history = useHistory()
  
  const fetchFormData = async () => {
      await getSports()
      await getVenues()
  }

  useEffect(() => {
    fetchFormData()
  }, [])

  const handleSubmit = () => {

  }


  return (
      <>
      { !auth.isLoggedIn ? (
          history.push("/login")
          (<>
          <Header></Header>
          <Footer></Footer>
          </>)
          
          ) : 
        (<>
          <div>
        <Header ></Header>
        <div className="sign-in-main">
          <div className="container d-flex">
            <div className="sign-in-container py-5 m-auto border">
              <form
                onSubmit={handleSubmit}
              >
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="sport">Sport</label>
                      <select className="form-select" aria-label="Sport select">
                        <option defaultValue={null}>Select Sport</option>
                        {userData.sports.length ? (
                          userData.sports.map(sport => {
                            return (
                              <option value={sport.id} key={sport.id}>{sport.name}</option>
                            )
                          })
                        ): (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="venue">Venue</label>
                      <select className="form-select" aria-label="Venue select">
                        <option defaultValue={null}>Select Venue</option>
                        {userData.venues.length ? (
                          userData.venues.map(venue => {
                            return (
                              <option value={venue.id} key={venue.id}>{venue.address}</option>
                            )
                          })
                        ): (
                          <></>
                        )}
                      </select>
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
          
        </>)
      }
      
      </>
   
  );
}

// One global state
const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    userData: state.userReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSports: () => {
      dispatch(getSports())
    },
    getVenues: () => {
      dispatch(getVenues())
    },

    createEvent: (formState, history) => {
      // dispatch(RegisterAuthAction(formState, history))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);