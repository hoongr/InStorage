import React from 'react';
import { withAuthorization } from '../Session';
import { Row, Card, Col } from 'react-bootstrap';
import FirebaseManager from "../api/routes/firebaseManager";
import EmailManager from "../api/routes/emailManager";
import '../models/userProfile.js';
import { withRouter } from 'react-router-dom';

import ReactDependentScript from "react-dependent-script";
import StarRatings from 'react-star-ratings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      profile: {},
      userId: "",
      fullName: "",
      venmo: "",
      phoneNum: "",
      college: "",
      bio: "",
      userType: "",
      averageRating: '',
      profilePicURL: '',
    });
  }

  componentDidMount() {
    const { auth } = this.props.firebase;
    console.log(auth.currentUser.uid);
    this.getUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.getUser(this.props.match.params.userId);
    }
  }

  getUser = userId => {
    FirebaseManager.getUserProfile(userId)
      .then(user =>
        {
          console.log(user)
          this.setState({
            profile: user,
        })
          if(typeof this.state.profile._profilePicURL === "undefined") {
            console.log("undefined pp")
            this.setState({
              profile: {
                ...this.state.profile,
                _profilePicURL: "https://cutecatsinhats-x7v0etsjgzjvirs3.netdna-ssl.com/wp-content/uploads/2016/01/Nala-the-cat-shark-hat.jpg" 
              }
            })
          }
      }
      );
  }

  render() {
    return(
      <ReactDependentScript loadingComponent={<div>icons loading...</div>} scripts={["https://use.fontawesome.com/releases/v5.11.2/js/all.js"]}>
        <div>
          <style type="text/css">
            {`
              .text-style {
                font-size: 14px;
                font-weight: bolder;
              }

              .msg-btn {
                background-color: #7CC6FE;
                color: white;
                width: 160px;
              }

              .text-box {
                width: 400px;
                margin: auto;
                font-size: 18px;
              }

              .custom-padding {
                padding-right: 35px;
              }
            `}
          </style>
          <Row className="justify-content-md-center pt-5">
            <img src={this.state.profile._profilePicURL} className="circle-profile-pic cropped-pic"/>
          </Row>
          <Row className="justify-content-md-center pt-2">
            <div className="text-center">
              <h2>{this.state.profile._name}</h2>
              <div>
                {
                  (this.state.profile._userType === 'host' || this.state.profile._userType === 'mover') && 
                  this.state.profile._averageRating !== -1 &&
                  <Row className="justify-content-md-center pb-3">
                    <StarRatings 
                      rating={this.state.profile._averageRating} 
                      starRatedColor="#274060" 
                      numberOfStars={5}
                      starDimension="25px"
                    />
                    <h5 className="pl-3">{this.state.profile._averageRating} out of 5</h5>
                  </Row>
                }
                {
                  (this.state.profile._userType === 'host' || this.state.profile._userType === 'mover') && 
                  this.state.profile._averageRating == -1 &&
                  <Row className="justify-content-md-center pb-3">
                    <StarRatings 
                      rating={0} 
                      starRatedColor="#274060" 
                      numberOfStars={5}
                      starDimension="25px"
                    />
                    <h5 className="pl-3">No Ratings</h5>
                  </Row>
                }
              </div>
              <button className="btn msg-btn btn-sm" onClick={() => {
                        this.props.history.push('/chat/' + this.state.profile._userID)}}>
                Message
              </button>
              <Row className="justify-content-md-center pt-4">
                <i class="fa fa-graduation-cap fa-2x"></i>
                <h5 className="pl-2 custom-padding">{this.state.profile._college}</h5>
                <i class="fa fa-phone fa-flip-horizontal fa-2x"></i>
                <h5 className="pl-2 custom-padding">{this.state.profile._phoneNum}</h5>
                <i class="fab fa-vimeo fa-2x"></i>
                <h5 className="pl-2">@{this.state.profile._venmo}</h5>
              </Row>
              <div className="text-box pt-3 pb-5">{this.state.profile._bio}</div>
            </div>
          </Row>
        </div>
      </ReactDependentScript>
    )
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(withRouter(Profile));