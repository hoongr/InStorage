import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ListingCard = (props) => {
  const { listing } = props;
  console.log('listing', listing);
  const {
    _hostAddress,
    _dateEnd,
    _dateStart,
    _inventoryPhotoURL,
    _hostUserID,
  } = listing;

  function formatDate(isoDate) {
    const date = new Date(isoDate);

    return `${date.getMonth()+1}/${date.getDate()+1}`
  }

  function formatAddress(address) {
    return address.split(",")[0]
  }

  return (
  	<div className="pb-5">
	  <style type="text/css">
	    {`
	      .profile-btn {
	        background-color: #7CC6FE;
	        color: white;
	        width: 130px;
	      }
	    `}
      </style>
	  <Card 
	    style={{ 
	      background: "#274060",
	      border: "none",
	    }}
	  >
	    <Card.Img style={{height: "300px", objectFit: "cover"}} variant="top" src={_inventoryPhotoURL} />
	    <Card.Body>
	      <Card.Text >
	        <div>
	      	  <span
		        style={{
		    	  color: "white",
		          fontSize: "18px",
		      	}}
		      >
	            {formatAddress(_hostAddress)}
	          </span>
	          <span className="float-right">
		        <button className="btn profile-btn btn-md" onClick={() => {props.history.push('/user/' + _hostUserID)}}>
			      Contact Host
			    </button>
			  </span>
	        </div>
	        <div
	          style={{
	      	    color: "white",
	      	    fontSize: "14px",
	      	  }}
	      	>
	          {formatDate(_dateStart)} - {formatDate(_dateEnd)}
	        </div>
	      </Card.Text>
	    </Card.Body>
	  </Card>
  	</div>
  )
}

export default withRouter(ListingCard)
