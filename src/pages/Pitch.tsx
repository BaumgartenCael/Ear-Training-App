import './Quiz.css';
import ScoreDisplay from '../components/ScoreDisplay';
import NoteDisplay from '../components/NoteDisplay';
import AnswerButton from '../components/AnswerButton';
import PlayAgain from '../components/PlayAgain';
import { useState, useRef, useEffect } from 'react';
import { UpdateStreak } from '../lib/streak';
import { PlayOneNote } from '../lib/playNotes';
import OptionToggle from '../components/OptionToggle';
import {all_notes, noteAudio, noteString} from '../types/note.ts'
import type {Note} from '../types/note.ts'
const NUM_QUESTIONS = 6;

function Pitch() {
  const [note, setNote] = useState<Note>('c/4');
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [firstGuess, setFirstGuess] =useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const noteRef = useRef<Note>('c/4');


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
      if (questionNumber + 1 < NUM_QUESTIONS) {
        PlayOneNote(noteRef.current);
      }
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
      UpdateStreak('pitch');
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
          <div className='quiz-container'>
            <div className="progress-bar">
              <ScoreDisplay questionNumber={questionNumber} totalQuestions={NUM_QUESTIONS} />
              <PlayAgain notes={[noteRef.current]} interval={false} chord={false} />
            </div>
            <div className="answerChoices">
            {all_notes.map((note) => (
              <AnswerButton 
                key = {note}
                answer = {noteString[note as Note]}
                onClick = {() => HandleGuess(note)}
              />
            ))}
          </div>
          </div>
          </>
        )}

    </>
  )
}

export default Pitch

