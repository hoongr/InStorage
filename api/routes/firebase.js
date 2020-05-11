var express = require("express");
var router = express.Router();
var firebase = require("firebase");


require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCcW_1JqS55gkW0294HRh5uT3LkoQtKfXw",
  authDomain: "instorage-6b1ea.firebaseapp.com",
  databaseURL: "https://instorage-6b1ea.firebaseio.com",
  projectId: "instorage-6b1ea",
  storageBucket: "instorage-6b1ea.appspot.com",
  messagingSenderId: "588350868786",
  appId: "1:588350868786:web:5d6130acdf63b530779b2b",
  measurementId: "G-YBVXWGHM70"
};

// Initialization.
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
var listing_ref = db.ref("Listings");
// Allows for caching whenever change occurs, something online said this optimizes firebase calls.
listing_ref.on("value", function(snapshot) {});
var user_ref = db.ref("UserProfiles");
user_ref.on("value", function(snapshot) {});
var booking_request_ref = db.ref("BookingRequests");
booking_request_ref.on("value", function(snapshot) {});
var moving_job_ref = db.ref("MovingJobs");
moving_job_ref.on("value", function(snapshot) {});

router
  .route("/userProfiles")
  // Retrieves user profiles.
  .get(function(req, res) {
    // Grabs a specific user profile.
    if (req.query.userID) {
      user_ref
        .orderByChild("_userID")
        .equalTo(req.query.userID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    // Grabs all user profiles.
    } else {
      let users = [];
      user_ref
        .orderByKey()
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    }
  })
  // Creates user profiles.
  .post(function(req, res) {
    const newUser = {
      _bio: req.body._bio,
      _college: req.body._college,
      _name: req.body._name,
      _phoneNum: req.body._phoneNum,
      _userID: req.body._userID,
      _userType: req.body._userType,
      _venmo: req.body._venmo,
      _email: req.body._email,
      _ratings: req.body._ratings,
      _averageRating: req.body._averageRating,
      _profilePicURL: req.body._profilePicURL,
    };

    user_ref
      .push(newUser)
      .then(user => {
        res.json({ message: `user ${user.key} successfully created` });
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  })
  .patch(function(req, res) {
    if (req.query.userID) {
      user_ref
        .orderByChild("_userID")
        .equalTo(req.query.userID)
        .once("value", function(snapshot) {
          snapshot.forEach(function(userSnapshot) {
            userSnapshot.ref.update(req.body)
              .then(function(){
                res.json({ message: `user ${req.query.userID} changed successfully` });
              })
              .catch(err => {
                res.status(400).json( {error: "bad request"} );
                console.error(err);
              })
          })
        })
    }
  });

router
  .route("/listings")
  .get(function(req, res) {
    // "/listings?hostUserID=joeBruin69"
    // Returns all listings belonging to a specific user.
    if (req.query.hostUserID) {
      listing_ref
        .orderByChild("_hostUserID")
        .equalTo(req.query.hostUserID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong" });
          console.error(err);
        });
    // Gets listing matching the listingID in the query.
    } else if (req.query.listingID) {
      listing_ref
        .orderByKey()
        .equalTo(req.query.listingID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    // Returns all listings.
    } else {
      let listings = [];
      listing_ref
        .orderByKey()
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    }
  })
  // Create a listing.
  .post(function(req, res) {
    const newListing = {
      _address: req.body._address,
      _dateEndAvailable: req.body._dateEndAvailable,
      _dateStartAvailable: req.body._dateStartAvailable,
      _rentalPrice: req.body._rentalPrice,
      _squareFootageEstimate: req.body._squareFootageEstimate,
      _available: true,
      _hostUserID: req.body._hostUserID,
      _coordinates: req.body._coordinates,
      _photoURL: req.body._photoURL
    };

    listing_ref
      .push(newListing)
      .then(listing => {
        res.json({ message: `listing ${listing.key} created successfully` });
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  })
  .patch(function(req, res) {
    if (req.query.listingID) {
      var child_ref = listing_ref.child(req.query.listingID);
      child_ref.update(req.body)
          .then(function(){
            res.json({ message: `listing ${req.query.listingID} changed successfully` });
          })
          .catch(err => {
            res.status(400).json( {error: "bad request"} );
            console.error(err);
          })
    }
  });

// Creates a booking request for a listing.
router.route("/listings/book")
  .post(function(req, res) {
    const newBookingRequest = {
      _clientUserID: req.body._clientUserID,
      _hostUserID: req.body._hostUserID,
      _listingID: req.body._listingID,
      _dateEnd: req.body._dateEnd,
      _dateStart: req.body._dateStart,
      _moveTime: req.body._moveTime,
      _needMover: req.body._needMover == "true",
      _requestState: "pending",
      _clientAddress: req.body._clientAddress,
      _hostAddress: req.body._hostAddress,
      _inventoryPhotoURL: req.body._inventoryPhotoURL,
      _inventoryList: req.body._inventoryList,
    };
    console.error("req need mover", newBookingRequest._needMover);
    console.log(newBookingRequest);
    // Do validation of booking request here, check:
    // Is listingID valid, is hostUserID associated with listing
    // is date start and date end within listing dates.

    booking_request_ref
      .push(newBookingRequest)
      .then(bookingRequest => {
        res.json({ message: `booking request ${bookingRequest.key} created successfully` });
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong'});
        console.error(err);
      });
});

router.route("/bookingRequests")
  .get(function(req, res) {
    // Get booking requests for a specific listing.
    if (req.query.listingID) {
      booking_request_ref
        .orderByChild("_listingID")
        .equalTo(req.query.listingID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    // Get booking request by ID.
  } else if (req.query.bookingRequestID) {
      booking_request_ref
        .orderByKey()
        .equalTo(req.query.bookingRequestID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    // Get all booking requests.
    } else if (req.query.hostUserID) {
      booking_request_ref
        .orderByChild("_hostUserID")
        .equalTo(req.query.hostUserID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
      // Get booking requests for a specific client
    } else if (req.query.clientUserID) {
      booking_request_ref
        .orderByChild("_clientUserID")
        .equalTo(req.query.clientUserID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    // Get all booking requests.
    }
     else {
      booking_request_ref
        .orderByKey()
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    }
  })
  .patch(function(req, res) {
    if (req.query.bookingID) {
      var child_ref = booking_request_ref.child(req.query.bookingID);
      child_ref.update(req.body)
      .then(function(){
        res.json({ message: `booking request ${req.query.bookingID} changed successfully` });
      })
      .catch(err => {
        res.status(400).json( {error: "bad request"} );
        console.error(err);
      })
    }
  })

router
  .route("/movingJobs")
  .get(function(req, res) {
    // "/movingJobs?movingJobID=<movingJobId>"
    // Returns all moving jobs by movingJobID
    if (req.query.movingJobID) {
      moving_job_ref
        .orderByKey()
        .equalTo(req.query.movingJobID)
        .once("value", function(snapshot) {
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong" });
          console.error(err);
        });
    }   // "/movingJobs?moverID=<moverID>"
      // Returns moving job by moverID
    else if(req.query.moverID) {
      //let movingJobs = [];
      moving_job_ref
        .orderByChild("_moverID")
        .equalTo(req.query.moverID)
        .once("value", function(snapshot) {
          /*snapshot.forEach(movingJob => {
            movingJobs.push({
              _clientAddress: movingJob.val()._clientAddress,
              _hostAddress: movingJob.val()._hostAddress,
              _moveDate: movingJob.val()._moveDate,
              _moveTime: movingJob.val()._moveTime,
              _clientID: movingJob.val()._clientID,
              _hostID: movingJob.val()._hostID,
              _moverID: movingJob.val()._moverID,
              _movingJobID : movingJob.key
            });
          });
          // Orders movingJobs by most recent.
          return res.json(movingJobs.reverse());*/
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
      // Returns all movingJobs.
      } else {
      //let movingJobs = [];
      moving_job_ref
        .orderByKey()
        .once("value", function(snapshot) {
          /*snapshot.forEach(movingJob => {
            movingJobs.push({
              _clientAddress: movingJob.val()._clientAddress,
              _hostAddress: movingJob.val()._hostAddress,
              _moveDate: movingJob.val()._moveDate,
              _moveTime: movingJob.val()._moveTime,
              _clientID: movingJob.val()._clientID,
              _hostID: movingJob.val()._hostID,
              _moverID: movingJob.val()._moverID,
              _inventoryPhotoURL: movingJob.val()._inventoryPhotoURL,
              _movingJobID : movingJob.key
            });
          });
          // Orders movingJobs by most recent.
          return res.json(movingJobs.reverse());*/
          return res.json(snapshot);
        })
        .catch(err => {
          res.status(500).json({ error: "something went wrong"});
          console.error(err);
        });
    }
  })
  // Create a moving job.
  .post(function(req, res) {
    const movingJob = {
      _clientAddress: req.body._clientAddress,
      _hostAddress: req.body._hostAddress,
      _moveDate: req.body._moveDate,
      _moveTime: req.body._moveTime,
      _clientID: req.body._clientID,
      _hostID: req.body._hostID,
      _moverID: req.body._moverID,
      _inventoryPhotoURL: req.body._inventoryPhotoURL,
    };

    moving_job_ref
      .push(movingJob)
      .then(movingJob => {
        res.json({ message: `moving job ${movingJob.key} created successfully` });
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
    });
  })
  .patch(function(req, res) {
    if (req.query.movingJobID) {
      var child_ref = moving_job_ref.child(req.query.movingJobID);
      child_ref.update(req.body)
      .then(function(){
        res.json({ message: `moving job ${req.query.movingJobID} changed successfully` });
      })
      .catch(err => {
        res.status(400).json( {error: "bad request"} );
        console.error(err);
      })
    }
  });

module.exports = router;
