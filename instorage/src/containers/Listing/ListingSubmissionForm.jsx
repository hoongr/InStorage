import React, { useState } from "react";
import { Form, Col, Card, Row } from "react-bootstrap";
import "./ListingForm.css";
import { withAuthorization } from "../../Session";
import FirebaseManager from "../../api/routes/firebaseManager";
import "firebase/storage";
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './ListingSubmissionForm.css'
import LocationSearchInput from "../Map/LocationSearchInput";
import ReactDependentScript from "react-dependent-script";

class ListingSubmissionForm extends React.Component {
  state = {
    address: "",
    price: "",
    footage: "",
    startDate: "",
    endDate: "",
    photoUrl: "",
    userId: "",
    photo: null,
    // photoUrl: "",
    photoKey: "",
    // listing: {
    //   address: "",
    //   rentalPrice: "",
    //   squareFootageEstimate: "",
    //   dateStartAvailable: "",
    //   dateEndAvailable: "",
    //   photoURL: "",
    //   hostUserID: "",
    // },
    validated: false,
  };

  componentDidMount() {
    const { auth } = this.props.firebase;
    console.log(auth.currentUser.uid);
    this.setState({ 
      userId: auth.currentUser.uid 
    });
  }

  addListing = () => {
    console.log("called");
    const listing = {
      address: this.state.address,
      available: true,
      dateEndAvailable: this.state.endDate,
      dateStartAvailable: this.state.startDate,
      hostUserID: this.state.userId,
      rentalPrice: this.state.price,
      squareFootageEstimate: this.state.footage,
      photoURL: this.state.photoUrl
    }
    return FirebaseManager.addListing(
      listing
    );
  };

