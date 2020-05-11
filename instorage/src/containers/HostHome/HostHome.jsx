import React from 'react';
import './HostHome.css';
import FirebaseManager from "../../api/routes/firebaseManager";
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withAuthorization } from '../../Session';

class HostHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostListings: [],
            bookingRequests: [],
            confirmedListings: [],
            pendingRequests: [],
            hostId: ''
        }
    }

    componentDidMount() {
  		const { auth } = this.props.firebase;
  		console.log('blah', auth.currentUser.uid);
  		this.setState({ hostId : auth.currentUser.uid })
  		this.getHostListings( auth.currentUser.uid );
    }

    formatDate(isoDate) {
      const date = new Date(isoDate);

      return `${date.getMonth()+1}/${date.getDate()+1}`
    }

    formatAddress(address) {
      return address.split(",")[0]
    }

    getHostListings = hostId => {
        FirebaseManager.originalGetUserListings(hostId).
        then(listings => {
            this.setState({hostListings: listings})
        }).
        then(()=>{
                FirebaseManager.getHostBookingRequests(hostId).
                then(bookingRequests => {
                    this.setState({bookingRequests: bookingRequests})
                }).
                then(()=>{
                    console.log("this.state.hostlistings", this.state.hostListings);
                    console.log("this.state.booking", this.state.bookingRequests);
                    this.getConfirmedListings();
                    this.getPendingRequests();
                }).then(()=>{
                    console.log("this.state.confirmedListings", this.state.confirmedListings);
                    console.log("this.state.pendingRequests",this.state.pendingRequests);
                })
            }
        )
    }



    // componentDidMount() {
        // if(navigator && navigator.geolocation){
        //     navigator.geolocation.getCurrentPosition((pos) => {
        //         FirebaseManager.getUserListings(this.props.match.params.hostId, pos.coords).
        //         then(listings => {
        //             this.setState({hostListings: listings})
        //         }).
        //         then(()=>{
        //             FirebaseManager.getHostBookingRequests(this.props.match.params.hostId).
        //             then(bookingRequests => {
        //                 this.setState({bookingRequests: bookingRequests})
        //             }).
        //             then(()=>{
        //                 console.log("this.state.hostlistings", this.state.hostListings);
        //                 console.log("this.state.booking", this.state.bookingRequests);
        //                 this.getConfirmedListings();
        //                 console.log("this.state.confirmedListings", this.state.confirmedListings);
        //                 })
        //             }
        //         )
        //     })
        // }
        // FirebaseManager.originalGetUserListings(this.props.match.params.hostId).
        // then(listings => {
        //     this.setState({hostListings: listings})
        // }).
        // then(()=>{
        //         FirebaseManager.getHostBookingRequests(this.props.match.params.hostId).
        //         then(bookingRequests => {
        //             this.setState({bookingRequests: bookingRequests})
        //         }).
        //         then(()=>{
        //             console.log("this.state.hostlistings", this.state.hostListings);
        //             console.log("this.state.booking", this.state.bookingRequests);
        //             this.getConfirmedListings();
        //             this.getPendingRequests();
        //         }).then(()=>{
        //             console.log("this.state.confirmedListings", this.state.confirmedListings);
        //             console.log("this.state.pendingRequests",this.state.pendingRequests);
        //         })
        //     }
        // )
    // }

    findBookingOfListing(listing) {
        for (var bookingRequest of this.state.bookingRequests) {
            if (bookingRequest._listingID === listing._listingID && bookingRequest._requestState === "accepted") {
                return bookingRequest;
            }
        }
        return null;
    }

    getConfirmedListings() {
        var promiseArray = [];
        // iterate over each listing
        for (const listing of this.state.hostListings) {
            promiseArray.push(new Promise((res2, rej2) => {
                // if this listing has been booked
                if (listing.available == false) {
                    // find the booking request
                    var requestToListing = this.findBookingOfListing(listing);
                    if (requestToListing === null) {
                        console.error("confirmed listing", listing, "has no corresponding booking requests");
                        res2(null);
                    } else {
                        // find the client of the booking request
                        FirebaseManager.getUserProfile(requestToListing._clientUserID).then((clientOfRequest) => {
                                console.log("client", clientOfRequest);
                                const entry =
                                    (<div className="row border-top my-row-listing">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            <img className="d-flex align-self-start my-img"
                                                 src={listing._photoURL}
                                                 alt="place"
                                            />
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 align-self-center">
                                            <p className="my-home-address"> {this.formatAddress(listing.address)} </p>
                                            <p className="my-home-name fake-link" onClick={() => this.props.history.push(`/user/${clientOfRequest._userID}`)}> Hosting for {clientOfRequest._name}</p>
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 align-self-center"
                                             style={{textAlign: "end"}}>
                                            <p className="my-home-address">{this.formatDate(requestToListing._dateStart)} - {this.formatDate(requestToListing._dateEnd)}</p>
                                            <p className="my-home-name">${listing.rentalPrice}</p>
                                        </div>
                                    </div>)
                                res2(entry);
                            }
                        ).catch(error => {
                            console.log(error);
                            res2(null);
                        });
                    }
                }
                else{
                    res2(null);
                }
            }))
        }
        Promise.all(promiseArray).then((val) => {
            // console.log("inner level", val);
            this.setState({confirmedListings: val})
            return val;
        }).catch((err) => {
            console.log(err);
        });
    }

    getPendingRequests() {
        var pendingRequests = [];
        this.state.hostListings.forEach(listing => {
            console.log("yes");
                var requestsToListing = [];
                this.state.bookingRequests.forEach(bookingRequest => {
                        if (bookingRequest.listingID === listing.listingID) {
                            requestsToListing.push(bookingRequest);
                        }
                    }
                );

                if (listing.available === true) {
                    pendingRequests.push(
                        <div className="row border-top my-row-listing">
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <img className="d-flex align-self-start my-img"
                                     src={listing._photoURL}
                                     alt="place"
                                />
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 align-self-center">
                                <p className="my-home-address">{listing.address}</p>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 align-self-center"
                                 style={{textAlign: "end"}}>
                                {this.getButton(requestsToListing, listing)}
                            </div>
                        </div>
                    );
                }
            }
        )
        this.setState({pendingRequests: pendingRequests});
    }

    getButton(requestsToListing, listing) {
        if (requestsToListing.length === 0) {
            return (<button type="button" className="btn btn-secondary">No Requests</button>);
        } else {
            return (
                <div>
                    <button type="button" className="btn btn-success" onClick={() => {
                        this.props.history.push({
                            pathname: '/hostviewrequests/' + listing.listingID,
                            state: {bookingRequests: requestsToListing}
                        })
                    }}> View Requests
                    </button>
                    <p className="my-home-pending"> {requestsToListing.length} Pending</p>
                </div>
            );
        }
    }

    handleDisplayNothing(items, type){
        if(items.length === 0 || items.every((ele) => {return ele === null;})){
            if (type === 0){
                return (
                    <div className="row border-top my-row-listing">
                        <p className="my-home-address" style={{marginLeft: "20px"}}> You have no confirmed listings yet. </p>
                    </div>
                )
            }
            else {
                return (
                    <div className="row border-top my-row-listing">
                        <p className="my-home-address" style={{marginLeft: "20px"}}> You have no pending requests
                            yet. </p>
                    </div>
                )
            }
        }
        return items;
    }

    render() {
        return (
            <div>
                <div className="flex_row container justify-between" style={{marginTop: "30px"}}>

                    <p className="my-title"> Confirmed Listings</p>
                    <Button size="sm" className="h40px" onClick={() => this.props.history.push('/addListing')} variant="outline-dark">
                            Add a listing
                    </Button>
                </div>
                <div className="container">
                    {this.handleDisplayNothing(this.state.confirmedListings, 0)}

                </div>


                <div className="container" style={{marginTop: "70px"}}>
                    <p className="my-title"> Pending Requests</p>
                    {this.state.pendingRequests}
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(withRouter(HostHome));
