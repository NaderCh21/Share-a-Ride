import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import PassengerRides from './rides_passengers'
import Home from './App.jsx'
import Landing from './Landing'; 
import SignLogin from './pages/SignLogin';
import Driver from './pages/Driver';
import PassengerProfile from './passenger_profile'

function TestApp(){
  return(
    <Router>
      <div className='App_Test'>
{ 
        <nav>
          <ul>
            <li> <Link to='/'></Link></li>
            <li> <Link to= '/passenger-rides'></Link></li>
            <li> <Link to= '/passenger-profile'></Link></li>
          </ul>
        </nav> }

        <Routes>
              
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignLogin />} />
          <Route path="/Driver" element={<Driver />} />
          <Route path='/passenger-rides' element= {<PassengerRides/>}/>
          <Route path='/passenger-profile' element= {<PassengerProfile/>}/>
        </Routes>
      </div>
    </Router>
  );
  
}

export default TestApp; 