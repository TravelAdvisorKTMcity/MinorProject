import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Kalinchowk from './explore';
import Home from './HomePage/homepage';
import Place from './Destination/destination';

import Rel from './Destination/category/religious';
import His from './Destination/category/historical';
import Hik from './Destination/category/hiking';
import Pic from './Destination/category/picnic';
import Park from './Destination/category/park';

import Nag from './Destination/category/location/nagarkot';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-5nr5hj8ssy8oo40x.jp.auth0.com"
    clientId="bi2KyQMHedpm1BxB0m8rH9AlPO5Yf9VF"
    redirectUri="http://localhost:3000"
  >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Kalinchowk />} />
        <Route path="/Apple" element={<Place />} />
        <Route path="/religious" element={<Rel />} />
        <Route path="/historical" element={<His />} />
        <Route path="/hiking" element={<Hik />} />
        <Route path="/picnic" element={<Pic />} />
        <Route path="/park" element={<Park />} />
        
        <Route path="/nagarkot" element={<Nag />} />
        
      </Routes>
    </Router>
  </Auth0Provider>
);

reportWebVitals();
