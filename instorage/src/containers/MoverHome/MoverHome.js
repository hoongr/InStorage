import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';
import { withAuthorization } from '../../Session';
import FirebaseManager from '../../api/routes/firebaseManager';
import JobCard from './JobCard';
import JobModal from './JobModal';

const MoverHome = ({firebase, history}) => {
  const [moverJobs , setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  function closeModal() {
    setShowJobModal(false);
  }

  function onClickJob(index) {
    setCurrentJob(moverJobs[index]);
    setShowJobModal(true);
  }

  useEffect(() => {
    const jobRes = FirebaseManager.getMovingJobsByMover(firebase.auth.currentUser.uid);
    const userRes = jobRes.then((jobs) => {
      return Promise.all(jobs.map(job => FirebaseManager.getUserProfile(job._clientID)))
    })
    const jobs = [];

    Promise.all([jobRes, userRes])
      .then(([resA, resB]) => {
        resA.forEach((job, i) => {
          const newJob = {
            ...job,
            clientName: resB[i]._name,
            profilePicture: resB[i]._profilePicURL,
          }
          jobs.push(newJob);
        });
        setJobs(jobs);
      })
  }, []);

  return (
    <div>
      <Modal
        centered
        size="lg"
        show={showJobModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <JobModal job={currentJob} />
        </Modal.Body>
      </Modal>
      <Container
        fluid
        style={{
          paddingTop: "25px",
          paddingRight: "100px",
          paddingLeft: "100px",
        }}
      >
        <style type="text/css">
          {`
          .btn-a {
            background-color: #7CC6FE;
            color: white;
          }

          .btn-a:hover { color: white }
          `}
        </style>
        <h1>My Jobs</h1>
        {(moverJobs.length > 0)
          ? (moverJobs.map((job, index) =>
            <JobCard
              index={index}
              key={job._movingJobID}
              job={job}
              onClick={onClickJob}
            />
            )
          )
          : (
            <Container style={{ marginTop: '100px' }}>
              <Row className="justify-content-center">
                <Button
                  variant='a'
                  onClick={() => history.push('/moverListings')}
                >
                  Browse Jobs
                </Button>
              </Row>
              <Row
                style={{ marginTop: '15px' }}
                className="justify-content-center"
              >
                You have no current jobs
              </Row>
            </Container>
          )

        }
      </Container>
    </div>
  );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(MoverHome);
