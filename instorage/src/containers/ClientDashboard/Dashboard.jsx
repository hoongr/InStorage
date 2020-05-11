import React from 'react';
import './Dashboard.css';
import {withRouter} from "react-router-dom";
import { withAuthorization } from '../../Session';
import DashboardListing from './DashboardListing';
import FirebaseManager from "../../api/routes/firebaseManager";
import MoverListings from '../MoverListings/MoverListings';
import '../../models/listing.js';
import '../../models/bookingRequest.js';
import '../../models/userProfile.js';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import LocationSearchInput from "../Map/LocationSearchInput";
import ReactDependentScript from "react-dependent-script";
import MapContainer from "../Map/MapContainer";

// todo: 1. implement sort based on coordiates
// todo: 2. change address to title
// todo:finished 3. implement sort based on moment

const searchBoxStyle = () => ({
    field: {
        width: "200px",
    }
});

// var earthRadius = 6371;
//
// function calculateDistance(posA, posB) {
//     // posA = {
//     //     lat: posA[0],
//     //     lon: posA[1],
//     // }
//     // posB = {
//     //     lat: posB.lat,
//     //     lon: posB.lng,
//     // }
//     var lat = posB.lat-posA[0]; // Difference of latitude
//     var lon = posB.lng-posA[1]; // Difference of longitude
//
//     if (Math.abs(lat) <= 0.00001 && Math.abs(lon) <= 0.00001){
//         return 0;
//     }
//
//     var disLat = (lat*Math.PI*earthRadius)/180; // Vertical distance
//     var disLon = (lon*Math.PI*earthRadius)/180; // Horizontal distance
//
//     var ret = Math.pow(disLat, 2) + Math.pow(disLon, 2);
//     ret = Math.sqrt(ret); // Total distance (calculated by Pythagore: a^2 + b^2 = c^2)
//     // console.log(posA, listing.props.listing._listingID,posB, "ret", ret);
//     return Math.abs(ret);
//
//     // Now you have the total distance in the variable ret
// }

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        return Math.round(100 * dist) / 100;
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            dash_listings: [], // the content that's decicded to show by the filter
            listings: [], // the static content loaded from firebase
            // state information for filter
            coordinates: null,
            address: null,
            fullAddressInfo: null,
            startDate: null,
            endDate: null,
            startDateMoment: null,
            endDateMoment: null,
            minPrice: -1,
            maxPrice: -1,
            minDistance: -1,
            maxDistance: -1,
            minFoot: -1,
            maxFoot: -1,
            sortType: 0, // 0 stands for no sort, 1 stands for nearest, 2 stands for cheapest, 3 stands for largest storage
            pos: {
                lat: 34.0689254,
                lng: -118.4473698,
            },
            id: 0,
            price: 0,
        };
        this.places = [];
    }

    filterCondition(listing){
        // console.log("yes filter");
        // console.log(this.state);
        // console.log("minprice?", (this.state.minPrice === -1 || this.state.listings[i]._rentalPrice >= this.state.minPrice));
        // console.log("maxprice?", (this.state.maxPrice === -1 || this.state.listings[i]._rentalPrice <= this.state.maxPrice));
        // console.log("startdate?", this.state.listings[i]._dateStartAvailable, this.state.startDate, (this.state.startDate === null  || this.state.listings[i]._dateStartAvailable <= this.state.startDate));
        // console.log("enddate?", (this.state.endDate === null || this.state.listings[i]._dateEndAvailable >= this.state.endDate));
        var listingStartDate = new Date(listing._dateStartAvailable);
        var listingEndDate = new Date(listing._dateEndAvailable);
        var today = new Date;
        if( (listingEndDate >= today ) &&
            (this.state.minPrice === -1 || listing._rentalPrice >= this.state.minPrice) &&
            (this.state.maxPrice === -1 || listing._rentalPrice <= this.state.maxPrice) &&
            (this.state.startDate === null || listingStartDate <= this.state.startDate) &&
            (this.state.endDate === null || listingEndDate >= this.state.endDate) &&
            (this.state.minFoot === -1 || listing._squareFootageEstimate >= this.state.minFoot) &&
            (this.state.maxFoot === -1 || listing._squareFootageEstimate <= this.state.maxFoot) ) {
            return true;
        }
        return false;
    }

    populateListings() {
        var dash_listings = [];
        this.places = [];
        if (this.state.listings === null){
            console.log("no listing in the db！！");
            dash_listings.push(<p className="my-address-text"> Wait for someone to post a listing. </p>)
        }
        else{
            for (var i = 0; i < this.state.listings.length; i++) {
                // this.state.listings[i].distance="-"
                if (this.state.listings[i]._available === true && this.filterCondition(this.state.listings[i])){
                    dash_listings.push(
                        <DashboardListing
                            key={this.state.listings[i].listingID}
                            listing={this.state.listings[i]}
                            changeLocation={(listing)=>{
                                console.log("listing",listing);
                                this.setState({
                                    pos:{lat: listing._coordinates[0], lng: listing._coordinates[1]},
                                    id: listing._listingID,
                                    price: listing._rentalPrice,
                                });
                                // console.log("change hover", location);
                            }}
                        />);
                    // console.log(<DashboardListing key={this.state.listings[i].listingID} listing={this.state.listings[i]}/>);

                }
            }
            if (dash_listings.length === 0){
                console.log("no listing in the db");
                dash_listings.push(<p className="my-address-text"> Wait for someone to post a listing. </p>)
            }
            else{
                if (this.state.sortType === "1"){
                    if (this.state.coordinates === null){
                        alert("enter a valid position first");
                    }
                    else{
                        dash_listings.forEach((listing)=>{
                            listing.props.listing.distance = distance(listing.props.listing._coordinates[0], listing.props.listing._coordinates[1],
                                this.state.coordinates.lat, this.state.coordinates.lng)
                        });
                        dash_listings.sort((listing1, listing2) =>
                            {
                                // console.log(calculateDistance(listing1.props.listing._coordinates, this.state.coordinates), listing1.props.listing._address);
                                return listing1.props.listing.distance - listing2.props.listing.distance
                            }
                        )
                    }
                }
                else if (this.state.sortType === "2"){
                    dash_listings.sort((listing1, listing2) => {return listing1.props.listing._rentalPrice - listing2.props.listing._rentalPrice})
                }
                else if (this.state.sortType === "3"){
                    dash_listings.sort((listing1, listing2) => {return listing2.props.listing._squareFootageEstimate - listing1.props.listing._squareFootageEstimate})
                }
            }
        }
        this.setState({dash_listings: dash_listings}, ()=>{
            console.log("in populate", this.state.dash_listings);
        });
    }

    getUser = userId => {
        FirebaseManager.getUserProfile(userId)
            .then(user =>
                {
                    console.log(user)
                    this.setState({
                        userType : user._userType
                    })
                }
            );
    }

    componentDidMount() {
        const {
            firebase,
        } = this.props;

        if (firebase.auth.currentUser) {
            this.getUser(firebase.auth.currentUser.uid );
        }

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({pos:{lat: pos.coords.latitude, lng: pos.coords.longitude}});
                const listings = FirebaseManager.getAllListingsWithCoords(pos.coords);
                listings
                    .then(listings => {
                        this.setState({ listings: listings });
                    })
                    .then(() => this.populateListings());
                console.log("dashboard getting all listings!");
            });
            // const listings = FirebaseManager.getAllListingsWithCoords({latitude: 34.0689254, longitude: -118.4473698});
            // listings
            //     .then(listings => {
            //         this.setState({ listings: listings });
            //     })
            //     .then(() => this.populateListings());
            // console.log("dashboard getting all listings!");
        }
        /*const listings = FirebaseManager.getAllListings();
        listings.then(listings => {
            this.setState({listings: listings})
        }).then(() => this.populateListings());
        console.log("dashboard getting all listings!");*/
    }

    render() {
        if (this.state.userType == "mover") {
            return (
                <MoverListings />
            )
        }
        return (
            <ReactDependentScript loadingComponent={<div>map loading...</div>} scripts={["https://maps.googleapis.com/maps/api/js?key=AIzaSyAjOpk-lRnAG_ItuCpJDU8Bo5lgqUKhSr8&libraries=places"]}>

                <div className="">
                    <div className="d-flex flex_row align-center flex-nowrap filter-bar">
                        {/* <div className="my-location align-self-start">
                        <LocationSearchInput
                            myLabel={"Location"}
                            placeHolder={"Enter Your Location"}
                            value={this.state.address}
                            onChange={(address, coordinates, fullInfo) => this.setState({ address: address, coordinates: coordinates, fullAddressInfo: fullInfo})}
                        >
                        </LocationSearchInput>
                    </div> */}

                        <div className="mr10 align-self-start">
                            <span>Date &nbsp;</span>
                            <DateRangePicker startDate={this.state.startDateMoment} startDateId="your_unique_start_date_id" endDate={this.state.endDateMoment} endDateId="your_unique_end_date_id"
                                             onDatesChange={({startDate, endDate}) => this.setState({
                                                 startDateMoment: startDate,
                                                 endDateMoment: endDate,
                                                 startDate: (startDate === null) ? null : new Date(startDate.toISOString().substr(0,10)),
                                                 endDate: (endDate === null) ? null : new Date(endDate.toISOString().substr(0,10)),
                                             })} focusedInput={this.state.focusedInput}
                                             onFocusChange={focusedInput => this.setState({focusedInput})}
                            />
                        </div>

                        <div className="my-price">
                            <span>Price &nbsp;</span>
                            <input className="my-box" type="text" placeholder="$" onChange={(evt) => {
                                this.setState({minPrice: evt.target.value,});
                            }}/>
                            <span> ~ </span>
                            <input className="my-box" type="text" placeholder="$" onChange={(evt) => {
                                this.setState({maxPrice: evt.target.value,});
                            }}/>
                        </div>

                        <div className="my-space">
                            <span>Space &nbsp;</span>
                            <input className="my-box" type="text" placeholder="SqFt" onChange={(evt) => {
                                this.setState({minFoot: evt.target.value,});
                            }}/>
                            <span> ~ </span>
                            <input className="my-box" type="text" placeholder="SqFt" onChange={(evt) => {
                                this.setState({maxFoot: evt.target.value,});
                            }}/>
                        </div>

                        <div className="my-address col">
                            <span>Distance &nbsp;</span>
                            <input className="my-box" type="text" placeholder="Mile" onChange={(evt) => {
                                this.setState({minDistance: evt.target.value,});
                            }}/>
                            <span> ~ </span>
                            <input className="my-box" type="text" placeholder="Mile" onChange={(evt) => {
                                this.setState({maxDistance: evt.target.value,});
                            }}/>
                        </div>

                        <div className="m-auto float-right" style={{marginTop: "25px"}}>
                            <div className="bootstrap-option-button">
                                <select className="my-select" value={this.state.sortType} onChange={(evt) => {
                                    // console.log(evt.target.value);
                                    this.setState({sortType: evt.target.value,});
                                }}>
                                    <option selected >Sort by
                                    </option>
                                    <option value="1">Nearest first</option>
                                    <option value="2">Cheapest first</option>
                                    <option value="3">Largest Storage first</option>
                                </select>
                            </div>
                        </div>

                        &nbsp;

                        <div className="m-auto float-right" style={{marginTop: "15px"}}>
                            <div className="bootstrap-option-button">
                                <button className="btn btn-success" onClick={() => {
                                    console.log(this.state);
                                    this.populateListings();
                                }}>Apply Filter
                                </button>
                            </div>
                        </div>

                        &nbsp;

                        <div className="m-auto float-right" style={{marginTop: "15px"}}>
                            <div className="bootstrap-option-button">
                                <button className="btn btn-danger" onClick={() => {
                                    this.setState({
                                        startDate: null,
                                        endDate: null,
                                        minPrice: -1,
                                        maxPrice: -1,
                                        minDistance: -1,
                                        maxDistance: -1,
                                        minFoot: -1,
                                        maxFoot: -1,
                                        address: '',
                                        sortType: 0, // 0 stands for no sort, 1 stands for nearest, 2 stands for cheapest, 3 stands for largest storage
                                    });
                                    this.populateListings();
                                    window.location.reload();
                                }}>Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="dash-content">
                        <div className="listing-content">
                            <div className="listing-wrapper">
                                {this.state.dash_listings}
                            </div>

                            {/*<div>*/}
                            {/*    <MapContainer currentLocation={{lat: this.state.pos.lat, lng: this.state.pos.lng}}></MapContainer>*/}
                            {/*</div>*/}

                            <div className="map-wrapper">
                                <div className="map-box">
                                    {/*<iframe title="Map" width="100%" height="100%" scrolling="no"*/}
                                    {/*        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAjOpk-lRnAG_ItuCpJDU8Bo5lgqUKhSr8&q=UCLA,Los+Angeles,CA">*/}
                                    {/*</iframe>*/}
                                    <MapContainer
                                        currentLocation={{lat: this.state.pos.lat, lng: this.state.pos.lng}}
                                        id={this.state.id}
                                        price={this.state.price}
                                    ></MapContainer>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactDependentScript>
        )
    }
}

const condition = () => true;
export default withAuthorization(condition)(withRouter(Dashboard));
