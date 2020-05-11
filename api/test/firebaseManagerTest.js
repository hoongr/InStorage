var assert = require('assert');
var fetchMock = require('fetch-mock');
const FirebaseManager = require('../routes/firebaseManager');

describe('FirebaseManager', function() {
    describe('#addBookingRequests()', function() {
        fetchMock.postOnce("http://localhost:9999/firebase/listings/book", 200);
        var clientUserID = "testClientID";
        var dateEnd = "2019-11-24";
        var dateStart = "2019-11-12";
        var hostUserID = "testHostID";
        var listingID = "testListingID";
        var needMover = false;
        var requestState = "pending";
        var clientAddress = "424 Test Ave, Los Angeles, CA";
        var hostAddress = "430 Test Ave, Los Angeles, CA";
        var inventoryPhotoURL = "www.google.com";
        var inventoryList = ["TV", "Toaster"];
        FirebaseManager.addBookingRequest(clientUserID, dateEnd, dateStart, hostUserID, listingID, needMover, requestState, clientAddress, hostAddress, inventoryPhotoURL, inventoryList);
        console.log(fetchMock.lastOptions().body);
    })
})