import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Profile,
  ListingSubmissionForm,
  ProfileSubmissionForm,
  LandingPage,
  Register,
  SignIn,
  Map,
  Listing,
  Rating,
  HostHomeViewRequests,
  HostHome,
  ClientHome,
  Conversations,
  Messages,
  MoverListings,
  MoverHome,
  Dashboard,
  Home
} from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/user/:userId" component={Profile} />
    <Route path="/addListing" component={ListingSubmissionForm} />
    <Route path="/addProfile" component={ProfileSubmissionForm} />
    <Route path="/register" component={Register} />
    <Route path="/signIn" component={SignIn} />
    <Route path="/map" component={Map} />
    <Route path="/viewlisting/:listingId" component={Listing} />
    <Route path="/hosthome" component={HostHome} />
    <Route path="/clientHome" component={ClientHome} />
    <Route path="/moverHome" component={MoverHome} />
    <Route path="/hostviewrequests/:listingId" component={HostHomeViewRequests} />
    <Route path="/chat/:userB" component={Messages} />
    <Route path="/inbox" component={Conversations} />
    <Route path="/rateyourbooking/:userId/:bookingRequestId" component={Rating} />
    <Route path="/moverListings" component={MoverListings} />
  </Switch>
);

export default Routes;
