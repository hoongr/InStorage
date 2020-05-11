import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {
    withRouter
} from 'react-router-dom';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            coordinates: '',
            fullInfo: '',
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                this.setState({fullInfo: results});
                return getLatLng(results[0]);
            })
            .then((latLng, fullinfo) => {
                console.log('Success', latLng);
                this.setState({
                    address: address,
                    coordinates: latLng,
                });
                this.props.onChange(address, latLng, this.state.fullInfo);
            })
            .catch(error => console.error('Error', error));
    };

    resetAddress(){
        alert("clicked");
        this.setState({address: ""})
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                onSubmit={()=>this.setState({address: ""})}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        {(this.props.myLabel === undefined) ? null : (<span>{this.props.myLabel} &nbsp;</span>)}
                        <input
                            {...getInputProps({
                                placeholder: (this.props.placeHolder === undefined) ? 'Search Place' : this.props.placeHolder,
                                className: 'location-search-input mt-1',
                                id: (this.props.required === undefined) ? "" : this.props.id,
                                required: (this.props.required === undefined) ? false : this.props.required,
                            })}
                        />
                        <div>
                            <div className='autocomplete-dropdown-container'>
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default withRouter(LocationSearchInput);
