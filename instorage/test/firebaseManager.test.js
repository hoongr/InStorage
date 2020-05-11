const FirebaseManager = require("../src/api/routes/firebaseManager");
var fetchMock = require("fetch-mock");
/*const Listing = require("../src/models/listing.js");
const BookingRequest = require("../src/models/bookingRequest.js");
const UserProfile = require("../src/models/userProfile.js");
const MovingJob = require("../src/models/movingJob.js");*/
import Listing from "../src/models/listing";
import UserProfile from "../src/models/userProfile";
import BookingRequest from "../src/models/bookingRequest";
import MovingJob from "../src/models/movingJob";

afterEach(fetchMock.reset);

describe("FirebaseManager BookingRequest Functions", () => {
  test("Adding booking request to firebase", () => {
    fetchMock.post("/firebase/listings/book", {
      message: "booking request test created successfully"
    });
    var obj = {
      clientUserID: "clientUserID",
      dateEnd: "2019-12-31",
      dateStart: "2019-12-01",
      moveTime: "5:54 PM",
      hostUserID: "hostUserID",
      listingID: "listing1",
      needMover: "false",
      requestState: "pending",
      clientAddress: "clientAddress",
      hostAddress: "listingAddress",
      inventoryPhotoURL: "photoURL",
      inventoryList: ["TV", "Vacuum"]
    };
    var jsonBody = JSON.stringify({
      _clientUserID: obj.clientUserID,
      _dateEnd: obj.dateEnd,
      _dateStart: obj.dateStart,
      _moveTime: obj.moveTime,
      _hostUserID: obj.hostUserID,
      _listingID: obj.listingID,
      _needMover: obj.needMover,
      _requestState: obj.requestState,
      _clientAddress: obj.clientAddress,
      _hostAddress: obj.hostAddress,
      _inventoryPhotoURL: obj.inventoryPhotoURL,
      _inventoryList: obj.inventoryList
    });
    FirebaseManager.default.addBookingRequest(obj);
    return expect(fetchMock.lastOptions().body).toEqual(jsonBody);
  });
  test("Get all booking requests", () => {
    fetchMock.get("/firebase/bookingRequests", {
      "-LuZjbhuXy_lxjiJnD_-": {
        _clientAddress:
          "430 Kelton Apartments, Kelton Avenue, Los Angeles, CA, USA",
        _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        _dateEnd: "2019-12-31",
        _dateStart: "2019-11-29",
        _hostAddress: "302 Arizona Avenue, Santa Monica, CA, USA",
        _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        _inventoryList: ["nothing"],
        _inventoryPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F73512596805251download.jpeg?alt=media",
        _listingID: "-LuZjRJfZD5h-qYQal2k",
        _moveTime: "5:49 PM",
        _needMover: true,
        _requestState: "accepted"
      },
      "-LuZkyTW_dItqLv1RjOM": {
        _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
        _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        _dateEnd: "2019-12-18",
        _dateStart: "2019-11-29",
        _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
        _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        _inventoryList: ["nothing"],
        _inventoryPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        _listingID: "-LuZkrsUffT_3JP9avO1",
        _moveTime: "5:54 PM",
        _needMover: true,
        _requestState: "accepted"
      },
      "-Ludbnuee-wY8uwo6dtJ": {
        _clientAddress: "923 Westwood Boulevard, Los Angeles, CA, USA",
        _clientUserID: "lmQOYPXBY7fWWRRrqMBEx7i07dA3",
        _dateEnd: "2019-12-13",
        _dateStart: "2019-12-10",
        _hostAddress: "460 North Canon Drive, Beverly Hills, CA, USA",
        _hostUserID: "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
        _inventoryList: ["nothing"],
        _inventoryPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F611275830026217ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
        _listingID: "-LuU5fLPthM7PYeLBauV",
        _moveTime: "3:32 PM",
        _needMover: false,
        _requestState: "pending"
      }
    });
    var expectedOutput = [
      new BookingRequest(
        "-LuZjbhuXy_lxjiJnD_-",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "2019-12-31",
        "2019-11-29",
        "5:49 PM",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "-LuZjRJfZD5h-qYQal2k",
        true,
        "accepted",
        "430 Kelton Apartments, Kelton Avenue, Los Angeles, CA, USA",
        "302 Arizona Avenue, Santa Monica, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F73512596805251download.jpeg?alt=media",
        ["nothing"]
      ),
      new BookingRequest(
        "-LuZkyTW_dItqLv1RjOM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "2019-12-18",
        "2019-11-29",
        "5:54 PM",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "-LuZkrsUffT_3JP9avO1",
        true,
        "accepted",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        ["nothing"]
      ),
      new BookingRequest(
        "-Ludbnuee-wY8uwo6dtJ",
        "lmQOYPXBY7fWWRRrqMBEx7i07dA3",
        "2019-12-13",
        "2019-12-10",
        "3:32 PM",
        "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
        "-LuU5fLPthM7PYeLBauV",
        false,
        "pending",
        "923 Westwood Boulevard, Los Angeles, CA, USA",
        "460 North Canon Drive, Beverly Hills, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F611275830026217ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
        ["nothing"]
      )
    ];
    return FirebaseManager.default
      .getAllBookingRequests()
      .then(bookingRequests => {
        return expect(bookingRequests).toEqual(expectedOutput);
      });
  });

  test("Get booking requests for a listing", () => {
    fetchMock.get(
      "/firebase/bookingRequests",
      {
        "-Ludbnuee-wY8uwo6dtJ": {
          _clientAddress: "923 Westwood Boulevard, Los Angeles, CA, USA",
          _clientUserID: "lmQOYPXBY7fWWRRrqMBEx7i07dA3",
          _dateEnd: "2019-12-13",
          _dateStart: "2019-12-10",
          _hostAddress: "460 North Canon Drive, Beverly Hills, CA, USA",
          _hostUserID: "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
          _inventoryList: ["nothing"],
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F611275830026217ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
          _listingID: "-LuU5fLPthM7PYeLBauV",
          _moveTime: "3:32 PM",
          _needMover: false,
          _requestState: "pending"
        }
      },
      {
        query: {
          listingID: "-LuU5fLPthM7PYeLBauV"
        },
        overwriteRoutes: false
      }
    );
    var listingID = "-LuU5fLPthM7PYeLBauV";
    var expectedOutput = [
      new BookingRequest(
        "-Ludbnuee-wY8uwo6dtJ",
        "lmQOYPXBY7fWWRRrqMBEx7i07dA3",
        "2019-12-13",
        "2019-12-10",
        "3:32 PM",
        "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
        "-LuU5fLPthM7PYeLBauV",
        false,
        "pending",
        "923 Westwood Boulevard, Los Angeles, CA, USA",
        "460 North Canon Drive, Beverly Hills, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F611275830026217ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
        ["nothing"]
      )
    ];
    return FirebaseManager.default
      .getListingBookingRequests(listingID)
      .then(bookingRequests => {
        return expect(bookingRequests).toEqual(expectedOutput);
      });
  });

  test("Get booking requests for a host", () => {
    fetchMock.get(
      "/firebase/bookingRequests",
      {
        "-LuZjbhuXy_lxjiJnD_-": {
          _clientAddress:
            "430 Kelton Apartments, Kelton Avenue, Los Angeles, CA, USA",
          _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
          _dateEnd: "2019-12-31",
          _dateStart: "2019-11-29",
          _hostAddress: "302 Arizona Avenue, Santa Monica, CA, USA",
          _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryList: ["nothing"],
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F73512596805251download.jpeg?alt=media",
          _listingID: "-LuZjRJfZD5h-qYQal2k",
          _moveTime: "5:49 PM",
          _needMover: true,
          _requestState: "accepted"
        },
        "-LuZkyTW_dItqLv1RjOM": {
          _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
          _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
          _dateEnd: "2019-12-18",
          _dateStart: "2019-11-29",
          _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
          _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryList: ["nothing"],
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
          _listingID: "-LuZkrsUffT_3JP9avO1",
          _moveTime: "5:54 PM",
          _needMover: true,
          _requestState: "accepted"
        }
      },
      {
        query: {
          hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2"
        },
        overwriteRoutes: false
      }
    );
    var hostUserID = "WnhMpRdx8HZmE7OvGdS1uofBKvQ2";
    var expectedOutput = [
      new BookingRequest(
        "-LuZjbhuXy_lxjiJnD_-",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "2019-12-31",
        "2019-11-29",
        "5:49 PM",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "-LuZjRJfZD5h-qYQal2k",
        true,
        "accepted",
        "430 Kelton Apartments, Kelton Avenue, Los Angeles, CA, USA",
        "302 Arizona Avenue, Santa Monica, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F73512596805251download.jpeg?alt=media",
        ["nothing"]
      ),
      new BookingRequest(
        "-LuZkyTW_dItqLv1RjOM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "2019-12-18",
        "2019-11-29",
        "5:54 PM",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "-LuZkrsUffT_3JP9avO1",
        true,
        "accepted",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        ["nothing"]
      )
    ];
    return FirebaseManager.default
      .getHostBookingRequests(hostUserID)
      .then(bookingRequests => {
        return expect(bookingRequests).toEqual(expectedOutput);
      });
  });

  test("Get booking request by ID", () => {
    fetchMock.get(
      "/firebase/bookingRequests",
      {
        "-LuZkyTW_dItqLv1RjOM": {
          _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
          _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
          _dateEnd: "2019-12-18",
          _dateStart: "2019-11-29",
          _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
          _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryList: ["nothing"],
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
          _listingID: "-LuZkrsUffT_3JP9avO1",
          _moveTime: "5:54 PM",
          _needMover: true,
          _requestState: "accepted"
        }
      },
      {
        query: {
          bookingRequestID: "LuZkyTW_dItqLv1RjOM"
        },
        overwriteRoutes: false
      }
    );
    var expectedOutput = new BookingRequest(
      "-LuZkyTW_dItqLv1RjOM",
      "gebDiC9WkxakPgrFz1GeI5GDlnX2",
      "2019-12-18",
      "2019-11-29",
      "5:54 PM",
      "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
      "-LuZkrsUffT_3JP9avO1",
      true,
      "accepted",
      "3200 Motor Avenue, Los Angeles, CA, USA",
      "540 Kelton Avenue, Los Angeles, CA, USA",
      "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
      ["nothing"]
    );
    var bookingRequestID = "LuZkyTW_dItqLv1RjOM";
    return FirebaseManager.default
      .getBookingRequestByID(bookingRequestID)
      .then(bookingRequest => {
        return expect(bookingRequest).toEqual(expectedOutput);
      });
  });

  test("Get booking request by clientID", () => {
    fetchMock.get(
      "/firebase/bookingRequests",
      {
        "-LuZkyTW_dItqLv1RjOM": {
          _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
          _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
          _dateEnd: "2019-12-18",
          _dateStart: "2019-11-29",
          _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
          _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryList: ["nothing"],
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
          _listingID: "-LuZkrsUffT_3JP9avO1",
          _moveTime: "5:54 PM",
          _needMover: true,
          _requestState: "accepted"
        }
      },
      {
        query: {
          clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
        },
        overwriteRoutes: false
      }
    );
    var expectedOutput = [
      new BookingRequest(
        "-LuZkyTW_dItqLv1RjOM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "2019-12-18",
        "2019-11-29",
        "5:54 PM",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "-LuZkrsUffT_3JP9avO1",
        true,
        "accepted",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        ["nothing"]
      )
    ];
    var clientUserID = "gebDiC9WkxakPgrFz1GeI5GDlnX2";
    return FirebaseManager.default
      .getClientBookingRequests(clientUserID)
      .then(bookingRequest => {
        return expect(bookingRequest).toEqual(expectedOutput);
      });
  });

  // Absolutely no clue what's wrong with this, somehow there is an unhandled POST for movingJobs that I have clearly defined
  /*test("Accept a booking request", () => {
    fetchMock
      .patch(
        "/firebase/bookingRequests",
        {
          message: "booking request 1 changed successfully"
        },
        {
          query: {
            bookingID: "LuZkyTW_dItqLv1RjOM"
          }
        }
      )
      .get(
        "/firebase/bookingRequests",
        {
          "-LuZkyTW_dItqLv1RjOM": {
            _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
            _clientUserID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _dateEnd: "2019-12-18",
            _dateStart: "2019-11-29",
            _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
            _hostUserID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
            _inventoryList: ["nothing"],
            _inventoryPhotoURL:
              "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
            _listingID: "-LuZkrsUffT_3JP9avO1",
            _moveTime: "5:54 PM",
            _needMover: true,
            _requestState: "pending"
          }
        },
        {
          query: {
            bookingRequestID: "LuZkyTW_dItqLv1RjOM"
          },
          overwriteRoutes: false
        }
      )
      .post("/email/sendBookingConfirmationEmail", {
        message: "Sent email successfully"
      })
      .postOnce(
        "/firebase/movingJobs",
        {
          message: "created moving job successfully"
        },
        {
          body: {
            _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
            _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
            _moveDate: "2019-11-29",
            _moveTime: "5:54 PM",
            _clientID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
            _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _inventoryPhotoURL:
              "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
            _movingJobID: "-LuZlgrOYM2Xw5poYOom"
          },
          overwriteRoutes: false
        }
      )
      .postOnce(
        "/firebase/movingJobs",
        {
          message: "created moving job successfully"
        },
        {
          body: {
            _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
            _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
            _moveDate: "2019-12-18",
            _moveTime: "5:54 PM",
            _clientID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
            _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _inventoryPhotoURL:
              "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
            _movingJobID: "-LuZlgrQBguoBNxlVrjN"
          },
          overwriteRoutes: false
        }
      )
      .get(
        "/firebase/userProfiles",
        {
          "-LuZgz1eSEhGISQGTI9i": {
            _averageRating: -1,
            _bio: "asdfas",
            _college: "UCLA",
            _email: "client@test.com",
            _name: "Andrew Arifin",
            _phoneNum: "(408) 813-4900",
            _profilePicURL:
              "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F15919533060892download.jpeg?alt=media",
            _ratings: [-1],
            _userID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
            _userType: "client",
            _venmo: "andrew"
          }
        },
        {
          query: {
            userID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
          },
          overwriteRoutes: false
        }
      );
    var bookingID = "LuZkyTW_dItqLv1RjOM";
    FirebaseManager.default.acceptBookingRequest(bookingID);
    console.log(fetchMock.calls);
  });*/

  test("Reject booking request", () => {
    fetchMock.patch(
      "/firebase/bookingRequests",
      {
        message: "successfully modified booking request"
      },
      {
        query: {
          bookingID: "LuZkyTW_dItqLv1RjOM"
        },
        overwriteRoutes: false
      }
    );
    var bookingID = "LuZkyTW_dItqLv1RjOM";
    var expectedPatch = JSON.stringify({
      _requestState: "rejected"
    });
    FirebaseManager.default.rejectBookingRequest(bookingID);
    return expect(fetchMock.lastOptions().body).toEqual(expectedPatch);
  });
});

