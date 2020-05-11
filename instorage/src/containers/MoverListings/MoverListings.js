import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// import FilterBar from './FilterBar';
import MovingJobsList from './MovingJobsList';
import FirebaseManager from "../../api/routes/firebaseManager";

const MoverListings = () => {
  return (
    <Container
      style={{ padding: "0px" }}
      fluid
    >
      <MovingJobsList />
    </Container>
  )
}

export default MoverListings;
