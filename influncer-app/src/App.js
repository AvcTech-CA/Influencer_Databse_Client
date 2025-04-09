import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './signUp/SignUp';
import Home from './home/Home';
import Login from './login/Login';
import PrivateRoute from './PrivateRoute';
import Header from './header/Header';
import UserDetails from './userDetails/UserDetails';
import InfluencerCard from './influencer-Data/InfluencerCard';
import InfluencerDetails from './influencerDetails/InfluencerDetails';
function App() {
  return (
    <Router>
    <>
    <Header/>
    <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path="/" element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/allInfluncers" element={<InfluencerCard />} />
                    <Route path="/influencerDetails" element={<InfluencerDetails />} />


        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<UserDetails/>}></Route>
      </Routes>
    </>
    </Router>
  );
}

export default App;
