import './Intervals.css';
import ScoreDisplay from '../components/ScoreDisplay';
import NoteDisplay from '../components/NoteDisplay';
import AnswerButton from '../components/AnswerButton';
import PlayAgain from '../components/PlayAgain';
import { useState, useRef, useEffect } from 'react';
import { UpdateStreak } from '../lib/streak';
import { PlayOneNote } from '../lib/playNotes';
import OptionToggle from '../components/OptionToggle';
const NUM_QUESTIONS = 6;

function Pitch() {
  type Note = 'c/4' | 'c#/4' | 'd/4' | 'd#/4' | 'e/4' | 'f/4' | 'f#/4' | 'g/4'| 'g#/4' | 'a/5'| 'a#/5'| 'b/5' | 'c/5';
  const [note, setNote] = useState<Note>('c/4');
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [firstGuess, setFirstGuess] =useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const noteRef = useRef<Note>('c/4');

  const all_notes: Note[] = ['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/5', 'a#/5', 'b/5', 'c/5'];
  const noteAudio: Record<Note, string> = {
    'c/4': '../.././public/sounds/piano_c4.wav',
    'c#/4': '../.././public/sounds/piano_c4.wav',
    'd/4': '../.././public/sounds/piano_d4.wav',
    'd#/4': '../.././public/sounds/piano_c4.wav',
    'e/4': '../.././public/sounds/piano_e4.wav',
    'f/4': '../.././public/sounds/piano_f4.wav',
    'f#/4': '../.././public/sounds/piano_c4.wav',
    'g/4': '../.././public/sounds/piano_c4.wav',
    'g#/4': '../.././public/sounds/piano_c4.wav',
    'a/5': '../.././public/sounds/piano_c4.wav',
    'a#/5': '../.././public/sounds/piano_c4.wav',
    'b/5': '../.././public/sounds/piano_c4.wav',
    'c/5': '../.././public/sounds/piano_c4.wav',
  };

  const noteString: Record<Note, string> = {
    'c/4': 'C',
    'c#/4': 'C#',
    'd/4': 'D',
    'd#/4': 'D#',
    'e/4': 'E',
    'f/4': 'F',
    'f#/4': 'F#',
    'g/4': 'G',
    'g#/4': 'G#',
    'a/5': 'A',
    'a#/5': 'A#',
    'b/5': 'B',
    'c/5': 'C',
  };

  function GetRandomNote(notes: Note[]) {
    // Create immutable list of all_notes, shuffle, then take the first note
    let shuffledNotes = [...notes].sort(() => Math.random() - 0.5);
    let newNote = shuffledNotes[0];
    console.log(newNote);
    setNote(newNote);
    noteRef.current = newNote;
    
  }


  // Helper function to reset everything/begin another practice
  function Start() {
    setQuestionNumber(0);
    setStarted(true);
    setNumCorrect(0);
    GetRandomNote(all_notes);
    PlayOneNote(noteRef.current);
  }

  function HandleGuess(guess: string) {
    console.log(guess);
    if (guess === note) {
      GetRandomNote(all_notes);
      PlayOneNote(noteRef.current);
      setQuestionNumber(questionNumber+1);
      if (firstGuess) {
        setNumCorrect(numCorrect+1);
      }
    }
    else {
      setFirstGuess(false);
    }
  }


  useEffect(() => {
    setFirstGuess(true);
    if (questionNumber === NUM_QUESTIONS && shouldUpdate) {
      console.log("Should update!");
      UpdateStreak();
      setShouldUpdate(false);
    }
  }, [questionNumber, shouldUpdate]);

  // Return a start button by default, display everything else when clicked
  if (!started) {
    return (
      <>
      <h1>Pitch</h1>
      <button id="start-button" onClick={()=>Start()}>Let's go!</button>
        </>
    )
  }

  return (
    <>  
      <h1>Pitch</h1>
        {questionNumber >= NUM_QUESTIONS ? (
          <>
            <h2>You got {numCorrect}/{NUM_QUESTIONS}!</h2>
            <button onClick={() => {
              Start();
            }}>Keep practicing?</button>
          </>
        ) : (
          <>
          <ScoreDisplay questionNumber={questionNumber} totalQuestions={NUM_QUESTIONS} />
          <PlayAgain notes={[noteRef.current]} interval={false} chord={false} />
          <div className="answerChoices">
          {['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/5', 'a#/5', 'b/5', 'c/5']
          .map((note) => (
            <AnswerButton 
              key = {note}
              answer = {noteString[note as Note]}
              onClick = {() => HandleGuess(note)}
            />
          ))}
        </div>
          </>
        )}

    </>
  )
}

export default Pitch

