import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/Signup';
import Header from './components/Header';


function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
