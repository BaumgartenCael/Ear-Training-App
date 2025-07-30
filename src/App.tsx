import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from'./pages/Home';
import Practice from './pages/Practice';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Pitch from './pages/Pitch'
import NavBar from './components/NavBar';
import Intervals from './pages/Intervals';
import Chords from './pages/Chords';

function App() {
  const location = useLocation();

  const noNav = ['/', '/login', '/signup'];
  const shouldHideNav = noNav.includes(location.pathname);
  return (
    <>
    {!shouldHideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/intervals" element={<Intervals />} />
        <Route path="/pitch" element={<Pitch/>} />
        <Route path="/chords" element={<Chords/>} />
      </Routes>
    </>
  )
}

export default App
