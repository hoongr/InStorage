import React from "react";
import "./Listing.css";
import { Alert, Button } from "react-bootstrap";
import { Form, Col, Card, Row, Image } from "react-bootstrap";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import FirebaseManager from "../../api/routes/firebaseManager";
import "firebase/storage";
import "../../models/listing.js";
import { withAuthorization } from "../../Session";
import LocationSearchInput from "../Map/LocationSearchInput";
import ReactDependentScript from "react-dependent-script";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      userId: "",
      listingId: "",
      startDate: "",
      endDate: "",
      moveTime: "",
      needMover: false,
      showAlert: false,
      alertType: "",
      bookingAlertMessage: "",
      bookingAlertTitle: "",
      hostName: "",
      clientAddress: "",
      photo: "",
      photoKey: "",
      timeKey: "",
      addressKey: "",
      coordinates: "",
      inventoryString: "",
      profilePicture: "",
      hostAddress: "",
    };
  }

  componentDidMount() {
    const { auth } = this.props.firebase;
    console.log(auth.currentUser.uid);
    this.setState({ userId: auth.currentUser.uid });

    this.getListing(this.props.match.params.listingId);
  }

  change = e => {
    const target = e.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    console.log(name+" "+value)
    this.setState({
      [name]: value
    });
  };

  getUser(userId) {
    console.log("looking for user ", userId);
    FirebaseManager.getUserProfile(userId).then(user =>
      this.setState({
        hostName: user._name,
        profilePicture: user._profilePicURL
      })
    );
  }

  getListing(listingId) {
    const listing = FirebaseManager.getListing(listingId).then(
      listing => {
        console.log("yes, ", listing);
        this.setState({
          listing: listing
        });

        this.getUser(listing._hostUserID);
        this.state.hostAddress = this.state.listing._address.split(',');
        console.log(this.state.listing);
      }
    );
  }

  functionThatResetsTheFileInput() {
    let randomString = Math.random().toString(36);

    this.setState({
      photoKey: randomString,
      addressKey: randomString,
      timeKey: randomString
    });
  }

  onTimeChange = (time, timeString) => {
    this.setState({
      moveTime: timeString
    });
  };

  parseInventoryList = (inventoryString) => {
    var inventoryArr = inventoryString.split(',');
    return inventoryArr;
  }

  requestToBook = e => {
    e.preventDefault();
    const { photo } = this.state;
    const { storage } = this.props.firebase;
    const randomNum = Math.floor(Math.random() * 100000000000000);
    const uploadTask = storage
      .ref(`inventory/${randomNum}${photo.name}`)
      .put(photo, { contentType: photo.type });
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log("uploading");
      },
      error => {
        console.log(error);
        this.setState({
          showAlert: true,
          alertType: "danger",
          bookingAlertMessage: "Try again!",
          bookingAlertTitle: "Something went wrong",
          endDate: "",
          startDate: "",
          needMover: false,
          clientAddress: "",
          photoURL: "",
          inventoryString: "",
          startDateMoment: null,
          endDateMoment: null
        });
        this.functionThatResetsTheFileInput();
      },
      () => {
        this.setState({
          photoURL: `https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F${randomNum}${photo.name}?alt=media`
        });
        console.log(this.state.photoURL);
        const bookingRequest = {
          clientUserID: this.state.userId,
          dateEnd: this.state.endDate,
          dateStart: this.state.startDate,
          moveTime: this.state.moveTime,
          hostUserID: this.state.listing._hostUserID,
          listingID: this.props.match.params.listingId,
          needMover: this.state.needMover.toString(),
          requestState: "pending",
          clientAddress: this.state.clientAddress,
          hostAddress: this.state.listing._address,
          inventoryList: this.parseInventoryList(this.state.inventoryString),
          inventoryPhotoURL: this.state.photoURL
        }
        FirebaseManager.addBookingRequest(
          bookingRequest
        );
        this.setState({
          showAlert: true,
          alertType: "success",
          bookingAlertMessage:
            "You will receive an email when the host accepts or rejects your request. Sit tight!",
          bookingAlertTitle: "Request received",
          endDate: "",
          startDate: "",
          moveTime: "",
          needMover: false,
          clientAddress: "",
          coordinates: "",
          fullAddressInfo: "",
          photoURL: "",
          inventoryString: "",
          startDateMoment: null,
          endDateMoment: null
        });
        this.functionThatResetsTheFileInput();
      }
    );
  };

  render() {
    return (
      <ReactDependentScript
        loadingComponent={<div>map loading...</div>}
        scripts={[
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjOpk-lRnAG_ItuCpJDU8Bo5lgqUKhSr8&libraries=places"
        ]}
      >
        <div className="pb-4">
          <Alert
            show={this.state.showAlert}
            variant={this.state.alertType}
            className="alert-centered"
          >
            <Alert.Heading>{this.state.bookingAlertTitle}</Alert.Heading>
            <p>{this.state.bookingAlertMessage}</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  this.setState({ showAlert: false });
                  this.props.history.push('/home');
                  // window.location.reload();
                }}
                variant="outline-dark"
              >
                OK
              </Button>
            </div>
          </Alert>
          <div className="pic-wrapper">
            <img
              className="apt-pic"
              src={this.state.listing._photoURL}
              alt=""
            />
          </div>

          <div className="d-flex flex-row justify-content-center form-padding actual-content">
            <div className="apt-info">
              <div
                className="d-flex justify-between border-bottom border-dark col"
                style={{ padding: "10px" }}
              >
                <Col sm={8}>
                  <h2>
                    {this.state.hostAddress[0]}<br/>
                    {this.state.hostAddress[1]}<br/>
                    {this.state.hostAddress[2]}, {this.state.hostAddress[3]}
                  </h2>
                </Col>
                <Col sm={4}>
                  <Image
                    className="rounded-circle my-profile-pic"
                    style={{
                      objectFit: "cover",
                    }}
                    src={this.state.profilePicture}
                    alt=""
                    onClick={() => {
                      this.props.history.push("/user/" + this.state.listing._hostUserID);
                    }}
                  />
                  <h6 className="text-center pt-2">{this.state.hostName}</h6>
                </Col>
              </div>
              <div className="col" style={{ padding: "10px" }}>
                  <p>
                    <span className="custom-text">
                      Available Dates:
                    </span>
                    <span>
                      {this.state.listing._dateStartAvailable}
                      <span className="custom-text pl-1">
                        {" "}to
                      </span>
                      {this.state.listing._dateEndAvailable}
                    </span> 
                  </p>
                  <p>
                    <span className="custom-text">
                      Size of Space:
                    </span>
                    <span>
                      {this.state.listing._squareFootageEstimate} square feet
                    </span> 
                  </p>
                  <p>
                    <span className="custom-text">
                      Rental Price:
                    </span>
                    <span>
                      ${this.state.listing._rentalPrice} per week
                    </span> 
                  </p>
                  <button 
                    className="btn btn-sm"
                    style={{
                      background: "#7CC6FE",
                      color: "white",
                      width: "120px",
                    }} 
                    onClick={() => {
                      this.props.history.push("/user/" + this.state.listing._hostUserID);
                    }}
                  >
                    Contact Host
                  </button>
              </div>
            </div>

            <Form className="booking-form">
              <Form.Group className="mx25 mb1rem my-listing-date">
                <Form.Label>Enter your rental period</Form.Label>
                <DateRangePicker
                  startDate={this.state.startDateMoment}
                  startDateId="your_unique_start_date_id"
                  endDate={this.state.endDateMoment}
                  endDateId="your_unique_end_date_id"
                  isOutsideRange={(day) => {
                    if (this.state.focusedInput == "endDate") {
                      return day.isAfter(this.state.listing._dateEndAvailable) || day.isBefore(this.state.listing._dateStartAvailable);
                    }
                    if (this.state.focusedInput == "startDate") {
                      return day.isBefore(this.state.listing._dateStartAvailable) || day.isAfter(this.state.listing._dateEndAvailable);
                    }
                  }}
                  onDatesChange={({ startDate, endDate }) => {
                    this.setState({
                      startDateMoment: startDate,
                      endDateMoment: endDate,
                      startDate:
                        startDate === null
                          ? null
                          : startDate.toISOString().substr(0, 10),
                      endDate:
                        endDate === null
                          ? null
                          : endDate.toISOString().substr(0, 10)
                    });
                  }}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={focusedInput =>
                    this.setState({ focusedInput })
                  }
                />
              </Form.Group>
              <Form.Group className="mb1rem mx25 pick-up-time-input">
                <Form.Label>Enter your drop off time</Form.Label>
                <br />
                <TimePicker
                  onChange={this.onTimeChange}
                  use12Hours
                  size="large"
                  format="h:mm A"
                  className="time-picker"
                />
              </Form.Group>

              <Form.Group className="mx25 mb1rem my-location-search-input">
                <Form.Label>Enter your location</Form.Label>
                <br />
                <LocationSearchInput
                  placeHolder={"Enter your location"}
                  value={this.state.clientAddress}
                  onChange={(address, coordinates, fullInfo) =>
                    this.setState({
                      clientAddress: address,
                      coordinates: coordinates,
                      fullAddressInfo: fullInfo
                    })
                  }
                ></LocationSearchInput>
              </Form.Group>

              <Form.Group className="mx25 mb1rem" controlId="formBasicCheckbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                  checked={this.state.needMover}
                  onChange={() => {
                    this.setState({ needMover: !this.state.needMover });
                  }}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Need a mover? Costs $5/mile
                </label>
              </Form.Group>
              <Form.Group controlId="formInventoryList" className="mb1rem mx25">
                <Form.Label>List your inventory, separated by commas</Form.Label>
                <Form.Control
                  type="text"
                  name="inventoryString"
                  onChange={e => this.change(e)}/>
              </Form.Group>
              <Form.Group className="mb1rem mx25" controlId="photo">
                <Form.Label>Upload a photo of your packed items</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  key={this.state.photoKey || ""}
                  onChange={e => this.change(e)}
                />
              </Form.Group>
              <button
                type="button"
                className="btn btn-custom btn-lg mb1rem"
                onClick={e => this.requestToBook(e)}
              >
                Request to Book
              </button>
            </Form>
          </div>
        </div>
      </ReactDependentScript>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Listing);
