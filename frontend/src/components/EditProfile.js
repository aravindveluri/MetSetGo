import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { editProfileAction, getUserProfile } from "../actions/userActions";
import Footer from "./Footer";
import Header from "./Header";
import jwtDecode from "jwt-decode";
function EditProfile(props) {


  const { auth, userData, getProfileInfo, editProfile} = props
  const [formState, setFormState] = useState({});
  const history = useHistory()
  const { uid } = useParams()


  const fetchFormData = async (uid) => {
    await getProfileInfo(uid)
  }
  useEffect(() => {
    fetchFormData(uid)
  }, [])

  const handleSubmit = (e) => {
    

    e.preventDefault()

    if (!formState["phone"]) formState["phone"] = userData.profileInfo.phone
    if (!formState["fname"]) formState["fname"] = userData.profileInfo.fname
    
    editProfile(uid, formState, history)



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
            {

              userData.profileInfo ?
                (
                  uid == jwtDecode(auth.user.access).user_id ?
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
                                    <label htmlFor="fname">First Name</label>
                                    <input className="form-control"
                                      type="text"
                                      id="fname"
                                      onChange={e => setFormState({ ...formState, fname: e.target.value })}
                                      placeholder="First Name"
                                      defaultValue={userData.profileInfo.fname}
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
                                      onChange={e => setFormState({ ...formState, lname: e.target.value })}
                                      placeholder="Last Name"
                                      defaultValue={userData.profileInfo.lname}
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
                                      onChange={e => setFormState({ ...formState, gender: e.target.value })}
                                      placeholder="Gender"
                                      defaultValue={userData.profileInfo.gender}
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
                                      onChange={e => setFormState({ ...formState, bio: e.target.value })}
                                      placeholder="Bio"
                                      defaultValue={userData.profileInfo.bio}
                                    />
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
    getProfileInfo: (uid, history) => {
      dispatch(getUserProfile(uid, history))
    },
    editProfile: (uid, formState, history) => {
      dispatch(editProfileAction(uid, formState, history))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);