/**
 * Holds information regarding a moving job between a mover, client, and host
 */
class MovingJob {
    /**
     * Takes the JSON response returned from a Firebase call and
     * creates a MovingJob from it. Objectifies the JSON.
     * @param {string} movingJobID this job's unique ID
     * @param {string} clientAddress client's address
     * @param {string} clientID client requesting's ID
     * @param {string} hostID host's ID
     * @param {string} hostAddress host's address
     * @param {string} moveDate date that moving job is scheduled for
     * @param {string} moveTime time that moving job is scheduled for
     * @param {string} moverID mover's ID
     * @param {string} inventoryPhotoURL client's inventory
     */
    constructor(movingJobID, clientAddress, clientID, hostAddress, hostID, moveDate, moveTime, moverID, inventoryPhotoURL, coordinates, distance) {
        this._movingJobID = movingJobID;
        this._clientAddress = clientAddress;
        this._clientID = clientID;
        this._hostAddress = hostAddress;
        this._hostID = hostID;
        this._moveDate = moveDate;
        this._moveTime = moveTime;
        this._moverID = moverID;
        this._inventoryPhotoURL = inventoryPhotoURL;
        this._coordinates = coordinates;
        this._distance = distance;
    }
    /**
     * @property {string} MovingJob.clientAddress current clientAddress
     */
    get clientAddress() {
        return this._clientAddress;
    }
    set clientAddress(clientAddress) {
        this._clientAddress = clientAddress;
    }
    /**
     * @property {string} MovingJob.clientID current clientID
     */
    get clientID() {
        return this._clientID;
    }
    set clientID(clientID) {
        this._clientID = clientID;
    }
    /**
     * @property {string} MovingJob.hostAddress current hostAddress
     */
    get hostAddress() {
        return this._hostAddress;
    }
    set hostAddress(hostAddress) {
        this._hostAddress = hostAddress;
    }
    /**
     * @property {string} MovingJob.hostID current hostID
     */
    get hostID() {
        return this._hostID;
    }
    set hostID(hostID) {
        this._hostID = hostID;
    }
    /**
     * @property {string} MovingJob.moveDate current moveDate
     */
    get moveDate() {
        return this._moveDate;
    }
    set moveDate(moveDate) {
        this._moveDate = moveDate;
    }
    /**
     * @property {string} MovingJob.moveTime current moveTime
     */
    get moveTime() {
        return this._moveTime;
    }
    set moveTime(moveTime) {
        this._moveTime = moveTime;
    }
    /**
     * @property {string} MovingJob.moverID current moverID
     */
    get moverID() {
        return this._moverID;
    }
    set moverID(moverID) {
        this._moverID = moverID;
    }
    /**
     * @property {Array<int>} Listing.coordinates client coordinates of the moving job
     */
    get coordinates() {
        return this._coordinates;
    }
    set coordinates(coords) {
        this.coordinates = coords;
    }
    /**
     * @property {int} Listing.distance distance between client and mover
     */
    get distance() {
        return this._distance;
    }
    set distance(dist) {
        this._distance = dist;
    }
}
export default MovingJob;