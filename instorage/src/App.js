import './App.css';
import React from 'react';
import Routes from './Routes';
import Navbar from './containers/Navbar/Navbar';
import { BrowserRouter } from "react-router-dom";
import { withAuthentication } from './Session';

const App = () => (
  <BrowserRouter basename='/'>
    <Navbar />
    <Routes/>
  </BrowserRouter>
);


export default withAuthentication(App);
