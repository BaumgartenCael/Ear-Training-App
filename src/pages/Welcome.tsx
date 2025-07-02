import './Welcome.css'

import NavButton from '../components/NavButton'

function Welcome() {
  return (
    <>
        <h1 id="welcomeText">Welcome!</h1>
        <div id="welcomeButtons">
          <NavButton to="/signup" label="Sign Up"/>
          <NavButton to="/login" label="Log In"/>
        </div>
    </>
  )
}

export default Welcome;