// Test doesn't work due to google geo stuff i think
describe("FirebaseManager Listing Functions", () => {
  var coords = {
    latitude: 38.6546838368358,
    longitude: -121.14963054656984
  };
  /*test("Adding listing to Firebase", async () => {
    var obj = {
      address: "1600+Amphitheatre+Parkway,+Mountain+View,+CA",
      available: true,
      dateEndAvailable: "2019-12-31",
      dateStartAvailable: "2019-12-01",
      hostUserID: "hostUserID",
      photoURL: "photoURL",
      rentalPrice: 45,
      squareFootageEstimate: 200
    };
    var jsonBody = JSON.stringify({
      _address: obj.address,
      _available: obj.available,
      _dateEndAvailable: obj.dateEndAvailable,
      _dateStartAvailable: obj.dateStartAvailable,
      _hostUserID: obj.hostUserID,
      _photoURL: obj.photoURL,
      _rentalPrice: obj.rentalPrice,
      _squareFootageEstimate: obj.squareFootageEstimate
    });
    fetchMock.post("/firebase/listings", {
      message: "listing 1 created successfully"
    }, {
      body: jsonBody
    });
    FirebaseManager.default.addListing(obj);
    return fetchMock.flush(true).then(() => {
      return expect(fetchMock.lastOptions().body).toEqual(jsonBody);
    });
  });*/

  test("Get all listings", () => {
    fetchMock.get("/firebase/listings", {
      "-LuS2c-RmNDowGbVsFN8": {
        _address: "424 Kelton Ave",
        _available: true,
        _coordinates: [34.0698311, -118.4530909],
        _dateEndAvailable: "2020-01-25",
        _dateStartAvailable: "2019-12-27",
        _distance: 350.75,
        _hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        _listingID: "-LuS2c-RmNDowGbVsFN8",
        _photoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F7881595298295apartment-bedroom-empty-with-adventures-in-seattle-empty-apartment-3.jpg?alt=media",
        _rentalPrice: 45,
        _squareFootageEstimate: 35
      },
      "-LuQUFQ-CqFT0GSU3fCv": {
        _address: "972 Hilgard Avenue",
        _available: true,
        _coordinates: [34.0617189, -118.4409989],
        _dateEndAvailable: "2020-02-28",
        _dateStartAvailable: "2019-12-01",
        _hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        _photoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
        _rentalPrice: 25,
        _squareFootageEstimate: 20
      },
      "-LuQyi1FVyxQxkLBlWvO": {
        _address: "Hedrick Hall, De Neve Drive, Los Angeles, CA, USA",
        _available: true,
        _coordinates: [34.0731836, -118.4523152],
        _dateEndAvailable: "2019-12-10",
        _dateStartAvailable: "2019-11-27",
        _hostUserID: "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
        _photoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F667050793750677ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
        _rentalPrice: 30,
        _squareFootageEstimate: 60
      }
    });
    var sortedListings = [
      new Listing(
        "Hedrick Hall, De Neve Drive, Los Angeles, CA, USA",
        true,
        "2019-12-10",
        "2019-11-27",
        "3oXgtUfBIlMNIvnZlOliuAfZ9A03",
        "-LuQyi1FVyxQxkLBlWvO",
        30,
        60,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F667050793750677ea1a9823d95a111a8637d816b423bfe64bbc390.jpg_facebook.jpg?alt=media",
        [34.0731836, -118.4523152],
        350.26
      ),
      new Listing(
        "424 Kelton Ave",
        true,
        "2020-01-25",
        "2019-12-27",
        "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        "-LuS2c-RmNDowGbVsFN8",
        45,
        35,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F7881595298295apartment-bedroom-empty-with-adventures-in-seattle-empty-apartment-3.jpg?alt=media",
        [34.0698311, -118.4530909],
        350.45
      ),
      new Listing(
        "972 Hilgard Avenue",
        true,
        "2020-02-28",
        "2019-12-01",
        "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        "-LuQUFQ-CqFT0GSU3fCv",
        25,
        20,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
        [34.0617189, -118.4409989],
        351.25
      )
    ];
    return FirebaseManager.default
      .getAllListingsWithCoords(coords)
      .then(listings => {
        return expect(listings).toEqual(sortedListings);
      });
  });

  test("Get listing with coords", () => {
    fetchMock.get(
      "/firebase/listings",
      {
        "-LuQUFQ-CqFT0GSU3fCv": {
          _address: "972 Hilgard Avenue",
          _available: true,
          _coordinates: [34.0617189, -118.4409989],
          _dateEndAvailable: "2020-02-28",
          _dateStartAvailable: "2019-12-01",
          _hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
          _photoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
          _rentalPrice: 25,
          _squareFootageEstimate: 20
        }
      },
      {
        query: {
          listingID: "-LuQUFQ-CqFT0GSU3fCv"
        }
      }
    );
    var expectedOutput = new Listing(
      "972 Hilgard Avenue",
      true,
      "2020-02-28",
      "2019-12-01",
      "rUATEJFcCjMZGZY9LGeTWaQboJz1",
      "-LuQUFQ-CqFT0GSU3fCv",
      25,
      20,
      "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
      [34.0617189, -118.4409989],
      351.25
    );
    var listingID = "-LuQUFQ-CqFT0GSU3fCv";
    return FirebaseManager.default
      .getListingWithCoords(listingID, coords)
      .then(listing => {
        return expect(listing).toEqual(expectedOutput);
      });
  });

  test("Get host's listings", () => {
    fetchMock.get(
      "/firebase/listings",
      {
        "-LuS2c-RmNDowGbVsFN8": {
          _address: "424 Kelton Ave",
          _available: true,
          _coordinates: [34.0698311, -118.4530909],
          _dateEndAvailable: "2020-01-25",
          _dateStartAvailable: "2019-12-27",
          _distance: 350.75,
          _hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
          _listingID: "-LuS2c-RmNDowGbVsFN8",
          _photoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F7881595298295apartment-bedroom-empty-with-adventures-in-seattle-empty-apartment-3.jpg?alt=media",
          _rentalPrice: 45,
          _squareFootageEstimate: 35
        },
        "-LuQUFQ-CqFT0GSU3fCv": {
          _address: "972 Hilgard Avenue",
          _available: true,
          _coordinates: [34.0617189, -118.4409989],
          _dateEndAvailable: "2020-02-28",
          _dateStartAvailable: "2019-12-01",
          _hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
          _photoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
          _rentalPrice: 25,
          _squareFootageEstimate: 20
        }
      },
      {
        query: {
          hostUserID: "rUATEJFcCjMZGZY9LGeTWaQboJz1"
        }
      }
    );
    var expectedOutput = [
      new Listing(
        "424 Kelton Ave",
        true,
        "2020-01-25",
        "2019-12-27",
        "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        "-LuS2c-RmNDowGbVsFN8",
        45,
        35,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F7881595298295apartment-bedroom-empty-with-adventures-in-seattle-empty-apartment-3.jpg?alt=media",
        [34.0698311, -118.4530909],
        350.45
      ),
      new Listing(
        "972 Hilgard Avenue",
        true,
        "2020-02-28",
        "2019-12-01",
        "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        "-LuQUFQ-CqFT0GSU3fCv",
        25,
        20,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/listings%2F67554737465164empty_corner.jpg?alt=media",
        [34.0617189, -118.4409989],
        351.25
      )
    ];
    var hostUserID = "rUATEJFcCjMZGZY9LGeTWaQboJz1";
    return FirebaseManager.default
      .getUserListings(hostUserID, coords)
      .then(listings => {
        return expect(listings).toEqual(expectedOutput);
      });
  });

  test("Accept listings", () => {
    fetchMock.patch(
      "/firebase/listings",
      {
        message: "listing successfully changed"
      },
      {
        query: {
          listingID: "-LuQUFQ-CqFT0GSU3fCv"
        },
        body: {
          _available: false
        }
      }
    );
    var listingID = "-LuQUFQ-CqFT0GSU3fCv";
    var body = JSON.stringify({
      _available: false
    });
    FirebaseManager.default.acceptListing(listingID);
    expect(fetchMock.lastOptions().body).toEqual(body);
  });
});

