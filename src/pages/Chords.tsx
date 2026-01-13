import './Quiz.css';
import ScoreDisplay from '../components/ScoreDisplay';
import NoteDisplay from '../components/NoteDisplay';
import AnswerButton from '../components/AnswerButton';
import PlayAgain from '../components/PlayAgain';
import { useState, useRef, useEffect } from 'react';
import { UpdateStreak } from '../lib/streak';
import {  PlayChord } from '../lib/playNotes';
import OptionToggle from '../components/OptionToggle'
const NUM_QUESTIONS = 6;

function Chords() {
  type Note = 'c/4' | 'c#/4' | 'd/4' | 'd#/4' | 'e/4' | 'f/4' | 'f#/4' | 'g/4'| 'g#/4' | 'a/5'| 'a#/5'| 'b/5' | 'c/5';
  const [correctChord, setCorrectChord] = useState<Note>();
  const [guessedChord, setGuessedChord] = useState<Note>();
  const [isMinorEnabled, setIsMinorEnabled] = useState<boolean>(false);
  const [isMinor, setIsMinor] = useState<boolean>(false);
  const [minorGuessed, setMinorGuessed] = useState<boolean>(false);
  const [isDiminishedEnabled, setIsDiminishedEnabled] = useState<boolean>(false);
  const [isDiminished, setIsDiminished] = useState<boolean>(false);
  const [diminishedGuessed, setDiminishedGuessed] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [firstGuess, setFirstGuess] =useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true);
  const [multipleOctaves, setMultipleOctaves] = useState<boolean>(false);

  const chordRef = useRef<Note[]>([]);

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

  function GetRandomChord(notes: Note[]) {
    // Create immutable list of all_notes, shuffle, then take the first note. Build
    // the chord with this note as the tonic
    let shuffledNotes = [...notes].sort(() => Math.random() - 0.5);
    const newNote = shuffledNotes[0];
    setCorrectChord(newNote);

    // Randomly create the parameters of the chord
    let minor = (Math.random() > .5);
    let diminished = (Math.random() > .5);
    console.log("Minor: ", minor);
    console.log("Diminished: ", diminished);
    setIsMinor(minor);
    setIsDiminished(diminished);
    const newChord = BuildChord(newNote, minor, diminished);
    chordRef.current = newChord;
  }

  function BuildChord(tonic: Note, minor: boolean, diminished: boolean) {
    let chord: Note[] = [];

    // Build a basic major chord first, find the indexes of each chord tone: 
    // the third four half steps above the tonic and the fifth seven above
    let tonicIndex = all_notes.indexOf(tonic);
    let thirdIndex = tonicIndex + 4;
    let fifthIndex = tonicIndex + 7;
    console.log("First round : ", thirdIndex, fifthIndex);

    // Adjust the chord tones to fit the parameters, go down an octave if needed
    // to prevent overflow of the array
    if (isDiminishedEnabled && diminished) {
      thirdIndex -= 1
      fifthIndex -= 1;
    }
    else if (isMinorEnabled && minor) {thirdIndex -= 1;}
    if (thirdIndex > all_notes.length - 1) {thirdIndex -= 12;}
    if (fifthIndex > all_notes.length - 1) {fifthIndex -= 12;}

    // Get each chord tone from the notes array and add them to the chord
    const root = all_notes[tonicIndex];
    const third = all_notes[thirdIndex];
    const fifth = all_notes[fifthIndex];
    chord.push(root as Note);
    chord.push(third as Note);
    chord.push(fifth as Note);

    console.log(chord);
    console.log(correctChord);
    return chord;
  }


  // Helper function to reset everything/begin another practice
  function Start() {
    setQuestionNumber(0);
    setStarted(true);
    setNumCorrect(0);
    GetRandomChord(all_notes);
    PlayChord(chordRef.current);
  }


  function HandleGuess() {

    // If we are specifying diminished chords and the guess is incorrect, they try again
    console.log("Guessed chord: ", guessedChord)
    if (isDiminishedEnabled && diminishedGuessed !== isDiminished) {
      setFirstGuess(false);
      console.log("Wrong diminished")
      return
    }

    if (isMinorEnabled && minorGuessed !== isMinor) {
      setFirstGuess(false);
      console.log("Wrong minor")
      return
    }

    if (guessedChord === correctChord) {
      GetRandomChord(all_notes);
      PlayChord(chordRef.current);
      setQuestionNumber(questionNumber+1);
      setGuessedChord(undefined)
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
      <>
      <h1>Chords</h1>
      <h2>How do you want to practice?</h2>
      <div id="toggle-container">
        <OptionToggle isOn={multipleOctaves} text="Multiple octaves?" toggle={setMultipleOctaves}></OptionToggle>
        <OptionToggle isOn={isMinorEnabled} text="Consider minor and major?" toggle={setIsMinorEnabled}></OptionToggle>
        <OptionToggle isOn={isDiminishedEnabled} text="Diminished chords?" toggle={setIsDiminishedEnabled}></OptionToggle>
        {/* <OptionToggle isOn={justDescending} text="Descending notes?" toggle={setJustDescending}></OptionToggle> */}
      </div>
      <button id="start-button" onClick={()=>Start()}>Let's go!</button>
        </>
    )
  }

  return (
    <>  
      <h1 id="title">Chords</h1>
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
              <PlayAgain notes={chordRef.current} interval={false} chord={true} />
            </div>
            <div className="chord-buttons">
              <div id="class-types">
                {isMinorEnabled && <AnswerButton answer = "Minor" onClick = {() => setMinorGuessed(!minorGuessed)} toggle ={true} />}
                {isDiminishedEnabled && <AnswerButton answer = "Diminished" onClick = {() => setDiminishedGuessed(!diminishedGuessed)} toggle={true}/>}
              </div>
              <div className = "answerChoices">
            {['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/5', 'a#/5', 'b/5']
            .map((note) => (
              <button 
                key = {note}
                onClick = {() => setGuessedChord(note as Note)}
                className = {guessedChord === note? 'on': ''}
              >{noteString[note as Note]}</button>
            ))}
            <button id="submit-button" onClick={HandleGuess}>Submit</button>
            </div>
            </div>
          </div>
        </>
        )}

        {}
    </>
  )
}

export default Chords;

