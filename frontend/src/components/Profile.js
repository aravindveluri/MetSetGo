import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Profile(props)  {

    const { uid } = useParams();
    const {profile, getProfileInfo} = props
    const history = useHistory()
    const displayFields = {
        'fname': "First Name",
        'lname': "Last Name",
        'phone': "Phone",
        'gender': "Gender",
        'bio': "Bio",
    }
    const userProfile = async (uid, history) => {
        await getProfileInfo(uid, history)
    }

    useEffect(() => {
        userProfile(uid, history)
    }, [])
    

    return (
        <Fragment>
            <Header></Header>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                    {profile ? (<h5 className="my-3">{profile.fname + " " + profile.lname}</h5>) : (<h5 className="my-3"></h5>)}
                                    {profile ? (<p className="text-muted mb-3">{profile.bio}</p>) : (<p className="text-muted mb-3"></p>)}
                                    {/* <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">Follow</button>
                                        <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    {profile ? (
                                        Object.keys(profile).filter(key => displayFields[key]).map((key, i) => (
                                            <div key={i}>
                                                <div className="row" >
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">{displayFields[key]}</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{profile[key]}</p>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </div>
                                        
                                        ))
                                    ) : (
                                        <div></div>
                                    )}

                                    {profile ? (profile.user ? (
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">View Events</button>
                                    </div>
                                )
                                     : (<div></div>)): (<div></div>)}                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.userReducer.profileInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProfileInfo: (uid, history) => {
            dispatch(getUserProfile(uid, history))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);

