import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import { createEventAction, deleteEventAction, getEventAction, getSports, getVenues, joinEventAction } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import DateTimePicker from 'react-datetime-picker';
import TokenService from "../services/TokenService";
import jwtDecode from "jwt-decode";
import { SKILL_TEXT } from "../constants/skillMapping";

function EventPage(props) {
	const { auth, eventData, getEventData, joinEvent, deleteEvent } = props
	const { eid } = useParams()
	const history = useHistory()


	const fetchEventData = async (eid) => {
		await getEventData(eid)
	}
	const displayFields = {
		"startDateTime": "Starting Date and Time",
		"endDateTime": "Ending Date and Time",
		"isPrivate": "Public/Private",
		"isFull": "Status",
		"skillMin": "Minimum Skill",
		"skillMax": "Maximum Skill",
		"details": "Instructions",
		"hostSkill": "Host Skill",
		"sport": "Sport",
		"host": "Host",
		"venue": "Venue",
		"venueStatus": "Venue Status",
		"playerMapEvents": "Players",
	}


	useEffect(() => {
		fetchEventData(eid)
	}, [])

	const handleSubmit = (e) => {

		// e.preventDefault()

		// if (formState.sport === "0" || formState.venue === "0") {
		//     console.log("Please select a sport or venue")
		//     return
		// }

		// createEvent(formState, history)


	}
	const handleDelete = (e) => {
		deleteEvent(eid, history)
	}

	const handleJoinEvent = (e) => {
		joinEvent(eid, history)
	}


	return (
		<>
			{!auth.isLoggedIn ? (
				history.push("/login")
					(<>
						<Header></Header>
						<Footer></Footer>
					</>)

			) :
				(<>
					<div>
						<Header ></Header>
						<section style={{ backgroundColor: "#eee" }}>
							<div className="container py-5">
								<div className="row">
									<div className="col-lg-4">
										<div className="card mb-4">
											<div className="card-body text-center">
												<img src="https://cdn.pixabay.com/photo/2016/05/16/21/07/football-1396740__340.jpg" alt="avatar"
													className="rounded-circle img-fluid" style={{ width: "150px" }} />
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="card mb-4">
											<div className="card-body">
												{eventData ? (
													Object.keys(eventData).filter(key => displayFields[key]).map((key, i) => (
														<div key={i}>
															<div className="row" >
																<div className="col-sm-3">
																	<p className="mb-0">{displayFields[key]}</p>
																</div>
																<div className="col-sm-9">
																	{
																		(function () {
																			switch (key) {
																				case "host":
																					return (<Link to={"/profile/" + eventData["host"]["user"]["id"]}>
																						<p className="text-muted mb-0">{eventData["host"]["user"]["username"]}</p>
																					</Link>)

																				case "playerMapEvents":
																					return <>
																						{eventData["playerMapEvents"].map((playerEvent) =>
																							<Link to={"/profile/" + playerEvent["player"]["user"]["id"]}>
																								<p className="text-muted mb-0">{playerEvent["player"]["user"]["username"] + (playerEvent["playerType"] === "R" ? '\u23F3' : '\u2705')}</p>
																							</Link>

																						)}
																					</>

																				case "sport":
																					return eventData[key]["name"]

																				case "venue":
																					return [eventData[key]["address"], eventData[key]["pincode"], eventData[key]["city"], eventData[key]["state"], eventData[key]["country"]].join(", ")

																				case "venueStatus":
																					return eventData[key]['status'] === "P" ? "Pending" : "Confirmed"

																				case "isPrivate":
																					return eventData[key] ? "Private" : "Public"

																				case "isFull":
																					return eventData[key] ? "Full" : "Not Full"

																				case "hostSkill":
																				case "skillMin":
																				case "skillMax":
																					return SKILL_TEXT[eventData[key]]

																				default:
																					return eventData[key]

																			}
																		})()

																	}

																</div>
															</div>
															<hr />
														</div>

													))
												) : (
													<div></div>
												)}
												<>
													{eventData ? (
														(jwtDecode(auth.user.access)["user_id"] === eventData["host"]["user"]["id"]) ? (
															<>
																<Link to={`/events/${eid}/edit`}>
																	<button className="btn btn-danger m-2">Edit</button>
																</Link>
																<button className="btn btn-danger m-2" onClick={e => handleDelete()}>Delete Event</button>

															</>
														) : ( (function (){
															let playerEvent = eventData["playerMapEvents"].find(playerEvent => playerEvent["player"]["user"]["id"] === jwtDecode(auth.user.access)["user_id"])
															if (playerEvent) 
																return (
																	<button className="btn btn-outline-danger m-2" disabled>{playerEvent.playerType === 'R' ? "Requested" : "Joined"}</button>
																)
	
																	else if (eventData["isFull"]) return (<button className="btn btn-outline-danger m-2" disabled>Event is full</button> )
															return (
																<button className="btn btn-danger m-2" onClick={handleJoinEvent}>Join</button>
															)
															
														}() )
														)
													) : (<></>)}
												</>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

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
		eventData: state.userReducer.eventPage
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getEventData: (eid) => {
			dispatch(getEventAction(eid))
		},
		joinEvent: (eid, history) => {
			dispatch(joinEventAction(eid, history))
		},
		deleteEvent: (eid, history) => {
			dispatch(deleteEventAction(eid, history))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EventPage);