// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Landing'; 
import SignLogin from './pages/SignLogin';
import Driver from './pages/Driver';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<SignLogin />} />
      <Route path="/Driver" element={<Driver />} />
    </Routes>
  );
};

export default App;
