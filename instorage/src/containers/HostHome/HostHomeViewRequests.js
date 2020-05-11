import React from 'react';
import './HostHome.css';
import FirebaseManager from "../../api/routes/firebaseManager";
import {Button, Modal, Alert, Image} from 'react-bootstrap';

class HostHomeViewRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingRequests: [],
            pageListing: [],
            showAlert: false,
            alertType: "",
            bookingAlertTitle: "",
            bookingAlertMessage: "",
            showModal: false,
            modalPhoto: ""
        };
    }

    componentDidMount() {
        this.setState({bookingRequests: this.props.location.state.bookingRequests}, () => {
            console.log("this.state.bookingRequests", this.state.bookingRequests);
            this.populateBooking();
        });
    }

    formatDate(isoDate) {
      const date = new Date(isoDate);

      return `${date.getMonth()+1}/${date.getDate()+1}`
    }

    handleAccept(bookingRequest, clientOfRequest) {
        FirebaseManager.acceptBookingRequest(bookingRequest._bookingID);
        FirebaseManager.acceptListing(bookingRequest._listingID);
        this.setState({
            bookingAlertMessage: "Do you want to put the rest of you rental periods to listing?",
            showAlert: true,
            alertType: "success",
            bookingAlertTitle: "Congratulations! You storage space will be rent to " + clientOfRequest._name + " from "
                + bookingRequest._dateStart.substr(0, 10) + " to " + bookingRequest._dateEnd.substr(0, 10) + ".",
        });
    }

    handleReject(bookingRequest) {
        FirebaseManager.rejectBookingRequest(bookingRequest._bookingID);
    }
    populateBooking() {
        var promiseArray = [];
        for (const bookingRequest of this.state.bookingRequests) {
            console.log(bookingRequest);
            promiseArray.push(new Promise((res1, rej1) => {
                    FirebaseManager.getUserProfile(bookingRequest._clientUserID).then((clientOfRequest) => {
                            console.log("client", clientOfRequest);
                            if (clientOfRequest !== null && clientOfRequest !== undefined) {
                                res1(
                                    <div key={bookingRequest._bookingID}
                                         className="row border-top my-row-listing align-items-center">
                                        <div className="col-1 align-self-center">
                                            <Image
                                              className="rounded-circle my-profile-pic"
                                              style={{ objectFit: "cover" }}
                                              src={clientOfRequest._profilePicURL}
                                              alt="me"
                                            />
                                        </div>
                                        <div className="col my-home-pending" style={{paddingLeft: "20px"}}>
                                            <div> {clientOfRequest._name} </div>
                                            <div className="fake-link" onClick={() => this.setState({ showModal: true,
                                            modalPhoto : bookingRequest._inventoryPhotoURL })}>View Inventory</div>
                                        </div>
                                        <div className="col-2 my-home-pending align-self-end" style={{textAlign: "center"}}>
                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="">
                                                    {this.formatDate(bookingRequest._dateStart)} - {this.formatDate(bookingRequest._dateEnd)}
                                                </div>
                                                <div className="">
                                                    <div className="row  justify-content-around">
                                                        <button type="button" className="btn btn-success"
                                                                onClick={(e) => this.handleAccept(bookingRequest, clientOfRequest, e)}>Accept
                                                        </button>

                                                        <button type="button" className="btn btn-danger"
                                                                onClick={(e) => this.handleReject(bookingRequest, e)}>Reject
                                                        </button>
                                                    </div>
                                                    {/*<div className="row  justify-content-end btn-group mr-4">*/}

                                                    {/*</div>*/}
                                                </div>

                                            </div>
                                            {/*<ButtonToolbar>*/}

                                            {/*</ButtonToolbar>*/}
                                        </div>
                                    </div>
                                );
                            } else {
                                res1(null);
                            }
                        }
                    );
                })
            );
        }
        Promise.all(promiseArray).then((val) => {
            this.setState({pageListing: val}, () => {
                console.log("this.state.pageListing", this.state.pageListing);
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.showModal && 
                <Modal.Dialog className='modal-centered'>
                    <Modal.Header closeButton onClick={() => this.setState({ showModal: false })}>
                        <Modal.Title>View Inventory</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <img className="inventory-modal-pic" src={this.state.modalPhoto}></img>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal: false })} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>}
                <Alert show={this.state.showAlert} variant={this.state.alertType} className="alert-centered">
                    <Alert.Heading>{this.state.bookingAlertTitle}</Alert.Heading>
                    <p>
                        {this.state.bookingAlertMessage}
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showAlert: false})} variant="outline-dark">
                            OK
                        </Button>
                    </div>
                </Alert>

                <div className="container" style={{marginTop: "30px", whiteSpace: "nowrap"}}>
                    <p className="my-home-address">Pending Requests</p>
                    {this.state.pageListing}
                </div>
            </div>
        )
    }
}

export default HostHomeViewRequests;
