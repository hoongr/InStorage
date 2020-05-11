import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import FirebaseManager from "../../api/routes/firebaseManager";

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.mapElement = React.createRef();
        this.state = {
            showingInfoWindow: true,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            currentLocation: props.currentLocation,
            price: props.price
        }
        console.log("from MapContainer: " + props.currentLocation.lat + " " + props.currentLocation.lng);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentLocation !== this.state.currentLocation) {
            this.setState({
                currentLocation: nextProps.currentLocation,
                price: nextProps.price,
            });
            console.log("update!");
            console.log("from MapContainer: " + this.props.currentLocation.lat + " " + this.props.currentLocation.lng);
        }
    }

    onMarkerClick = (props, marker, e) => {
        console.log("Marker!")
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onRecenterClick = (props, button, e) => {
        console.log("recentering...");
        this.mapElement.current.recenterMap();
    }

    onDrawCircleClick = (props, button, e) => {
        console.log("drawing circle...");

    }

    render() {
        return (
            <Container fluid>
                <Map
                    ref={this.mapElement}
                    google={this.props.google}
                    zoom={17}
                    style={this.props.mapStyle}
                    initialCenter={this.state.currentLocation}
                    center={this.state.currentLocation}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={"$" + this.state.price}
                        position={this.state.currentLocation}
                    />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>
            </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCr7xu38TladvOmO6ornfKdqxItaecO5Fs'
})(MapContainer);