  change = e => {
    //console.log("change");
    const target = e.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  functionThatResetsTheFileInput() {
    let randomString = Math.random().toString(36);

    this.setState({
      photoKey: randomString
    });
  }

  handleSubmit = e => {
    // Input validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("invalid");
      e.preventDefault();
      e.stopPropagation();
      console.log(this.state);
      this.formValidation();
      this.setState({ validated: true })
      return;
    }
    else {
      console.log("valid");
      this.setState({ validated: true })
    }

    e.preventDefault();
    // Just logs fields to console
    console.log(this.state);
    const { photo } = this.state;
    const { storage } = this.props.firebase;
    const randomNum = Math.floor(Math.random() * 100000000000000);
    const uploadTask = storage
      .ref(`listings/${randomNum}${photo.name}`)
      .put(photo, { contentType: photo.type });
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log("uploading");
      },
      error => {
        console.log(error);
      },
      () => {
        this.setState({
          photoUrl: `https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F${randomNum}${photo.name}?alt=media`
        });
        // console.log(this.state.photoUrl);
        this.addListing().then(() => {
          this.setState({
            // listing: {},
            address: null,
            price: "",
            footage: "",
            startDate: "",
            endDate: "",
            photo: null,
            photoUrl: "",
            startDateMoment: null,
            endDateMoment: null,
          });
          this.functionThatResetsTheFileInput();
          this.props.history.push("/home");
        });
        // window.location.reload();
      }
    );
  };

  formValidation() {
    var address_input = document.getElementById("address-id");
    if (!address_input.checkValidity()) {
      var x = document.createElement("STYLE");
      var t = document.createTextNode(".my-submission-form-location .location-search-input:invalid {border-color: #CC2200;}");
      var y = document.createTextNode(".my-submission-form-location .location-search-input:valid {border-color: #0BB002;}");
      x.appendChild(t);
      x.appendChild(y);
      document.getElementById("address-id").appendChild(x);
    }

    if (this.state.startDate == "") {
      var x = document.createElement("STYLE");
      var t = document.createTextNode(".my-submission-form-date #start_date_id:invalid {border-color: #CC2200;}");
      var y = document.createTextNode(".my-submission-form-date #start_date_id:valid {border-color: #0BB002;}");
      x.appendChild(t);
      x.appendChild(y);
      document.getElementById("start_date_id").appendChild(x);
    }

    if (this.state.endDate == "") {
      var x = document.createElement("STYLE");
      var t = document.createTextNode(".my-submission-form-date #end_date_id:invalid {border-color: #CC2200;}");
      var y = document.createTextNode(".my-submission-form-date #end_date_id:valid {border-color: #0BB002;}");
      x.appendChild(t);
      x.appendChild(y);
      document.getElementById("end_date_id").appendChild(x);
    }

    var footageMsg = "";
    var footageInput = document.getElementById("footage").validity;
    if (footageInput.valueMissing) {
      footageMsg = "Estimated footage of space is required.";
    }
    else if (footageInput.patternMismatch) {
      footageMsg = "Estimated footage must be a number.";
    }
    document.getElementById("footageError").innerHTML = footageMsg;

    var priceMsg = "";
    var priceInput = document.getElementById("price").validity;
    if (priceInput.valueMissing) {
      priceMsg = "Price is required.";
    }
    else if (priceInput.patternMismatch) {
      priceMsg = "Price must be a number.";
    }
    document.getElementById("priceError").innerHTML = priceMsg;
  }

  render() {
    return (
        <ReactDependentScript loadingComponent={<div>map loading...</div>} scripts={["https://maps.googleapis.com/maps/api/js?key=AIzaSyAjOpk-lRnAG_ItuCpJDU8Bo5lgqUKhSr8&libraries=places"]}>
        <div>
        <h1 className="title">List Your Space</h1>
        <Row className="justify-content-md-center">
          <Card className="card-container">
            <Card.Body>
              <Form className="form-padding" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="address" className="my-submission-form-location">
                    <LocationSearchInput
                        myLabel={"Address"}
                        placeHolder={"Enter Your Storage Location"}
                        value={this.state.address}
                        onChange={(address, coordinates, fullInfo) => this.setState({ 
                          address: address,
                          coordinates: coordinates, 
                          fullAddressInfo: fullInfo})}
                        required={true}
                        id={"address-id"}
                    >
                    </LocationSearchInput>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-1">             
                  <Form.Group as={Col} controlId="price">
                    <Form.Label className="mb-3">Rental Price per Week</Form.Label>
                    <Form.Control
                      name="price"
                      value={this.state.price}
                      onChange={e => this.change(e)}
                      required
                      pattern="\d+"
                    />
                    <Form.Control.Feedback type="invalid">
                      {<p id="priceError"></p>}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="footage">
                    <Form.Label className="mb-3">Estimated Square Footage</Form.Label>
                    <Form.Control
                      name="footage"
                      value={this.state.footage}
                      onChange={e => this.change(e)}
                      required
                      pattern="\d+"
                    />
                    <Form.Control.Feedback type="invalid">
                      {<p id="footageError"></p>}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-1">
                  <Form.Group as={Col} controlId="Date" className="my-submission-form-date">
                    <Form.Label>Rental Period</Form.Label>
                    <br/>
                    <DateRangePicker 
                      startDate={this.state.startDateMoment} 
                      startDateId="start_date_id" 
                      endDate={this.state.endDateMoment} 
                      endDateId="end_date_id"
                      onDatesChange={({startDate, endDate}) => this.setState({
                                      startDateMoment: startDate,
                                      endDateMoment: endDate,
                                      startDate: (startDate === null) ? null : startDate.toISOString().substr(0,10),
                                      endDate: (endDate === null) ? null : endDate.toISOString().substr(0,10),
                                    })} 
                      focusedInput={this.state.focusedInput}
                      onFocusChange={focusedInput => this.setState({focusedInput})}
                      required={true}
                      block={true}
                    />
                    <div className="invalid-feedback">
                      Rental period is required.
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} className="my-submission-form-photo">
                    <Form.Label className="mb-2">Upload a Photo</Form.Label>
                    <Form.Control
                        type="file"
                        name="photo"
                        key={this.state.photoKey || ""}
                        onChange={e => this.change(e)}
                        required
                        id="photo" 
                    />
                    <Form.Control.Feedback type="invalid">
                      Photo of space is required.
                    </Form.Control.Feedback>
                  </Form.Group>    
                </Form.Row>

                <button
                  type="submit"
                  className="btn btn-custom btn-lg"
                >
                  Post
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </div>
        </ReactDependentScript>

    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(ListingSubmissionForm);
