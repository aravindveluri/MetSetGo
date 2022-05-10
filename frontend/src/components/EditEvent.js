import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import { createEventAction, editEventAction, getEventAction, getSports, getVenues } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import DateTimePicker from 'react-datetime-picker';
import jwtDecode from "jwt-decode";
import { PLAYER_STATUS, STATUS_SHORT } from "../constants/statusMapping";
import { object } from "prop-types";
function EditEvent(props) {
  const { auth, userData, getSports, getVenues, getEventData, editEvent } = props
  // const DEFAULTHOURS = 2
  // const DEFAULTDELAYHOURS = 2
  // const DELAYMILLISECS = DEFAULTDELAYHOURS * 60 * 60 * 1000
  // const MILLISECS = DEFAULTHOURS * 60 * 60 * 1000
  const [formState, setFormState] = useState({playerMapEvents: []});
  const history = useHistory()
  const { eid } = useParams()
  
  const fetchFormData = async (eid) => {

      await getEventData(eid)
      await getSports()
      await getVenues()
  }
  useEffect(() => {
    fetchFormData(eid)
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault()
    
    if(formState.sport === "0" || formState.venue === "0") {
      console.log("Please select a sport or venue")
      return
    }

    const REQUIRED_ATTRIBUTES = {
      "sport": "",
      "venue": "",
      "startDateTime": "",
      "endDateTime": "",
      "hostSkill": "",
    }

    Object.keys(REQUIRED_ATTRIBUTES).map(key => {
      if (!formState[key]) {
        switch (key) {
          case "sport":
          case "venue":
            formState[key] = userData.eventPage[key].id
            break;
        
          case "startDateTime":
          case "endDateTime":
            formState[key] = new Date(userData.eventPage[key])
            break;

          default:
            formState[key] = userData.eventPage[key]
            break;
        }
      }
    })
    console.log(formState)
    editEvent(eid, formState, history)
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
        {
        
        userData.eventPage ? 
        (
          userData.eventPage.host.user.id === jwtDecode(auth.user.access).user_id ?
          (
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
                          <option defaultValue={userData.eventPage.sport.id} value={userData.eventPage.sport.id}>{userData.eventPage.sport.name}</option>
                          {userData.sports.length ? (
                            userData.sports.filter(sport => sport.id !== userData.eventPage.sport.id).map(sport => {
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
                        <option defaultValue={userData.eventPage.venue.id} value={userData.eventPage.venue.id}>{userData.eventPage.venue.address}</option>
                          {userData.venues.length ? (
                            userData.venues.filter(venue => venue.id !== userData.eventPage.venue.id).map(venue => {
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
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="public" defaultChecked={!userData.eventPage.isPrivate}/>
                          <label className="form-check-label" htmlFor="inlineRadio1"> Public</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="private" defaultChecked={userData.eventPage.isPrivate}/>
                          <label className="form-check-label" htmlFor="inlineRadio2">Private</label>
                        </div>                   
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-2">
                    <div className="form-row">
                      <div className="col my-2">
                        <label htmlFor="host-skill">Your Skill</label>
                        <select className="form-select" aria-label="host-skill select" onChange={e => setFormState({...formState, hostSkill: e.target.value})} defaultValue={userData.eventPage.hostSkill}>
                          <option value="0">None</option>
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
                        <select className="form-select" aria-label="min-skill select" onChange={e => setFormState({...formState, skillMin: e.target.value})} defaultValue={userData.eventPage.skillMin}>
                          <option value="0">None</option>
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
                        <select className="form-select" aria-label="max-skill select" onChange={e => setFormState({...formState, skillMax: e.target.value})} defaultValue={userData.eventPage.skillMax}>
                          <option value="0">None</option>
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
                    <textarea placeholder="Instructions such as bring your own equipment, vaccination mandatory, etc." className="form-control" id="details" rows="3" defaultValue={userData.eventPage.details} onChange={e => setFormState({...formState, details: e.target.value})}></textarea>
                  </div>
                  <div className="form-group my-2">
                    <div className="form-row">
                      <div className="col my-2 container p-0">
                        <label className="col-3">Start Datetime </label>
                        <DateTimePicker className="col-3" format="dd-MM-y @ h:mm:ss a" value={formState.startDateTime ? formState.startDateTime : new Date(userData.eventPage.startDateTime)} minDate={new Date(userData.eventPage.startDateTime)} onChange={e => setFormState({...formState, startDateTime: e})}></DateTimePicker>
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-2">
                    <div className="form-row">
                      <div className="col my-2 container p-0">
                      <label className="col-3">End Datetime </label>
                      <DateTimePicker className="col-3" format="dd-MM-y @ h:mm:ss a" value={formState.endDateTime ? formState.endDateTime : new Date(userData.eventPage.endDateTime)} minDate={new Date(userData.eventPage.endDateTime)} onChange={e => setFormState({...formState, endDateTime: e})}></DateTimePicker>
                      </div>
                    </div>
                  </div>
                  {userData ? userData.eventPage.playerMapEvents.map((playerEvent, i) => {
                    return (
                    <div className="form-group my-2" key={i}>
                      <div className="form-row">
                        <div className="col my-2">
                          <Link to={`/profile/${playerEvent.player.user.id}`}>
                            <label>{playerEvent.player.user.username}</label>
                          </Link>
                          <select className="form-select" onChange={e => {
                              let newState = formState
                              let found = false
                              for(let playerStatus of newState.playerMapEvents) {
                                if (playerStatus.id === playerEvent.player.id) {
                                  found = true
                                  playerStatus.status = e.target.value
                                }
                              }
                              if (!found) newState.playerMapEvents.push({
                                id: playerEvent.player.id,
                                status: e.target.value
                              })
                              setFormState(newState)
                          }} defaultValue={playerEvent.playerType}>
                            
                            {(
                            Object.keys(PLAYER_STATUS).map((status, j) => {
                              console.log(formState)
                                return (
                                  <option value={status} key={j}>{PLAYER_STATUS[status]}</option>
                                )
                              })
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    )
                  }) : (<></>)}
                  
                  <button type="submit" className="btn btn-danger btn-sm">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            </div>
          ) : 
          (
            history.push("/")
            (<>          <Header></Header>
            <Footer></Footer>
  </>)
          )
        ) : 
        (
          <></>
        )}
        
  
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
    getEventData: (eid) => {
      dispatch(getEventAction(eid))
    },
    getSports: () => {
      dispatch(getSports())
    },
    getVenues: () => {
      dispatch(getVenues())
    },
    editEvent: (eid, formState, history) => {
      dispatch(editEventAction(eid, formState, history))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);