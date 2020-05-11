import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import Avatar from '../../images/avatar.png';

function formatDate(isoDate) {
  const date = new Date(isoDate);

  return `${date.getMonth()+1}/${date.getDate()+1}`
}

const JobCard = (props) => {
  const {
    job,
    onClick,
    index,
  } = props;

  return (
    <Container
      fluid
      style={{
        cursor: "pointer",
        height: "auto",
        marginTop: '25px',
        marginBottom: '25px',
        borderBottom: '1px solid black',
      }}
      onClick={() => onClick(index)}
    >
      <Row
        style={{
          paddingLeft: '10px',
          paddingRight: '10px',
          marginBottom: '25px',
        }}
        className="justify-content-between"
      >
        <Col>
          <Row>
            <Image
              style={{
                height: "100px",
                width: "100px",
                marginRight: "25px",
                objectFit: "cover",
              }}
              roundedCircle
              src={job.profilePicture} />
              <Col className="align-self-center">
                <Row style={{ fontSize: "24px" }}>
                  {job._clientAddress}
                </Row>
                <Row>
                  Helping out {job.clientName}!
                </Row>
              </Col>
          </Row>
        </Col>
        <Col
          xs="auto"
          className="align-self-center"
        >
          <Row
            style={{ fontSize: '24px' }}
            className="justify-content-end"
          >
            {formatDate(job._moveDate)}
          </Row>
          <Row className="justify-content-end">
            {job._moveTime}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default JobCard;
