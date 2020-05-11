import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Container,
  Button,
  Row,
  Col,
} from 'react-bootstrap';

import { withAuthorization } from '../../Session';
import ListingCard from './ListingCard';
import FirebaseManager from "../../api/routes/firebaseManager";


const ClientHome = ({history, firebase}) => {
  const [listings, setListings] = useState([]);
  const [pendingListings, setPending] = useState([]);
  const [confirmedListings, setConfirmed] = useState([]);

  useEffect(() => {
    const res = FirebaseManager.getClientBookingRequests(firebase.auth.currentUser.uid);

    res.then(listings => {
      setListings(listings)
      setPending(listings.filter(listing => listing._requestState == "pending"))
      setConfirmed(listings.filter(listing => listing._requestState == "accepted"))
    })
  }, []);

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <style type="text/css">
        {`
          .btn-a {
            background-color: #FFA69E;
            color: white;
          }

          .btn-a:hover { color: white }
        `}
      </style>
      <h1>My Bookings</h1>
      {(confirmedListings.length > 0)
        ? (
          <Row className="justify-content-md-left">
            {confirmedListings.map(
              (listing) => (
                <Col key={listing._bookingID} style={{ paddingLeft: '0px' }} xs={4}>
                  <ListingCard listing={listing} />
                </Col>
              ))}
          </Row>
        )
        : (
          <Container>
            <Row className="justify-content-md-center">
              <div>You have no current bookings</div>
            </Row>
            <Row className="justify-content-md-center">
              <Button
                style={{ marginTop: '15px' }}
                variant="a"
                onClick={() => history.push('/Dashboard')}
              >
                Browse Listings
              </Button>
            </Row>
          </Container>
        )
      }
      <h1 style={{ marginTop: '50px' }}>Pending Requests</h1>
      {(pendingListings.length > 0)
        ? (
          <Row className="justify-content-md-left">
            {pendingListings.map(
              (listing) => (
                <Col key={listing._bookingID} style={{ paddingLeft: '0px' }} xs={4}>
                  <ListingCard listing={listing} />
                </Col>
              ))}
          </Row>
        )
        : (
          <Container>
            <Row className="justify-content-md-center">
              <div>You have no pending requests</div>
            </Row>
          </Container>
        )
      }
    </Container>
  );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(withRouter(ClientHome));
