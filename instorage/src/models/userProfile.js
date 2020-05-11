/**
 * Holds attributes for each user profile.
 */
class UserProfile {
    /**
     * Takes in JSON containing attributes of a user profile
     * and creates the corresponding object.
     * @param {string} bio user's bio
     * @param {string} college user's college
     * @param {string} name user's name
     * @param {string} phoneNum user's phone number
     * @param {string} userID user's user ID
     * @param {string} userType user's user type (client|host|mover)
     * @param {string} venmo user's venmo account
     * @param {string} email user's email address
     * @param {object} ratings array of ratings given by clients
     * @param {number} averageRating average calculated from ratings
     * @param {string} profilePicURL URL pointing to the user's profile picture
     */
    constructor(bio, college, name, phoneNum, userID, venmo, userType, email, ratings, averageRating, profilePicURL) {
        this._bio = bio;
        this._college = college;
        this._name = name;
        this._phoneNum = phoneNum;
        this._userID = userID;
        this._userType = userType;
        this._venmo = venmo;
        this._email = email;
        this._ratings = ratings;
        this._averageRating = averageRating;
        this._profilePicURL = profilePicURL;
    }
    /**
     * @property {string} UserProfile.bio user's bio
     */
    get bio() {
        return this._bio;
    }
    set bio(newBio) {
        this._bio = newBio;
    }
    /**
     * @property {string} UserProfile.college user's college
     */
    get college() {
        return this._college;
    }
    set college(newCollege) {
        this._college = newCollege;
    }
    /**
     * @property {string} UserProfile.name user's name
     */
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    /**
     * @property {string} UserProfile.phoneNum user's phone number
     */
    get phoneNum() {
        return this._phoneNum;
    }
    set phoneNum(newPhoneNum) {
        this._phoneNum = newPhoneNum;
    }
    /**
     * @property {string} Listing.userID user's user ID
     */
    get userID() {
        return this._userID;
    }
    set userID(newUserID) {
        this._userID = newUserID;
    }
    /**
     * @property {string} Listing.userType user's userType
     */
    get userType() {
        return this._userType;
    }
    set userType(newType) {
        this._userType = newType;
    }
    /**
     * @property {string} UserProfile.venmo user's venmo
     */
    get venmo() {
        return this._venmo;
    }
    set venmo(newVenmo) {
        this._venmo = newVenmo;
    }
    /**
     * @property {string} UserProfile.email user's email
     */
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    /**
     * @property {object} UserProfile.ratings list of user's ratings
     */
    get ratings() {
        return this._ratings;
    }
    set ratings(ratings) {
        this._ratings = ratings;
    }
    /**
     * @property {number} UserProfile.averageRating user's average rating
     */
    get averageRating() {
        return this._averageRating;
    }
    set averageRating(averageRating) {
        this._averageRating = averageRating;
    }
    /**
     * @property {string} UserProfile.profilePicURL URL pointing to user's profile picture
     */
    get profilePicURL() {
        return this._profilePicURL;
    }
    set profilePicURL(url) {
        this._profilePicURL = url;
    }
}
export default UserProfile;