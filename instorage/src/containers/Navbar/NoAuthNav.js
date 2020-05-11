import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';

const NoAuthNav = () => {
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
            to="/dashboard"
            style={{color:'white'}}
          >
            Listings
          </Nav.Link>
        </NavItem>
        <NavItem eventkey={2}>
          <Nav.Link
            as={Link}
            to="/register"
            style={{color:'white'}}
          >Register</Nav.Link>
        </NavItem>
        <NavItem eventkey={2}>
          <Nav.Link
            as={Link}
            to="/signin"
            style={{color:'white'}}
          >Sign In</Nav.Link>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default NoAuthNav;
