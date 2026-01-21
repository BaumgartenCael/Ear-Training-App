import './Home.css'
import { GetStreak, GetUsername } from '../lib/streak'
import {useState, useEffect} from 'react'
import PracticeCard from '../components/PracticeCard'

import NavButton from '.././components/NavButton'

function Home() {
  const [streak, setStreak] = useState<number | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  useEffect(() => {
    async function fetchStreak() {
        const result = await GetStreak();
        setStreak(result);
    }
    async function fetchUsername() {
      const result = await GetUsername();
      setUsername(result);
    }
    fetchStreak();
    fetchUsername();
}, []);

  return (
    <>
        <h1>Welcome back, {username}!</h1>
        <div className="practice-cards">
          <PracticeCard label="Intervals" practiceRoute="/intervals" statsRoute="/intervals" text="Practice identifying the distance between two notes." img="../.././public/images/interval.png" ></PracticeCard>
          <PracticeCard label="Chords" practiceRoute="/chords" statsRoute="/chords" text="Practice identifying differing kinds of chords." img="../.././public/images/interval.png" ></PracticeCard>
          <PracticeCard label="Pitch" practiceRoute="/pitch" statsRoute="/pitch" text="Practice identifying differing pitches." img="../.././public/images/interval.png" ></PracticeCard>
        </div>
        {/* // <div id="practice-buttons">
        //   <div className="button-display">
        //     <p>Identify spaces between notes</p>
        //     <NavButton to="/intervals" label="Intervals" streak={streak}/>
        //   </div>
        //   <div className="button-display">
        //     <p>Identify chord tones, voicings, and inversions</p>
        //     <NavButton to="/chords" label="Chords" streak={streak}/>
        //   </div>
        //   <div className="button-display">
        //     <p>Identify notes by a single pitch</p>
        //     <NavButton to="/pitch" label="Pitch" streak={streak}/>
        //   </div>
        // </div> */}
    </>
  )
}

export default Home

