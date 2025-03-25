import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './signUp/SignUp';
import Home from './home/Home';
import Login from './login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
