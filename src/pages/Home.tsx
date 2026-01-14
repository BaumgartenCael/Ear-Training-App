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
          <div className="button-display">
            <p>Identify spaces between notes</p>
            <NavButton to="/intervals" label="Intervals" streak={streak}/>
          </div>
          <div className="button-display">
            <p>Identify chord tones, voicings, and inversions</p>
            <NavButton to="/chords" label="Chords" streak={streak}/>
          </div>
          <div className="button-display">
            <p>Identify notes by a single pitch</p>
            <NavButton to="/pitch" label="Pitch" streak={streak}/>
          </div>
        </div>
    </>
  )
}

export default Home

