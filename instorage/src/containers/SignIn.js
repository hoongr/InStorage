import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  Form,
  Button,
  Container,
} from 'react-bootstrap';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const SignIn = (props) => {
  const { firebase, history } = props;
  const [values, setValues] = useState({email: '', password: ''})

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = () => {
    const { email, password } = values;
    firebase.doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push("/home")
      })
      .catch(error => console.log(error))
  }

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleSubmit();
    }
  }

  return (
    <div>
      <style type="text/css">
        {`
          .container {
            width: 50%;
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
        <h1>Sign In</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Form.Group>
          <Button
            variant="a"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

const SignInForm = compose(
  withFirebase,
  withRouter,
)(SignIn);

export default SignInPage;
