import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { withRouter } from 'react-router';
import LandingImage from '../images/landing_image.jpg';

const style = {
  backgroundImage: `url(${LandingImage})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '0px',
}

const LandingPage = ({history}) => {

  return (
    <div style={{'minHeight': "100%"}}>
      <style type="text/css">
        {`
        .btn-a {
          background-color: #7CC6FE;
          color: white;
        }

        .btn-a:hover { color: white }

        .btn-b {
          background-color: #FFA69E;
          color: white;
        }

        .btn-b:hover { color: white }

        h1 {
          font-size: 68px;
          color: white;
          font-weight: bold;
        }

        .logo {
          margin-top: 25%;
        }
        `}
      </style>
      <Container fluid style={style}>
        <Row className="justify-content-md-left">
          <Col xs={5}>
            <Row className="justify-content-md-center">
              <img className="logo" src="https://www.freelogodesign.org/file/app/client/thumb/c23bdf86-2018-4970-952e-55b1b2cdf7e4_200x200.png?1573688935013" alt=""/>
            </Row>
            <Row className="justify-content-md-center">
              <Button
                variant="a"
                className="landing-button"
                onClick={() => history.push('/dashboard')}
              >
                Browse Spaces
              </Button>
              <Button
                variant="b"
                className="landing-button"
                onClick={() => history.push('/register')}
              >Become a host</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(LandingPage);
