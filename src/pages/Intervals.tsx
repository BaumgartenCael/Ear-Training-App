import './Intervals.css';
import ScoreDisplay from '.././components/ScoreDisplay';
import NoteDisplay from '.././components/NoteDisplay';
import IntervalButton from '.././components/IntervalButton';
import { useState, useRef, useEffect } from 'react';
import { UpdateStreak } from '../lib/streak';

const NUM_QUESTIONS = 2;
let chord = false;

function Intervals() {
  type Note = 'c/4' | 'c#/4' | 'd/4' | 'd#/4' | 'e/4' | 'f/4' | 'f#/4' | 'g/4'| 'g#/4' | 'a/5'| 'a#/5'| 'b/5' | 'c/5';
  const [note1, setNote1] = useState<Note>('c/4');
  const [note2, setNote2] = useState<Note>('d/4');
  const [correctInterval, setCorrectInterval] = useState<number>();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [firstGuess, setFirstGuess] =useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);

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

  function GetRandomNotes(notes: Note[]) {
    // Create immutable list of all_notes, shuffle, then take the first two notes
    let shuffledNotes = [...notes].sort(() => Math.random() - 0.5);

    // Need to make variables to use them later in the function
    const newNote1 = shuffledNotes[0];
    const newNote2 = shuffledNotes[1];
    console.log(newNote1, newNote2);
    setNote1(newNote1);
    setNote2(newNote2);
    console.log(note1, note2);

    // Calculate difference between indices to set correct interval
    const index1 = all_notes.indexOf(newNote1);
    console.log("index 1: ", index1)
    const index2 = all_notes.indexOf(newNote2);
    console.log("index 2: ", index2)
    const interval = Math.abs(index1 - index2);
    setCorrectInterval(interval);
  }


  function PlayNotes() {
    let audio1 = new Audio(noteAudio[note1]);
    let audio2 = new Audio(noteAudio[note2]);

    // Play notes at the same time if chord mode active
    if (chord) {
      audio1.play();
      audio2.play();
    }

    // Play notes separately otherwise
    else {
      audio1.onended = () => {
        audio2.play();
      };
      audio1.play();
    }
  }

  // Helper function to reset everything/begin another practice
  function Start(isChord: boolean) {
    chord = isChord;
    setQuestionNumber(0);
    setStarted(true);
    setNumCorrect(0);
    GetRandomNotes(all_notes);
    PlayNotes();
  }

  function HandleGuess(guess: number) {
    console.log(guess);
    if (guess === correctInterval) {
      GetRandomNotes(all_notes);
      PlayNotes();
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
      <h1>Intervals</h1>
      <h2>How do you want to practice?</h2>
      <button onClick={() => {
          Start(false);
        }}>Play the notes separately</button>
      <button onClick={() => {
          Start(true);
        }}>Play the notes together</button>
        </>
    )
  }

  return (
    <>  
      <h1>Intervals</h1>
        {questionNumber >= NUM_QUESTIONS ? (
          <>
            <h2>You got {numCorrect}/{NUM_QUESTIONS}!</h2>
            <button onClick={() => {
              Start(false);
            }}>Practice more melodies?</button>
            <button onClick={() => {
              Start(true);
            }}>Practice more chords?</button>
          </>
        ) : (
          <>
          <ScoreDisplay questionNumber={questionNumber} totalQuestions={NUM_QUESTIONS} />
          <div className="answerChoices">
          {['m2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave']
          .map((interval, index) => (
            <IntervalButton 
              key = {interval}
              interval = {interval}
              onClick = {() => HandleGuess(index+1)}
            />
          ))}
        </div>
          </>
        )}

        {/* <h1>Intervals</h1>
        <div className="answerChoices">
          {['m2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave']
          .map((interval, index) => (
            <IntervalButton 
              key = {interval}
              interval = {interval}
              onClick = {() => HandleGuess(index+1)}
            />
          ))}
        </div> */}
    </>
  )
}

export default Intervals

