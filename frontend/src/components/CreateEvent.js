import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createEventAction, getSports, getVenues } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import DateTimePicker from 'react-datetime-picker';

function CreateEvent(props) {
  const { auth, userData, getSports, getVenues, createEvent } = props
  const DEFAULTHOURS = 2
  const DEFAULTDELAYHOURS = 2
  const DELAYMILLISECS = DEFAULTDELAYHOURS * 60 * 60 * 1000
  const MILLISECS = DEFAULTHOURS * 60 * 60 * 1000
  const [formState, setFormState] = useState({
    "startDateTime": new Date((new Date().getTime() + DELAYMILLISECS)), 
    "endDateTime": new Date((new Date().getTime() + DELAYMILLISECS + MILLISECS)),
    "isPrivate": false,
    "hostSkill": "0",
    "skillMin": "0",
    "skillMax": "0",
    "details": "",
    "sport": "0",
    "venue": "0",
  });
  const history = useHistory()
  
  
  const fetchFormData = async () => {
      await getSports()
      await getVenues()
  }

  useEffect(() => {
    fetchFormData()
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault()
    
    if(formState.sport === "0" || formState.venue === "0") {
      
      return
    }
    
    createEvent(formState, history)
    

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
                onSubmit={e => handleSubmit(e)}
              >
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="sport">Sport</label>
                      <select className="form-select" aria-label="Sport select" onChange={e => setFormState({...formState, sport: e.target.value})}>
                        <option defaultValue={0} value={0}>Select Sport</option>
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
                      <select className="form-select" aria-label="Venue select" onChange={e => setFormState({...formState, venue: e.target.value})}>
                        <option defaultValue={0} value={0}>Select Venue</option>
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
                <div className="form-group my-2">
                  <div className="form-row">
                    <div>Event Type</div>
                    <div className="col my-2" onChange={e => setFormState({...formState, isPrivate: (e.target.value === "private")})}>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="public" defaultChecked/>
                        <label className="form-check-label" htmlFor="inlineRadio1"> Public</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="private"/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Private</label>
                      </div>                   
                    </div>
                  </div>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="host-skill">Your Skill</label>
                      <select className="form-select" aria-label="host-skill select" onChange={e => setFormState({...formState, hostSkill: e.target.value})}>
                        <option defaultValue="0" value="0">None</option>
                        <option value="1">Beginner</option>
                        <option value="2">Amateur</option>
                        <option value="3">Intermediate</option>
                        <option value="4">Advanced</option>
                        <option value="5">Professional</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="min-skill">Minimum Skill Required</label>
                      <select className="form-select" aria-label="min-skill select" onChange={e => setFormState({...formState, skillMin: e.target.value})}>
                        <option defaultValue="0" value="0">None</option>
                        <option value="1">Beginner</option>
                        <option value="2">Amateur</option>
                        <option value="3">Intermediate</option>
                        <option value="4">Advanced</option>
                        <option value="5">Professional</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2">
                      <label htmlFor="max-skill">Maximum Skill Required</label>
                      <select className="form-select" aria-label="max-skill select" onChange={e => setFormState({...formState, skillMax: e.target.value})}>
                        <option defaultValue="0" value="0">None</option>
                        <option value="1">Beginner</option>
                        <option value="2">Amateur</option>
                        <option value="3">Intermediate</option>
                        <option value="4">Advanced</option>
                        <option value="5">Professional</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="details">Instructions</label>
                  <textarea placeholder="Instructions such as bring your own equipment, vaccination mandatory, etc." className="form-control" id="details" rows="3" onChange={e => setFormState({...formState, details: e.target.value})}></textarea>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2 container p-0">
                      <label className="col-3">Start Datetime </label>
                      <DateTimePicker className="col-3" format="dd-MM-y @ h:mm:ss a" value={formState.startDateTime} minDate={new Date()} onChange={e => setFormState({...formState, startDateTime: e})}></DateTimePicker>
                    </div>
                  </div>
                </div>
                <div className="form-group my-2">
                  <div className="form-row">
                    <div className="col my-2 container p-0">
                    <label className="col-3">End Datetime </label>
                      <DateTimePicker className="col-3" format="dd-MM-y @ h:mm:ss a" value={formState.endDateTime} minDate={new Date()} onChange={e => setFormState({...formState, endDateTime: e})}></DateTimePicker>
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
      dispatch(createEventAction(formState, history))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);