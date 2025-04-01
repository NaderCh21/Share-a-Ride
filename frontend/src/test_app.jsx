import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import PassengerRides from './rides_passengers.jsx'
import Home from './App.jsx'

function TestApp(){
  return(
    <Router>
      <div className='App_Test'>

        <nav>
          <ul>
            <li> <Link to='/home'></Link></li>
            <li> <Link to= '/passenger-rides'></Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element = {<Home/>}/>
          <Route path='/passenger-rides' element= {<PassengerRides/>}/>
        </Routes>
      </div>
    </Router>
  );
  
}

export default TestApp; 