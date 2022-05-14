import { useEffect } from "react";
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import { getPlayerEventsAction } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import { SKILL_TEXT } from "../constants/skillMapping";

function PlayerEvents(props) {
	const { auth, userData, getPlayerEvents } = props
	const history = useHistory()
    const { uid } = useParams();

	const fetchPlayerEvents = async (uid) => {
		await getPlayerEvents(uid)
	}

	useEffect(() => {
		fetchPlayerEvents(uid)
	}, [])


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
                                <h1 className="text-center">Hosted</h1>
								<div className="row">								
									<div className="col-lg-12">
										<div className="card mb-4">
											{(userData && userData.playerEvents.hosted) ? userData.playerEvents.hosted.map((event, i) => {


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
                                <h1 className="text-center">Participated</h1>
								<div className="row">
									<div className="col-lg-12">
										<div className="card mb-4">
											{(userData && userData.playerEvents.participated) ? userData.playerEvents.participated.map((event, i) => {


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
		getPlayerEvents: (uid) => {
			dispatch(getPlayerEventsAction(uid))
		},
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerEvents);