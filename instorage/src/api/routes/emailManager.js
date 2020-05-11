/**
 * Manages the API endpoints for email.
 */
 class EmailManager {
  /**
   * @memberof EmailManager
   * @param {string} name name of person to send email to
   * @param {string} email email address to send email to
   * @param {string} listingLink URL of listing in booking request
   */
  static emailBookingRequestConfirmation(name, email, listingLink, ratingLink) {
    fetch("/email/sendBookingConfirmationEmail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _name: name,
        _email: email,
        _listingLink: listingLink,
        _ratingLink: ratingLink,
      })
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  }
}
export default EmailManager;