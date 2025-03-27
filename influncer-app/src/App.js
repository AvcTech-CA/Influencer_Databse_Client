import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './signUp/SignUp';
import Home from './home/Home';
import Login from './login/Login';
import PrivateRoute from './PrivateRoute';
import Header from './header/Header';

function App() {
  return (
    <Router>
    <>
    <Header/>
    <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path="/" element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
        <Route path='/login' element={<Login/>}></Route>

      </Routes>
    </>
    </Router>
  );
}

export default App;
