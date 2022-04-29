import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, email, password, password2, fname, lname, phone, gender, bio);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>

        <div>
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            id="fname"
            onChange={e => setFname(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            id="lname"
            onChange={e => setLname(e.target.value)}
            placeholder="Last name"
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            onChange={e => setGender(e.target.value)}
            placeholder="Gender"
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            onChange={e => setBio(e.target.value)}
            placeholder="Bio"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        <button>Register</button>
      </form>
    </section>
  );
}

export default Register;