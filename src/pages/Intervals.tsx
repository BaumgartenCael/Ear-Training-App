import './Quiz.css';
import ScoreDisplay from '.././components/ScoreDisplay';
import NoteDisplay from '.././components/NoteDisplay';
import AnswerButton from '../components/AnswerButton';
import PlayAgain from '../components/PlayAgain';
import { useState, useRef, useEffect } from 'react';
import { UpdateStreak } from '../lib/streak';
import { PlayOneNote, PlayTwoNotes, PlayChord } from '../lib/playNotes';
import OptionToggle from '.././components/OptionToggle'
const NUM_QUESTIONS = 6;

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
  const [multipleOctaves, setMultipleOctaves] = useState<boolean>(false);
  const [chord, setChord] = useState<boolean>(false);
  const [justAscending, setJustAscending] = useState<boolean>(true);
  const [justDescending, setJustDescending] = useState<boolean>(true);

  const noteRef1 = useRef<Note>('c/4');
  const noteRef2 = useRef<Note>('d/4');

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
    let newNote1 = shuffledNotes[0];
    let newNote2 = shuffledNotes[1];
    let index1 = all_notes.indexOf(newNote1);
    let index2 = all_notes.indexOf(newNote2);

    // If the user wants ascending notes and the first note is higher, swap the notes
    if (!justDescending) {
      if (index1 > index2) {
        [newNote1, newNote2] = [newNote2, newNote1];
      }
    }

    // Same for descending
    else if (!justAscending) {
      if (index1 < index2) {
        [newNote1, newNote2] = [newNote2, newNote1];
      }
    }

    console.log("Local notes: ", newNote1, newNote2);
    setNote1(newNote1);
    noteRef1.current = newNote1;
    setNote2(newNote2);
    noteRef2.current = newNote2;
    console.log("Stored notes: ", noteRef1.current, noteRef2.current);

    // Calculate difference between indices to set correct interval
    console.log("index 1: ", index1)
    console.log("index 2: ", index2)
    const interval = Math.abs(index1 - index2);
    setCorrectInterval(interval);
  }


  // Helper function to reset everything/begin another practice
  function Start() {
    if (!justAscending && !justDescending) {
      console.log("Please select ascending, descending, or both");
      return;
    }
    setQuestionNumber(0);
    setStarted(true);
    setNumCorrect(0);
    GetRandomNotes(all_notes);
    chord? PlayChord([noteRef1.current, noteRef2.current]) : PlayTwoNotes(noteRef1.current, noteRef2.current);
  }


  function HandleGuess(guess: number) {
    console.log(guess);
    if (guess === correctInterval) {
      GetRandomNotes(all_notes);
      chord? PlayChord([noteRef1.current, noteRef2.current]) : PlayTwoNotes(noteRef1.current, noteRef2.current);
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
    console.log("Button pressed!", multipleOctaves);
    setFirstGuess(true);
    if (questionNumber === NUM_QUESTIONS && shouldUpdate) {
      console.log("Should update!");
      UpdateStreak();
      setShouldUpdate(false);
    }
  }, [questionNumber, shouldUpdate, multipleOctaves]);

  // Return a start button by default, display everything else when clicked
  if (!started) {
    return (
      <div id="param-screen">
        <h1>Intervals</h1>
        <h2>How do you want to practice?</h2>
        <div id="toggle-container">
          <OptionToggle isOn={multipleOctaves} text="Multiple octaves?" toggle={setMultipleOctaves}></OptionToggle>
          <OptionToggle isOn={chord} text="Play notes simultaneously?" toggle={setChord}></OptionToggle>
          <OptionToggle isOn={justAscending} text="Ascending notes?" toggle={setJustAscending}></OptionToggle>
          <OptionToggle isOn={justDescending} text="Descending notes?" toggle={setJustDescending}></OptionToggle>
        </div>
        <button id="start-button" onClick={()=>Start()}>Let's go!</button>
      </div>
    )
  }

  return (
    <>  
      <h1 id="title">Intervals</h1>
        {questionNumber >= NUM_QUESTIONS ? (
          <>
            <h2>You got {numCorrect}/{NUM_QUESTIONS}!</h2>
            <button onClick={() => {
              Start();
            }}>Practice more melodies?</button>
            <button onClick={() => {
              Start();
            }}>Practice more chords?</button>
          </>
        ) : (
          <>
          <div className="quiz-container">
            <div className='progress-bar'>
              <ScoreDisplay questionNumber={questionNumber} totalQuestions={NUM_QUESTIONS} />
              <PlayAgain notes={[noteRef1.current, noteRef2.current]} interval={!chord} chord={chord} />
            </div>
            <div className="answerChoices">
              {['m2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave']
              .map((interval, index) => (
                <AnswerButton 
                  key = {interval}
                  answer = {interval}
                  onClick = {() => HandleGuess(index+1)}
            />
            ))}
          </div>
        </div>
          </>
        )}

        {}
    </>
  )
}

export default Intervals

