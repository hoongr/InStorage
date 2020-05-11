import React from 'react';
import MapContainer from './MapContainer';
import { Button } from 'react-bootstrap';

class MapTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation:{
                lat: 34,
                lng: -118
            }
        };
    }

    onAClick = (props, button, e) => {
        console.log("clicking A...");
        if(navigator && navigator.geolocation){
          navigator.geolocation.getCurrentPosition((pos) => {
            const coord = pos.coords;
            this.setState({
              currentLocation:{
                lat: coord.latitude,
                lng: coord.longitude
              }
            });
            console.log("from MapTest: " + this.state.currentLocation.lat + " " + this.state.currentLocation.lng);
          })
        }
    }

    onBClick = (props, button, e) => {
        this.setState({
            currentLocation:{
                lat: 34,
                lng: -118.001
            }
        })
    }

    onCClick = (props, button, e) => {
        this.setState({
            currentLocation:{
                lat: 34,
                lng: -118
            }
        })
    }

    render(){
        const mapStyle = {
            width: '500px',
            height: '500px'
        };
        return(
            <div>
                <MapContainer
                    mapStyle = {mapStyle}
                    currentLocation = {this.state.currentLocation}
                />
                <Button onClick = {this.onAClick}>
                    Current Location
                </Button>
                <Button onClick = {this.onBClick}>Location A</Button>
                <Button onClick = {this.onCClick}>Location B</Button>
            </div>
        );
    }
}

export default MapTest;
