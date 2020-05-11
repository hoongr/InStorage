const EmailManager = require("../src/api/routes/emailManager");
var fetchMock = require("fetch-mock");

afterEach(fetchMock.reset);

describe("EmailManager tests", () => {
  test("Send email booking request", () => {
    fetchMock.post("/email/sendBookingConfirmationEmail", {
      message: "Email sent"
    });
    var obj = {
      _name: "name",
      _email: "a@a.com",
      _listingLink: "url"
    };
    EmailManager.default.emailBookingRequestConfirmation(
      obj._name,
      obj._email,
      obj._listingLink
    );
    return fetchMock.flush().then(() => {
      return expect(fetchMock.lastOptions().body).toEqual(JSON.stringify(obj));
    });
  });
});
