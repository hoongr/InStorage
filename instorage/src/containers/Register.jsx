import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  Form,
  Button,
  Container,
} from 'react-bootstrap';
import FirebaseManager from "../api/routes/firebaseManager";

const RegisterPage = () => (
  <div>
    <RegisterForm />
  </div>
);

const Register = (props) => {
  const { firebase, history } = props;
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    venmo: '',
    college: '',
    biography: '',
    userType: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("invalid");
      e.preventDefault();
      e.stopPropagation();
      validateInput();
      setValidated(true);
      return;
    }
    else {
      console.log("valid");
      setValidated(true);
    }

    e.preventDefault();
    const {
      fullName,
      email,
      password,
      phone,
      venmo,
      college,
      biography,
      photo,
      userType
    } = values;

    firebase.doCreateUserWithEmailAndPassword(email, password)
      .then((res) => {
        const {storage} = firebase;
        const randomNum = Math.floor(Math.random() * 100000000000000);
        const uploadTask = storage
          .ref(`users/${randomNum}${photo.name}`)
          .put(photo, { contentType: photo.type });
        uploadTask.on(
          "state_changed",
          snapshot => {
            console.log("uploading");
          },
          error => {
            console.log(error);
          },
          () => {
            var photoURL = `https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F${randomNum}${photo.name}?alt=media`
            var newUserType = userType.toLowerCase();
            if(newUserType === 'renter') newUserType = 'client';
            console.log(userType, "+ ", newUserType)

            console.log(photoURL);
            const userProfile = {
              bio: biography,
              college: college,
              name: fullName,
              phoneNum: phone,
              userID: res.user.uid,
              venmo: venmo,
              email: email,
              userType: newUserType,
              profilePicURL: photoURL
            }
            FirebaseManager.addUserProfile(userProfile).then(res => history.push("/dashboard"));
          });
        })
      //.then(res => history.push("/dashboard"))
      .catch(error => console.log(error));
  }

  function validateInput() {
    var emailMsg = "";
    var emailInput = document.getElementById("formBasicEmail").validity;
    if (emailInput.valueMissing) {
      emailMsg = "Email is required.";
    }
    else if (emailInput.patternMismatch) {
      emailMsg = "You must enter a valid .edu email.";
    }
    document.getElementById("emailError").innerHTML = emailMsg;

    var phoneMsg = "";
    var phoneInput = document.getElementById("formBasicPhone").validity;
    if (phoneInput.valueMissing) {
      phoneMsg = "Phone number is required.";
    }
    else if (phoneInput.patternMismatch) {
      phoneMsg = "Phone number must follow the format (123) 456-7890 or 123-456-7890";
    }
    document.getElementById("phoneError").innerHTML = phoneMsg;

    var passMsg = "";
    var passInput = document.getElementById("formBasicPassword").validity;
    if (passInput.valueMissing) {
      passMsg = "Password is required.";
    }
    else if (passInput.tooShort) {
      passMsg = "Password must have a minimum length of 8.";
    }
    document.getElementById("passError").innerHTML = passMsg;
  }

  return (
    <div>
      <style type="text/css">
        {`
          .container {
            width: 50%;
            margin-bottom: 25px;
          }

          h1 {
            margin-top: 25px;
          }

          .btn-a {
            background-color: #FFA69E;
            color: white;
          }

          .btn-a:hover {
            color: white;
          }
        `}
      </style>
      <Container>
        <h1>Sign Up</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={values.fullName}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Full name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleInputChange}
              required
              pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$"
            />
            <Form.Control.Feedback type="invalid">
              {<p id="emailError"></p>}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInputChange}
              required
              minlength="8"
            />
            <Form.Control.Feedback type="invalid">
              {<p id="passError"></p>}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formUserType">
            <Form.Label>User Type</Form.Label>
            <Form.Control 
              as="select"
              type="userType"
              name="userType"
              className="custom-select"
              value={values.userType}
              onChange={handleInputChange}
              required
            >
              <option value="">Pick a user type</option>
              <option>Renter</option>
              <option>Host</option>
              <option>Mover</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              A user type is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phone"
              name="phone"
              placeholder="Enter phone number"
              value={values.phone}
              onChange={handleInputChange}
              required
              pattern="^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{1}[0-9]{3}[-\s]{1}[0-9]{4}$"
            />
            <Form.Control.Feedback type="invalid">
              {<p id="phoneError"></p>}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicVenmo">
            <Form.Label>Venmo Handle</Form.Label>
            <Form.Control
              type="venmo"
              name="venmo"
              placeholder="Enter your Venmo handle"
              value={values.venmo}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              A Venmo handle is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicCollege">
            <Form.Label>College</Form.Label>
            <Form.Control
              type="college"
              name="college"
              placeholder="Enter your college"
              value={values.college}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              A college is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Give a quick description of yourself"
              name="biography"
              value={values.biography}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.Label>Upload a Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              A profile picture is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="a" className="mb-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

const RegisterForm = compose(
  withFirebase,
  withRouter,
)(Register);

export default RegisterPage;
