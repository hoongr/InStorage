import firebase_admin
from firebase_admin import credentials
import pyrebase
import datetime

config = {
    "apiKey": "AIzaSyCcW_1JqS55gkW0294HRh5uT3LkoQtKfXw",
    "authDomain": "instorage-6b1ea.firebaseapp.com",
    "databaseURL": "https://instorage-6b1ea.firebaseio.com/",
    "storageBucket": "instorage-6b1ea.appspot.com",
    "serviceAccount": "/mnt/c/Users/Subhodh Madala/Documents/CS 130/Project/instorage-6b1ea-firebase-adminsdk-3l7py-9e29f4ea2a.json"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

class User:
    def __init__(self):
        self._name = ""
        self._college = ""
        self._bio = ""
        self._venmo = ""
        self._phoneNum = ""
    
    def getName(self):
        return self._name
    
    def setName(self, name):
        self._name = name

    name = property(getName, setName, "I'm the 'name' property.")

    def getCollege(self):
        return self._college

    def setCollege(self, college):
        self._college = college

    college = property(getCollege, setCollege, "I'm the 'college' property.")

    def getBio(self):
        return self._bio

    def setBio(self, bio):
        self._bio = bio

    bio = property(getBio, setBio, "I'm the 'bio' property.")

    def getVenmo(self):
        return self._venmo

    def setVenmo(self, venmo):
        self._venmo = venmo

    venmo = property(getVenmo, setVenmo, "I'm the 'venmo' property.")

    def getPhoneNum(self):
        return self._phoneNum

    def setPhoneNum(self, phoneNum):
        self._phoneNum = phoneNum

    phoneNum = property(getPhoneNum, setPhoneNum, "I'm the 'phoneNum' property.")

def addUser(user):
    db.child("Users").push(vars(user))


class Listing:
    def __init__(self):
        self._listingID = ""
        self._address = ""
        self._rentalPrice = 0
        self._squareFootageEstimate = 0
        # The date format will probably change depending on how they enter it via front end.
        self._dateStartAvailable = datetime.date.today()
        self._dateEndAvailable = datetime.date.today()

    def getListingID(self):
        return self._listingID

    def setListingID(self, id):
        self._listingID = id

    listingID = property(getListingID, setListingID, "I'm the 'listingID' property.")

    def getAddress(self):
        return self._address

    def setAddress(self, address):
        self._address = address

    address = property(getAddress, setAddress, "I'm the 'address' property.")
    
    def getRentalPrice(self):
        return self._rentalPrice

    def setRentalPrice(self, price):
        self._rentalPrice = price

    rentalPrice = property(getRentalPrice, setRentalPrice, "I'm the 'rentalPrice' property.")

    def getSquareFootageEstimate(self):
        return self._squareFootageEstimate

    def setSquareFootageEstimate(self, estimate):
        self._squareFootageEstimate = estimate

    squareFootageEstimate = property(getSquareFootageEstimate, setSquareFootageEstimate, "I'm the 'squareFootageEstimate' property.")

    def getDateStartAvailable(self):
        return self._dateStartAvailable;

    def setDateStartAvailable(self, date):
        self._dateStartAvailable = date

    dateStartAvailable = property(getDateStartAvailable, setDateStartAvailable, "I'm the 'dateStartAvailable' property.")

    def getDateEndAvailable(self):
        return self._dateEndAvailable;

    def setDateEndAvailable(self, date):
        self._dateEndAvailable = date

    dateEndAvailable = property(getDateEndAvailable, setDateEndAvailable, "I'm the 'dateEndAvailable' property.")


def postListing(listing):
    # Need to change dates to isoformat so that they are JSON serializable.
    listing.dateStartAvailable = listing.dateStartAvailable.isoformat()
    listing.dateEndAvailable = listing.dateEndAvailable.isoformat()
    db.child("Listings").push(vars(listing))

# Testing it!
newListing = Listing()
newListing.listingID = 0
newListing.address = "972 Hilgard Ave, Los Angeles, CA 90024"
newListing.rentalPrice = 420.69
newListing.squareFootageEstimate = 100
newListing.dateEndAvailable = datetime.date.today() + datetime.timedelta(days=1)
postListing(newListing)

newUser = User()
newUser.name = "Rat"
newUser.college = "UCLA"
newUser.bio = "Somebody help me store stuff, also feel free to venmo me money anytime."
newUser.venmo = "@Subhodh-Madala"
newUser.phoneNum = "9161111111"
addUser(newUser)