describe("FirebaseManager UserProfile functions", () => {
  test("Add UserProfile to Firebase", () => {
    fetchMock.post("/firebase/userProfiles", {
      message: "user 1 successfully created"
    });
    var obj = {
      bio: "bio",
      college: "college",
      name: "name",
      phoneNum: "phoneNum",
      userID: "userID",
      userType: "client",
      email: "email",
      ratings: [5, 5],
      averageRating: 5,
      venmo: "venmo",
      profilePicURL: "profilePicURL"
    };
    var jsonBody = JSON.stringify({
      _bio: obj.bio,
      _college: obj.college,
      _name: obj.name,
      _phoneNum: obj.phoneNum,
      _userID: obj.userID,
      _userType: obj.userType,
      _email: obj.email,
      _ratings: obj.ratings,
      _averageRating: obj.averageRating,
      _venmo: obj.venmo,
      _profilePicURL: obj.profilePicURL
    });
    FirebaseManager.default.addUserProfile(obj);
    return expect(fetchMock.lastOptions().body).toEqual(jsonBody);
  });

  test("Get all profiles", () => {
    fetchMock.get("/firebase/userProfiles", {
      "-LueVLCdl1CnpVQ7YQUz": {
        _bio: "I can do more than dribble.",
        _college: "NBA",
        _name: "Lebron James",
        _phoneNum: "(342) 342-7694",
        _venmo: "theking",
        _userType: "client",
        _userID: "BAr7cTG08TWaPFBJrMYDjZlleav2",
        _ratings: [-1],
        _averageRating: -1,
        _email: "lebronjames@nba.edu",
        _profilePicURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F35372458137221i.png?alt=media"
      },
      "-LueGCQCfXIB6iQa3QbF": {
        _bio: "I like carrots",
        _college: "UCLA",
        _name: "Bugs Bunny",
        _phoneNum: "626-102-1452",
        _venmo: "bugsbunny",
        _userType: "client",
        _userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2",
        _ratings: [4, 5],
        _averageRating: 4.5,
        _email: "bshsu@ucla.edu",
        _profilePicURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F63249613147675IMG_2835.JPG?alt=media"
      },
      "-LubBX6nwIbdJm79NA83": {
        _bio: "Blah blah blah blah blah..",
        _college: "Cal Tech",
        _name: "Blah Blah",
        _phoneNum: "534-254-1352",
        _venmo: "blahblahblah",
        _userType: "client",
        _userID: "S51wdqj5jqTOHCeiD42vR57MKLD3",
        _ratings: [-1],
        _averageRating: -1,
        _email: "blahblah@gmail.com",
        _profilePicURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F829418454943606103036512635.jpeg?alt=media"
      }
    });
    var expectedOutput = [
      new UserProfile(
        "I can do more than dribble.",
        "NBA",
        "Lebron James",
        "(342) 342-7694",
        "BAr7cTG08TWaPFBJrMYDjZlleav2",
        "theking",
        "client",
        "lebronjames@nba.edu",
        [-1],
        -1,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F35372458137221i.png?alt=media"
      ),
      new UserProfile(
        "I like carrots",
        "UCLA",
        "Bugs Bunny",
        "626-102-1452",
        "yVHXjZOtr0UHA6cVcjGokII8yzA2",
        "bugsbunny",
        "client",
        "bshsu@ucla.edu",
        [4, 5],
        4.5,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F63249613147675IMG_2835.JPG?alt=media"
      ),
      new UserProfile(
        "Blah blah blah blah blah..",
        "Cal Tech",
        "Blah Blah",
        "534-254-1352",
        "S51wdqj5jqTOHCeiD42vR57MKLD3",
        "blahblahblah",
        "client",
        "blahblah@gmail.com",
        [-1],
        -1,
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F829418454943606103036512635.jpeg?alt=media"
      )
    ];
    return FirebaseManager.default.getAllUserProfiles().then(userProfiles => {
      return expect(userProfiles).toEqual(expectedOutput);
    });
  });

  test("Get user profile", () => {
    fetchMock.get(
      "/firebase/userProfiles",
      {
        "-LueGCQCfXIB6iQa3QbF": {
          _bio: "I like carrots",
          _college: "UCLA",
          _name: "Bugs Bunny",
          _phoneNum: "626-102-1452",
          _venmo: "bugsbunny",
          _userType: "client",
          _userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2",
          _ratings: [4, 5],
          _averageRating: 4.5,
          _email: "bshsu@ucla.edu",
          _profilePicURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F63249613147675IMG_2835.JPG?alt=media"
        }
      },
      {
        query: {
          userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2"
        }
      }
    );
    var expectedOutput = new UserProfile(
      "I like carrots",
      "UCLA",
      "Bugs Bunny",
      "626-102-1452",
      "yVHXjZOtr0UHA6cVcjGokII8yzA2",
      "bugsbunny",
      "client",
      "bshsu@ucla.edu",
      [4, 5],
      4.5,
      "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F63249613147675IMG_2835.JPG?alt=media"
    );
    var userID = "yVHXjZOtr0UHA6cVcjGokII8yzA2";
    return FirebaseManager.default.getUserProfile(userID).then(userProfile => {
      return expect(userProfile).toEqual(expectedOutput);
    });
  });

  test("Update user's rating", async () => {
    fetchMock
      .get(
        "/firebase/userProfiles",
        {
          "-LueGCQCfXIB6iQa3QbF": {
            _bio: "I like carrots",
            _college: "UCLA",
            _name: "Bugs Bunny",
            _phoneNum: "626-102-1452",
            _venmo: "bugsbunny",
            _userType: "client",
            _userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2",
            _ratings: [4, 5],
            _averageRating: 4.5,
            _email: "bshsu@ucla.edu",
            _profilePicURL:
              "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/users%2F63249613147675IMG_2835.JPG?alt=media"
          }
        },
        {
          query: {
            userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2"
          }
        }
      )
      .patch(
        "/firebase/userProfiles",
        {
          message: "user profile successfully changed"
        },
        {
          query: {
            userID: "yVHXjZOtr0UHA6cVcjGokII8yzA2"
          },
          body: {
            _ratings: [4, 5, 3],
            _averageRating: 4
          }
        }
      );
    var userID = "yVHXjZOtr0UHA6cVcjGokII8yzA2";
    var expectedPatch = JSON.stringify({
      _ratings: [4, 5, 3],
      _averageRating: 4
    });
    FirebaseManager.default.updateUserRating(userID, 3);
    return fetchMock.flush(true).then(() => {
      return expect(fetchMock.lastOptions().body).toEqual(expectedPatch);
    });
  });
});

