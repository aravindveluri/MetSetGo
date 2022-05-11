import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import { createEventAction, getEventAction, getEventsCatalogAction, getSports, getVenues, joinEventAction } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import DateTimePicker from 'react-datetime-picker';
import TokenService from "../services/TokenService";
import jwtDecode from "jwt-decode";
import { SKILL_TEXT } from "../constants/skillMapping";

function EventCatalog(props) {
	const { auth, userData, getEvents } = props
	const history = useHistory()


	const fetchEventData = async () => {
		await getEvents()
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
		fetchEventData()
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
									
									<div className="col-lg-12">
										<div className="card mb-4">
											{(userData && userData.events.length) ? userData.events.map((event, i) => {


												return (<div className="card text-center my-4" key={i}>
												<div className="card-header">
													{event.sport.name}
												</div>
												<div className="card-body">
													<h5 className="card-title">{`${new Date(event.startDateTime).toDateString().replace(' ', ', ')} - ${new Date(event.startDateTime).toLocaleTimeString()}`}</h5>
													<h5 className="card-title">{`${[event.venue.address, event.venue.pincode, event.venue.city, event.venue.state, event.venue.country].join(', ')}`}</h5>

													<p className="card-text mt-3 mb-0">
														Hosted by&nbsp;
														<span>
															<Link to={`/profile/${event.host.user.id}`}>{event.host.user.username}</Link>
														</span>
													</p>
													
													{event.hostSkill ? (<p className="card-text mt-0">
														Host skill {SKILL_TEXT[event.hostSkill]}
													</p>) : <p></p>}
													<Link to={`/events/${event.id}`}>
														<button className="btn btn-primary">View Event</button>
													</Link>
												</div>
												<div className="card-footer text-muted">
													{`${event.playerMapEvents.length} players going `}
												</div>
												<div className="card-footer text-muted">
													{event.isFull ? `Event is full!` : `Slots available!`}
												</div>
											</div>)

											}) : <></>}
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
		userData: state.userReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getEvents: () => {
			dispatch(getEventsCatalogAction())
		},
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EventCatalog);