import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from'./pages/Home';
import Practice from './pages/Practice';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import NavBar from './components/NavBar';

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
      </Routes>
    </>
  )
}

export default App