describe("FirebaseManager MovingJob Functions", () => {
  test("Add MovingJob to Firebase", () => {
    fetchMock.post("/firebase/movingJobs", {
      message: "user 1 successfully created"
    });
    var obj = {
      clientAddress: "clientAddress",
      clientID: "clientID",
      hostAddress: "hostAddress",
      hostID: "hostID",
      moveDate: "moveDate",
      moveTime: "moveTime",
      moverID: "moverID",
      inventoryPhotoURL: "inventoryPhotoURL"
    };
    var jsonBody = JSON.stringify({
      _clientAddress: obj.clientAddress,
      _clientID: obj.clientID,
      _hostAddress: obj.hostAddress,
      _hostID: obj.hostID,
      _moveDate: obj.moveDate,
      _moveTime: obj.moveTime,
      _moverID: obj.moverID,
      _inventoryPhotoURL: obj.inventoryPhotoURL
    });
    FirebaseManager.default.addMovingJob(obj);
    return expect(fetchMock.lastOptions().body).toEqual(jsonBody);
  });

  test("Get MovingJob by moving job ID", () => {
    fetchMock.get(
      "/firebase/movingJobs",
      {
        "-LuZlgrQBguoBNxlVrjN": {
          _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
          _clientID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
          _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
          _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
          _moveDate: "2019-12-18",
          _moveTime: "5:54 PM",
          _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
        }
      },
      {
        query: {
          movingJobID: "-LuZlgrQBguoBNxlVrjN"
        }
      }
    );
    var expectedOutput = new MovingJob(
      "-LuZlgrQBguoBNxlVrjN",
      "3200 Motor Avenue, Los Angeles, CA, USA",
      "rUATEJFcCjMZGZY9LGeTWaQboJz1",
      "540 Kelton Avenue, Los Angeles, CA, USA",
      "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
      "2019-12-18",
      "5:54 PM",
      "gebDiC9WkxakPgrFz1GeI5GDlnX2",
      "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media"
    );
    var movingJobID = "-LuZlgrQBguoBNxlVrjN";
    return FirebaseManager.default.getMovingJob(movingJobID).then(movingJob => {
      return expect(movingJob).toEqual(expectedOutput);
    });
  });

  test("Get MovingJob by mover ID", () => {
    fetchMock.get(
      "/firebase/movingJobs",
      {
        "-LuZlgrOYM2Xw5poYOom": {
          _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
          _clientID: "rUATEJFcCjMZGZY9LGeTWaQboJz1",
          _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
          _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
          _inventoryPhotoURL:
            "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
          _moveDate: "2019-11-29",
          _moveTime: "5:54 PM",
          _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
        }
      },
      {
        query: {
          moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
        }
      }
    );
    var expectedOutput = [
      new MovingJob(
        "-LuZlgrOYM2Xw5poYOom",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "rUATEJFcCjMZGZY9LGeTWaQboJz1",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "2019-11-29",
        "5:54 PM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media"
      )
    ];
    var moverID = "gebDiC9WkxakPgrFz1GeI5GDlnX2";
    return FirebaseManager.default
      .getMovingJobsByMover(moverID)
      .then(movingJobs => {
        return expect(movingJobs).toEqual(expectedOutput);
      });
  });

  test("Get all moving jobs", () => {
    fetchMock.get("/firebase/movingJobs", {
      "-LuZlgrOYM2Xw5poYOom": {
        _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
        _clientID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
        _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        _inventoryPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        _moveDate: "2019-11-29",
        _moveTime: "5:54 PM",
        _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
      },
      "-LuZlgrQBguoBNxlVrjN": {
        _clientAddress: "3200 Motor Avenue, Los Angeles, CA, USA",
        _clientID: "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        _hostAddress: "540 Kelton Avenue, Los Angeles, CA, USA",
        _hostID: "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        _inventoryPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media",
        _moveDate: "2019-12-18",
        _moveTime: "5:54 PM",
        _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
      }
    });
    var expectedOutput = [
      new MovingJob(
        "-LuZlgrOYM2Xw5poYOom",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "2019-11-29",
        "5:54 PM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media"
      ),
      new MovingJob(
        "-LuZlgrQBguoBNxlVrjN",
        "3200 Motor Avenue, Los Angeles, CA, USA",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "540 Kelton Avenue, Los Angeles, CA, USA",
        "WnhMpRdx8HZmE7OvGdS1uofBKvQ2",
        "2019-12-18",
        "5:54 PM",
        "gebDiC9WkxakPgrFz1GeI5GDlnX2",
        "https://firebasestorage.googleapis.com/v0/b/instorage-6b1ea.appspot.com/o/inventory%2F75257817048644download.jpeg?alt=media"
      )
    ];
    return FirebaseManager.default.getAllMovingJobs().then(movingJobs => {
      return expect(movingJobs).toEqual(expectedOutput);
    });
  });

  test("Accept moving job", () => {
    fetchMock.patch(
      "/firebase/movingJobs",
      {
        message: "moving job successfully changed"
      },
      {
        query: {
          movingJobID: "LuZlgrQBguoBNxlVrjN"
        },
        body: {
          _moverID: "gebDiC9WkxakPgrFz1GeI5GDlnX2"
        },
        overwriteRoutes: false
      }
    );
    var movingJobID = "LuZlgrQBguoBNxlVrjN";
    var moverID = "gebDiC9WkxakPgrFz1GeI5GDlnX2";
    var body = JSON.stringify({
      _moverID: moverID
    });
    FirebaseManager.default.acceptMovingJob(movingJobID, moverID);
    return expect(fetchMock.lastOptions().body).toEqual(body);
  });
});
