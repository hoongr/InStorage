import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Image,
} from 'react-bootstrap';
import { withFirebase } from '../../Firebase';
import FirebaseManager from '../../api/routes/firebaseManager';

const MovingJobModal = (props) => {
  const {
    job,
    firebase,
    closeModal,
    showToast,
  } = props;

  const {
    _movingJobID,
    _moverID,
    _clientAddress,
    _hostAddress,
    _moveDate,
    _moveTime,
    _inventoryPhotoURL,
  } = job;

  const {
    auth
  } = firebase;

  const [showAlert, setShow] = useState(false);

  function formatAddress(address) {
    return address.split(",")[0]
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);

    return `${date.getMonth()+1}/${date.getDate()+1}`
  }

  function onHelpClick() {
    const moverId = auth.currentUser.uid;
    const res = FirebaseManager.acceptMovingJob(_movingJobID, moverId);
    res.then(() => {
      setShow(true);
    })
  }

  return (
    <Container>
      <style type="text/css">
        {`
        .btn-a {
          background-color: #7CC6FE;
          color: white;
        }

        `}
      </style>
      <Row style={{ marginBottom: '25px' }}>
        <Col xs={8} className="align-self-center">
          <Row style={{ fontSize: '24px' }}>
            {formatAddress(_clientAddress)} to {formatAddress(_hostAddress)}
          </Row>
          <Row style={{ fontSize: '18px' }}>
            {formatDate(_moveDate)} | {_moveTime}
          </Row>
        </Col>
        <Col xs={4} className="align-self-center">
          <Row className="justify-content-end">
            <Button
              variant="a"
              onClick={onHelpClick}
            >
              Help Out!
            </Button>
          </Row>
        </Col>
      </Row>
      {(showAlert) && (
        <Alert variant="success" onClose={() => setShow(false)}>
          <Alert.Heading>Thank you for your help!</Alert.Heading>
          You'll receive an email reminding you about the job when the date is approaching!
        </Alert>
      )
      }
    </Container>
  )
}

export default withFirebase(MovingJobModal);
