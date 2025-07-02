import { Routes, Route } from 'react-router-dom';
import Home from'./pages/Home';
import Practice from './pages/Practice';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
