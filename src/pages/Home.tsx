import './Home.css'

import NavButton from '.././components/NavButton'

function Home() {
  return (
    <>
        <h1>Ear Training App</h1>
        <NavButton to="/practice" label="Practice"/>
        <NavButton to="/intervals" label="Intervals"/>
    </>
  )
}

export default Home

