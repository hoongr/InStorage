import React from 'react';
import {withRouter} from "react-router-dom";
import FirebaseManager from "../api/routes/firebaseManager";
import StarsRating from 'stars-rating';
import StarRatingComponent from 'react-star-rating-component';
import './Rating.css';
import {Alert, Button, Modal} from "react-bootstrap";
import { Redirect } from 'react-router-dom';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            userid: this.props.match.params.userId,
            bookingRequestId: this.props.match.params.bookingRequestId,
            profile: {
                _name: "Null",
                _profilePicURL: "https://cutecatsinhats-x7v0etsjgzjvirs3.netdna-ssl.com/wp-content/uploads/2016/01/Nala-the-cat-shark-hat.jpg",
            },
            showAlert: false,
            alertType: "success",
            redirect: false,
            showModal: false,
            inventoryList: []
        };
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    componentDidMount() {
        FirebaseManager.getUserProfile(this.state.userid).then((profile) => {
                this.setState({profile: profile});
                if (this.state.profile._profilePicURL === undefined || this.state.profile._profilePicURL === null) {
                    this.state.profile._profilePicURL = "https://cutecatsinhats-x7v0etsjgzjvirs3.netdna-ssl.com/wp-content/uploads/2016/01/Nala-the-cat-shark-hat.jpg"
                }
                console.log(this.state.profile);
            }
        ).catch((err) => {
                console.error(err);
            }
        );
    }

    getInventoryList() {
        FirebaseManager.getBookingRequestByID(this.state.bookingRequestId).then(br => {
            console.log(br._inventoryList)
            var inventory = br._inventoryList;
            inventory = Object.keys(br._inventoryList).map(k => br._inventoryList[k]);
            this.setState({ inventoryList : inventory })
            this.formatInventoryList(inventory)
        })
    }

    formatInventoryList(list) {
        var newList = []
        list.forEach(i => 
            newList.push(<ul>{i}</ul>)
        )

        this.setState({inventoryList : newList})
    }

    populateStar() {
        var title = ["Overall", "Safety", "Punctuality", "Helpfulness"];
        var stack = [];
        title.forEach((title) => {
            stack.push(
                <div className="d-flex justify-content-between">
                    <div className={"align-self-center"}>{title}</div>
                    <div style={{fontSize: "50px"}}>
                        <StarRatingComponent
                            name={title}
                            starCount={5}
                            onStarClick={(e) => {
                                this.setState({score: e + this.state.score})
                            }}
                        />
                    </div>
                </div>
            );
        })
        return stack;
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Alert
                    show={this.state.showAlert}
                    variant={this.state.alertType}
                    className="alert-centered"
                >
                    <Alert.Heading>{"Thank You! Your feedback has been recorded!"}</Alert.Heading>
                    <div className="d-flex justify-content-center">
                        <Button
                            onClick={this.setRedirect}
                            variant="outline-dark"
                        >
                            Return To Home
                        </Button>
                    </div>
                </Alert>

                {this.state.showModal && <Modal.Dialog className='modal-centered'>
                    <Modal.Header closeButton onClick={() => this.setState({ showModal: false })}>
                        <Modal.Title>Your inventory list</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>{this.state.inventoryList}</div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal: false })} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>}

                <div className="flex_col, justify-center" style={{
                    width: "500px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    whiteSpace: 'nowrap',
                    fontFamily: '',
                    fontSize: '30px',
                    fontWeight: '600',
                }}>
                    <div className="d-flex justify-content-center" style={{margin: "20px"}}>
                        <p>Rate your storage experience with</p>
                    </div>

                    <div className="d-flex justify-content-center" style={{marginTop: "20px"}}>
                        <img className="circle-profile-pic" src={this.state.profile._profilePicURL} alt="me"/>
                    </div>

                    <div className="mb1rem d-flex justify-content-center">
                        {this.state.profile._name}
                    </div>
                    <Button className="mb1rem w100 d-flex justify-content-center" variant="outline-primary" onClick={() => {
                        this.getInventoryList();
                        this.setState({ showModal: true })
                    }}>Check your inventory here</Button>
                    <hr/>
                    {this.populateStar()}
                    <div className={"d-flex justify-content-end"}>
                        <button type="button" className="btn btn-primary" style={{marginTop: "10px"}} onClick={() => {
                            console.log(this.state.userid, this.state.score / 4);
                            FirebaseManager.updateUserRating(this.state.userid, this.state.score / 4);
                            this.setState({score: 0, showAlert: true});
                            this.populateStar();
                        }}>Submit feedback
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Rating);
