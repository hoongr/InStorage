import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const MovingJob = (props) => {
  const {
    index,
    movingJob,
    onClick,
    onViewClick,
    changeLocation
  } = props;

  const {
    _moveDate,
    _moveTime,
    _inventoryPhotoURL,
    _hostAddress,
    _clientAddress,
    _distance
  } = movingJob;

  function  formatDate(isoDate) {
    const date = new Date(isoDate);

    return `${date.getMonth()+1}/${date.getDate()+1}`
  }

  function onLinkClick(e, index) {
    e.stopPropagation();
    onViewClick(index);
  }

  return (
    <Container
      style={{
        cursor: "pointer",
        height: 'auto',
        padding: '50px',
        borderBottom: "1px solid black",
      }}
      onClick={() => onClick(index)}
      onMouseOver={() =>{changeLocation(movingJob)}}
    >
      <style type="text/css">
        {`
          .btn-link:hover {
            color: #007bff !important;
          }
        `}
      </style>
      <Row className="justify-content-between">
        <Col className="align-self-center">
          <Row style={{ fontSize: '24px' }}>
            {_clientAddress}
          </Row>
          <Row style={{ fontSize: '20px' }}>
            <Button
              variant="link"
              onClick={(e) => onLinkClick(e, index)}
              style={{ padding: "0px", fontSize: "20px" }}
            >
              View Items
            </Button>
          </Row>
        </Col>
        <Col className="align-self-center">
          <Row style={{ fontSize: '28px' }} className="justify-content-end">
            {formatDate(_moveDate)}
          </Row>
          <Row style={{ fontSize: '20px' }} className="justify-content-end">
            {_moveTime}
          </Row>
          <Row style={{ fontSize: '20px' }} className="justify-content-end">
            {_distance} mi
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MovingJob;
