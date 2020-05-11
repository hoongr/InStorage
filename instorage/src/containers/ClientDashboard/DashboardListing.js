import React from 'react';
import {
    withRouter
} from 'react-router-dom'

const DashboardListing = (props) => {
    const {listing, history, changeLocation} = props;

    function formatDate(isoDate) {
      const date = new Date(isoDate);

      return `${date.getMonth()+1}/${date.getDate()+1}`
    }

    return (
        <div className="each-listing"
             onClick={() => {
                 history.push('/viewListing/' + listing.listingID)
             }}
             onMouseOver={()=>{changeLocation(listing)}}
        >
            <div className="each-listing-image">
                <img className="d-flex align-self-start"
                     src={listing._photoURL}
                     alt="place"
                />
            </div>
            <div className="each-listing-body d-flex flex-column">
                <div className="my-address-text float-left"> {listing.address} </div>
                <div className="d-flex flex-column align-bottom mt-auto">
                    <div
                      className="my-price-text float-left"
                      style={{
                        alignAlign: "start",
                        fontSize: "20px",
                      }}
                    >
                      {formatDate(listing.dateStartAvailable)} - {formatDate(listing.dateEndAvailable)}
                    </div>
                    <div className="d-flex flew-row my-price-text align-bottom justify-content-between">
                        <div >{listing.distance} miles</div>
                        <div> {listing.squareFootageEstimate} Sq ft ∙ ${listing.rentalPrice}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(DashboardListing);
