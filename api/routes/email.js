const mailjet = require ('node-mailjet')
.connect('bdd3ef2c365540c5aa0f367444777c6e', '21d295f40f6a4a03df4dfa950a103208')
var express = require("express");
var router = express.Router();

router
  .route("/sendBookingConfirmationEmail")
  .post(function(req, res) {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      "Messages": [
        {
          "From": {
            "Email": 'instorage@outlook.com',
            "Name": 'InStorage',
          },
          "To": [
            {
              "Email": req.body._email,
              "Name": req.body._name,
            },
          ],
          "TemplateID": 1103007,
          "TemplateLanguage": true,
          "Subject": 'Booking confirmed!',
          "Variables": {
  				    "name": req.body._name,
              "listingLink": req.body._listingLink,
              "ratingLink" : req.body._ratingLink
  				},
        },
      ],
    })
    request
      .then(result => {
        console.log(result.body)
      })
      .catch(err => {
        console.log(err.statusCode)
      })
  });

module.exports = router;
