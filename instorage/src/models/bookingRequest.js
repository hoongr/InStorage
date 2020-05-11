/**
 * Holds information regarding a booking request made by a
 * client for a particular listing held by a host.
 */
class BookingRequest {
    /**
     * Takes the JSON response returned from a Firebase call and
     * creates a Listing from it. Objectifies the JSON.
     * @param {string} clientUserID client requesting's ID
     * @param {string} dateEnd client's requested renting period end date
     * @param {string} dateStart client's requested renting period start date
     * @param {string} hostUserID listing's host user ID
     * @param {string} listingID requested listing's ID
     * @param {boolean} needMover if client needs a mover
     * @param {string} requestState state of request (accepted|pending|rejected)
     * @param {string} clientAddress client's address
     * @param {string} clientAddress host's address
     * @param {string} inventoryPhotoURL URL pointing to client's packed inventory
     * @param {Array<string>} inventoryList list of items in client's inventory
     */
    constructor(bookingID, clientUserID, dateEnd, dateStart, moveTime, hostUserID, listingID, needMover, requestState, clientAddress, hostAddress, inventoryPhotoURL, inventoryList) {
        this._bookingID = bookingID;
        this._clientUserID = clientUserID;
        this._dateEnd = dateEnd;
        this._dateStart = dateStart;
        this._moveTime = moveTime;
        this._hostUserID = hostUserID;
        this._listingID = listingID;
        this._needMover = needMover;
        this._requestState = requestState;
        this._clientAddress = clientAddress;
        this._hostAddress = hostAddress;
        this._inventoryPhotoURL = inventoryPhotoURL;
        this._inventoryList = inventoryList;
    }
    /**
     * @property {string} BookingRequest.clientUserID current clientUserId
     */
    get clientUserID() {
        return this._clientUserID;
    }
    set clientUserID(userID) {
        this._clientUserID = userID;
    }
    /**
     * @property {string} BookingRequest.dateEnd current dateEnd
     */
    get dateEnd() {
        return this._dateEnd;
    }
    set dateEnd(date) {
        this._dateEnd = date;
    }
    /**
     * @property {string} BookingRequest.dateStart current dateStart
     */
    get dateStart() {
        return this._dateStart;
    }
    set dateStart(date) {
        this._dateStart = date;
    }
    /**
     * @property {string} BookingRequest.hostUserID current hostUserID
     */
    get hostUserID() {
        return this._hostUserID;
    }
    set hostUserID(userID) {
        this._hostUserID = userID;
    }
    /**
     * @property {string} BookingRequest.listingID current listingID
     */
    get listingID() {
        return this._listingID;
    }
    set listingID(newListingID) {
        this._listingID = newListingID;
    }
    /**
     * @property {boolean} BookingRequest.needMover current needMover value
     */
    get needMover() {
        return this._needMover;
    }
    set needMover(need) {
        this._needMover = need;
    }
    /**
     * @property {string} BookingRequest.requestState whether request is pending, accepted, or rejected
     * will be either: accepted, pending, or rejected
     */
    get requestState() {
        return this._requestState;
    }
    set requestState(state) {
        this.requestState = state;
    }
    /**
     * @property {string} BookingRequest.bookingID ID of booking
     */
    get bookingID() {
        return this._bookingID;
    }
    set bookingID(id) {
        this._bookingID = id;
    }

    /**
     * @property {string} BookingRequest.clientAddress client's address
     */
    get clientAddress() {
        return this._clientAddress;
    }
    set clientAddress(address) {
        this._clientAddress = address;
    }

    /**
     * @property {string} BookingRequest.hostAddress host's address
     */
    get hostAddress() {
        return this._hostAddress;
    }
    set hostAddress(address) {
        this._hostAddress = address;
    }

    /**
     * @property {string} BookingRequest.inventoryPhotoURL URL pointing to image of client's packed inventory
     */
    get inventoryPhotoURL() {
        return this._inventoryPhotoURL;
    }
    set inventoryPhotoURL(url) {
        this._inventoryPhotoURL = url;
    }

    /**
     * @property {Array<string>} BookingRequest.inventoryList list of client's inventory items
     */
    get inventoryList() {
        return this._inventoryList;
    }
    set inventoryList(newList) {
        this._inventoryList = newList;
    }
}
export default BookingRequest;