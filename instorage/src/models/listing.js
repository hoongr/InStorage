/**
 * Holds attributes of a apartment listing.
 */
class Listing {
    /**
     * Takes in a JSON from Firebase containing listing attributes and creates an object from it.
     * @param {string} address listing address
     * @param {boolean} available if listing is available
     * @param {string} dateEndAvailable end date of availability
     * @param {string} dateStartAvailable start date of availability
     * @param {string} hostUserID ID of host of listing
     * @param {string} listingID ID of listing
     * @param {string} photoURL URL for listing photo
     * @param {float} rentalPrice price of listing
     * @param {int} squareFootageEstimate estimate of listing square footage
     * @param {Array<int>} coordinates of the apartment
     * @param {float} distance miles between listing and current coordinates
     */
    constructor(address, available, dateEndAvailable, dateStartAvailable, hostUserID, listingID, rentalPrice, squareFootageEstimate, photoURL, coordinates, distance) {
        this._address = address;
        this._available = available;
        this._dateEndAvailable = dateEndAvailable;
        this._dateStartAvailable = dateStartAvailable;
        this._hostUserID = hostUserID;
        this._listingID = listingID;
        this._photoURL = photoURL;
        this._rentalPrice = rentalPrice;
        this._squareFootageEstimate = squareFootageEstimate;
        this._coordinates = coordinates;
        this._distance = distance;
    }
    /**
     * @property {string} address listing address
     */
    get address() {
        return this._address;
    }
    set address(addr) {
        this._address = addr;
    }
    /**
     * @property {boolean} available is listing available
     */
    get available() {
        return this._available;
    }
    set available(newAvailability) {
        this._available = newAvailability;
    }
    /**
     * @property {string} Listing.dateEndAvailable listing end date
     */
    get dateEndAvailable() {
        return this._dateEndAvailable;
    }
    set dateEndAvailable(newDate) {
        this._dateEndAvailable = newDate;
    }
    /**
     * @property {string} Listing.dateStartAvailable listing start date
     */
    get dateStartAvailable() {
        return this._dateStartAvailable;
    }
    set dateStartAvailable(newDate) {
        this._dateStartAvailable = newDate;
    }
    /**
     * @property {string} Listing.hostUserID listing's host user ID
     */
    get hostUserID() {
        return this._hostUserID;
    }
    set hostUserID(userID) {
        this._hostUserID = userID;
    }
    /**
     * @property {string} Listing.listingID listingID of listing
     */
    get listingID() {
        return this._listingID;
    }
    set listingID(newListingID) {
        this._listingID = newListingID;
    }
    /**
     * @property {string} Listing.photoURL listing's photo url
     */
    get photoURL() {
        return this._photoURL;
    }
    set photoURL(url) {
        this._photoURL = url;
    }
    /**
     * @property {float} Listing.rentalPrice listing rental price
     */
    get rentalPrice() {
        return this._rentalPrice;
    }
    set rentalPrice(price) {
        this._rentalPrice = price;
    }
    /**
     * @property {int} Listing.squareFootageEstimate square footage estimate of listing
     */
    get squareFootageEstimate() {
        return this._squareFootageEstimate;
    }
    set squareFootageEstimate(estimate) {
        this._squareFootageEstimate = estimate;
    }
    /**
     * @property {Array<int>} Listing.coordinates coordinates of the listed apartment
     */
    get coordinates() {
        return this._coordinates;
    }
    set coordinates(coords) {
        this.coordinates = coords;
    }
    /**
     * @property {int} Listing.distance distance between user and listed apartment
     */
    get distance() {
        return this._distance;
    }
    set distance(dist) {
        this._distance = dist;
    }
}
export default Listing;