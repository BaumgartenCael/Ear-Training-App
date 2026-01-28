import './Home.css'
import { GetStreak, GetUsername } from '../lib/streak'
import {useState, useReducer, useEffect} from 'react'
import PracticeCard from '../components/PracticeCard'

import NavButton from '.././components/NavButton'

function Home() {
  interface Streaks {
    chordStreak: number;
    intervalStreak: number;
    pitchStreak: number;
  }

  interface ModifyStreaks {
    streakType: "chord" | "interval" | "pitch";
    data: any;
  }

  function reducer(state: Streaks, action: ModifyStreaks) {
    const {streakType} = action;

    switch (streakType) {
      case "chord": {
        return { ...state, chordStreak: action.data};
      }
      case "interval": {
        return { ...state, intervalStreak: action.data};
      }
      case "pitch": {
        return { ...state, pitchStreak: action.data};
      }
      default:
        return state
    }
  }

  
  const [username, setUsername] = useState<string | undefined>();
  const [state, dispatch] = useReducer(reducer, {
    chordStreak: 0,
    intervalStreak: 0,
    pitchStreak: 0
  });

  useEffect(() => {
    async function fetchStreak(streakType: string) {
        const result = await GetStreak(streakType);
    }
    async function fetchUsername() {
      const result = await GetUsername();
      setUsername(result);
    }
    const chordStreak = GetStreak("chord");
    const intervalStreak = GetStreak("interval");
    const pitchStreak = GetStreak("pitch")
    dispatch({ streakType: "chord", data: chordStreak})
    dispatch({ streakType: "interval", data: intervalStreak})
    dispatch({ streakType: "pitch", data: pitchStreak})
    fetchUsername();
}, []);

  return (
    <>
        {username && <h1>Welcome back, {username}!</h1>}
        <div className="practice-cards">
          <PracticeCard label="Intervals" practiceRoute="/intervals" statsRoute="/intervals" text="Practice identifying the distance between two notes." img="../.././public/images/interval.png" streak={state.intervalStreak}></PracticeCard>
          <PracticeCard label="Chords" practiceRoute="/chords" statsRoute="/chords" text="Practice identifying differing kinds of chords." img="../.././public/images/interval.png" streak={state.chordStreak}></PracticeCard>
          <PracticeCard label="Pitch" practiceRoute="/pitch" statsRoute="/pitch" text="Practice identifying differing pitches." img="../.././public/images/interval.png" streak={state.pitchStreak}></PracticeCard>
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

