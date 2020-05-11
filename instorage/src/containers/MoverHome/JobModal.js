import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const JobModal = ({job}) => {
  const {
    _clientAddress,
    _hostAddress,
    clientName,
    _moveDate,
    _moveTime,
  } = job;

  function formatAddress(address) {
    return address.split(",")[0]
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);

    return `${date.getMonth()+1}/${date.getDate()+1}`
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row style={{ fontSize: "20px" }}>
            {formatAddress(_clientAddress)} to {formatAddress(_hostAddress)}
          </Row>
          <Row>
            Helping out {clientName}!
          </Row>
        </Col>
        <Col xs="auto">
          <Row
            style={{ fontSize: '20px' }}
            className="justify-content-end"
          >
            {formatDate(_moveDate)}
          </Row>
          <Row className="justify-content-end">
            {_moveTime}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default JobModal;
