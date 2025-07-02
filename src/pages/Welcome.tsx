import './Home.css'

import NavButton from '../components/NavButton'

function Welcome() {
  return (
    <>
        <h1>Welcome!</h1>
        <NavButton to="/signup" label="Sign Up"/>
        <NavButton to="/login" label="Log In"/>
    </>
  )
}

export default Welcome;

