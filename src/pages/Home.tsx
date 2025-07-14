import './Home.css'
import { GetStreak } from '../lib/streak'
import {useState, useEffect} from 'react'

import NavButton from '.././components/NavButton'

function Home() {
  const [streak, setStreak] = useState<number | undefined>();
  useEffect(() => {
    async function fetchStreak() {
        const result = await GetStreak();
        setStreak(result);
    }
    fetchStreak();
}, []);

  return (
    <>
        <h1>Ear Training App</h1>
        <div id="practice-buttons">
          <NavButton to="/intervals" label="Intervals" streak={streak}/>
          <NavButton to="/intervals" label="Chords" streak={streak}/>
        </div>
    </>
  )
}

export default Home

