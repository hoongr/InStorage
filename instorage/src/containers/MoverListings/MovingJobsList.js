import React, { useState, useEffect} from 'react';
import {
  Container,
  Row,
  Col,
  Modal,
  Image,
} from 'react-bootstrap';
import MovingJob from './MovingJob';
import MovingJobModal from './MovingJobModal';
import MapContainer from "../Map/MapContainer";
import FirebaseManager from "../../api/routes/firebaseManager";

const MovingJobsList = () => {
  const [movingJobs, setMovingJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [lat, setLat] = useState(34.0689254);
  const [lng, setLng] = useState(-118.4473698)

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const res = FirebaseManager.getAllMovingJobs(pos.coords);

        res.then(movingJobs => setMovingJobs(movingJobs))
      });
    }
  }, []);

  function onJobClick(index) {
    setCurrentListing(movingJobs[index]);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function onViewClick(index) {
    setCurrentImage(movingJobs[index]._inventoryPhotoURL);
    setShowImageModal(true);
  }

  function closeImageModal() {
    setShowImageModal(false);
  }

  return (
    <Container
      fluid
    >
      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <MovingJobModal
            job={currentListing}
            closeModal={closeModal}
          />
        </Modal.Body>
      </Modal>
      <Modal
        centered
        size="lg"
        show={showImageModal}
        onHide={closeImageModal}
      >
        <Modal.Body>
          <Row className="justify-content-center">
            <Image fluid src={currentImage} />
          </Row>
        </Modal.Body>
      </Modal>
      <Row style={{ height: '100%' }}>
        <Col
          style={{
            height: '100%',
          }}
        >
          {(movingJobs.length > 0)
            ? (
              movingJobs.map(
                (movingJob, index) =>{
                  console.log(movingJob._clientAddress + " " + movingJob._distance);
                  return(<MovingJob
                    key={index}
                    index={index}
                    movingJob={movingJob}
                    onClick={onJobClick}
                    onViewClick={onViewClick}
                    changeLocation={(movingJob) => {
                      setLat(movingJob._coordinates[0]);
                      setLng(movingJob._coordinates[1]);
                    }}
                />)
              }
            ))
            : (
              <h5 className="pt-3">
                <div>
                  There are currently no moving jobs available.
                </div>
                <div className="pt-1">
                  Please check again later.
                </div>
              </h5>
            )
          }
        </Col>
        <Col>
          <Container
            fluid
            style={{
              position: 'fixed',
              width: '49%',
              height: '85%',
            }}
          >
              <MapContainer
                  currentLocation={{
                    lat: lat, 
                    lng: lng
                  }}
              ></MapContainer>
          </Container>
        </Col>
      </Row>


    </Container>
  );
}

export default MovingJobsList;
