import React from 'react';
import { Link, withRouter } from "react-router-dom";
import logo from '../../images/logo.png';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { withFirebase } from '../../Firebase';


const AuthNav = ({ firebase, history }) => {
  var uid = firebase.auth.currentUser == null ? '' : firebase.auth.currentUser.uid;
  function signOut() {
    firebase.doSignOut()
    .then(() => {
      history.push('/');
      uid = '';
    })
  }

  return (
    <Navbar
      fixed="top"
      className="header justify-content-between"
    >
      <Navbar.Brand>
        <NavItem eventkey={1}>
          <Nav.Link
            as={Link}
            to="/"
            style={{color:'white'}}
            alt="InStorage"
          >
          InStorage
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          </Nav.Link>
        </NavItem>
      </Navbar.Brand>
      <Nav className="justify-content-end" activeKey="/home">
        <NavItem eventkey={1}>
          <Nav.Link
            as={Link}
            to="/home"
            style={{color:'white'}}
          >
            Home
          </Nav.Link>
        </NavItem>
        <NavItem eventkey={2}>
          <Nav.Link
            as={Link}
            to="/dashboard"
            style={{color:'white'}}
          >
            Listings
          </Nav.Link>
        </NavItem>
        <NavItem eventkey={3}>
          <Nav.Link
            as={Link}
            to="/inbox"
            style={{color:'white'}}
          >
            Messages
          </Nav.Link>
        </NavItem>
        <NavItem eventkey={4}>
          <Nav.Link
            as={Link}
            to={`/user/${uid}`}
            style={{color:'white'}}
          >Profile</Nav.Link>
        </NavItem>
        <Nav.Item>
          <Nav.Link
            style={{color:'white'}}
            onClick={signOut}
          >
            Sign Out
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </Navbar>
  )
}

export default withFirebase(withRouter(AuthNav));
