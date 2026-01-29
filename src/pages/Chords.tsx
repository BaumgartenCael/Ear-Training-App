import './Quiz.css';
import ScoreDisplay from '../components/ScoreDisplay';
import NoteDisplay from '../components/NoteDisplay';
import AnswerButton from '../components/AnswerButton';
import Feedback from '../components/Feedback';
import PlayAgain from '../components/PlayAgain';
import { useState, useRef, useEffect, useReducer } from 'react';
import { UpdateStreak } from '../lib/streak';
import {  PlayChord } from '../lib/playNotes';
import OptionToggle from '../components/OptionToggle'
import {all_notes, noteAudio, noteString} from '../types/note.ts'
import type {Note} from '../types/note.ts'
const NUM_QUESTIONS = 6;

function Chords() {

  //
  //// INITIALIZING USEREDUCERS
  //


  // Initializing reducer function for controlling the general state of the page
  interface systemState {
      questionNumber: number, 
      numCorrect: number,
      firstGuess: boolean,
      started: boolean,
      shouldUpdate: boolean,
      errorMessage: string
    }

  interface systemActions {
    type: "start" | "wrongGuess" | "nextQuestion" | "reset" 
    correct?: boolean | null
    data?: any
  }


  function systemReducer(state: systemState, action: systemActions) {
    const {type} = action;
    switch (type) {
        case "nextQuestion":
          return {
            ...state,
            questionNumber: state.questionNumber + 1,
            numCorrect: state.firstGuess? state.numCorrect + 1: state.numCorrect,
            firstGuess: true,
          }
        
        case "start":
          return {
            ...state,
            started: true,
            questionNumber: 0,
            numCorrect: 0,
            firstGuess: true
          }
        
        case "wrongGuess":
          return {...state, 
            firstGuess: false,
            errorMessage: action.data
          }
        
        case "reset":
          return {...state,
            started: false
          }
      default:
        return state
    }
  }

  const [system, systemDispatch] = useReducer(systemReducer, {
    questionNumber: 0, 
    numCorrect: 0,
    firstGuess: true,
    started: false,
    shouldUpdate: false,
    errorMessage: "",
  })

  // Initialize the reducer for tracking the details of the generated chord
  interface chordState  {
      isMajorMinorEnabled: boolean,
      isDiminishedEnabled: boolean,
      isSeventhsEnabled: boolean,
      isPitchEnabled: boolean,
      correctPitch: Note | null,
      isMinor: boolean,
      isMajor: boolean,
      isDiminished: boolean,
      correctSeventh: "minor" | "major" | null,
    }

  interface chordActions {
      param: "pitch" | "minor" | "major" | "diminished" | "seventh" | "reset"
      type: "enable" | "set" 
      data?: any
    }
  
  function chordReducer(state: chordState, action: chordActions) {
      const {param, type} = action;
      switch (type) {
        
        // Switch between enabling parameters and applying them to the chord
        case "enable":

          switch (param) {
            case "pitch": 
              return{...state, isPitchEnabled: action.data};
            
            case "minor": 
              return{...state, isMajorMinorEnabled: action.data}
            
            case "major":
              return{...state, isMajorMinorEnabled: action.data}
            
            case "diminished": 
              return{...state, isDiminishedEnabled: action.data}
            
            case "seventh": 
              return{...state, isSeventhsEnabled: action.data}
          }

        case "set":

          switch (param) {
            case "pitch":
              return state.isPitchEnabled? {...state, correctPitch: action.data}: state;
            
            case "minor":
              return state.isMajorMinorEnabled? {...state, isMinor: action.data}: state;
              
            case "major":
              return state.isMajorMinorEnabled? {...state, isMajor: action.data}: state;
                
            case "diminished":
              return state.isDiminishedEnabled? {...state, isDiminished: action.data}: state;
            
            case "seventh":
              return state.isSeventhsEnabled? {...state, correctSeventh: action.data}: state;
                
            
            case "reset":
              return {
                ...state,
                correctPitch: null,
                isMinor: false,
                isMajor: false,
                isDiminished: false,
                correctSeventh: null
              }
          }

        default: 
          return state;
      }
    }

  const [chord, chordDispatch] = useReducer(chordReducer, {
      isMajorMinorEnabled: false,
      isDiminishedEnabled: false,
      isSeventhsEnabled: false,
      isPitchEnabled: false,
      correctPitch: null,
      isMinor: false,
      isMajor: false,
      isDiminished: false,
      correctSeventh: null,
    })

  // Initialize the reducer for guessing different details of the chord
  interface guessState {
      pitch: Note | null,
      minor: boolean,
      major: boolean,
      diminished: boolean,
      seventh: "minor" | "major" | null,
    }

  interface guessActions {
      type: "pitch" | "minor" | "major" | "diminished" | "seventh" | "reset"
      data: any
    }
  
  function guessReducer(state: guessState, action: guessActions) {
      const {type} = action;
      switch (type) {
        case "reset":
          return {
            ...state,
            pitch: null,
            minor: false,
            major: false,
            diminished: false,
            seventh: null,
          }
        case "pitch":
          return {...state, pitch: action.data};

        case "minor":
          return {...state, minor: action.data};
           
        case "major":
          return {...state, major: action.data};
            
        case "diminished":
          return {...state, diminished: action.data};
        
        case "seventh":
          return {...state, seventh: action.data}
            
        default:
          return state;
      }
  }
  const [guess, guessDispatch] = useReducer(guessReducer, {
    pitch: null,
    minor: false,
    major: false,
    diminished: false,
    seventh: null,
  })
  const chordRef = useRef<Note[]>([]);


  function GetRandomChord(notes: Note[]) {

    // Create immutable list of all_notes, shuffle, then take the first note. Build
    // the chord with this note as the tonic
    let shuffledNotes = [...notes].sort(() => Math.random() - 0.5);
    const newNote = shuffledNotes[0];
    chordDispatch({param: "pitch", type: "set", data: newNote});

    // Randomly create the parameters of the chord
    let minor = (Math.random() > .5);
    let diminished = (Math.random() > .5);
    let seven = Math.random() > .5;
    
    // If this is a seven chord, determine what kind of seven
    let sevenType = null
    console.log("Seven detector status: ", seven)
    if (seven) {
      console.log("Seven detected!")
      sevenType = (Math.random() > .5? -1: 1);
      chordDispatch({param: "seventh", type: "set", data: sevenType === -1? "minor": "major"})
    }

    
    chordDispatch({param: "major", type: "set", data: !minor})
    chordDispatch({param: "minor", type: "set", data: minor})
    chordDispatch({param: "diminished", type: "set", data: diminished})
    const newChord = BuildChord(newNote, minor, diminished, sevenType);
    chordRef.current = newChord;
  }

  function BuildChord(tonic: Note, minor: boolean, diminished: boolean, seven: number | null) {
    let newChord: Note[] = [];

    // Build a basic major chord first, find the indexes of each chord tone: 
    // the third four half steps above the tonic and the fifth seven above
    let tonicIndex = all_notes.indexOf(tonic);
    let thirdIndex = tonicIndex + 4;
    let fifthIndex = tonicIndex + 7;
    

    // Adjust the chord tones to fit the parameters, go down an octave if needed
    // to prevent overflow of the array
    if (chord.isDiminishedEnabled && diminished) {
      // thirdIndex -= 1
      fifthIndex -= 1;
    }

    if (chord.isMajorMinorEnabled && minor) {thirdIndex -= 1;}
    if (thirdIndex > all_notes.length - 1) {thirdIndex -= 12;}
    if (fifthIndex > all_notes.length - 1) {fifthIndex -= 12;}

    // Get each chord tone from the notes array and add them to the chord
    const root = all_notes[tonicIndex];
    const third = all_notes[thirdIndex];
    const fifth = all_notes[fifthIndex];

    newChord.push(root as Note);
    newChord.push(third as Note);
    newChord.push(fifth as Note);

    // add the seventh randomly if parameters request
    if (seven) {
      console.log("This should pop up when seventh is present")
      let seventhIndex = tonicIndex
      if (seven === 1) {
        seventhIndex += 11;
      }
      else if (seven === -1) {
        seventhIndex += 10;
      }
      if (seventhIndex > all_notes.length - 1) {seventhIndex -= 12;}
      newChord.push(all_notes[seventhIndex])
      console.log("Seventh: ", all_notes[seventhIndex])
    }

    console.log('Chord with maybe seventh!: ', newChord);
    return newChord;
  }


  // Helper function to reset everything/begin another practice
  function Start() {
    chordDispatch({param: "reset", type: "set"})
    systemDispatch({type: "start"});
    GetRandomChord(all_notes);
    PlayChord(chordRef.current);
  }

  // Helper function to reset all necessary states when moving to another question

  function HandleGuess() {

    // If we are specifying diminished chords and the guess is incorrect, they try again
    if (chord.isDiminishedEnabled && guess.diminished !== chord.isDiminished) {
      systemDispatch({type: "wrongGuess", data: 'Does this chord have a flat fifth?'})
      return
    }

    if (chord.isMajorMinorEnabled && (guess.minor !== chord.isMinor || guess.major !== chord.isMajor)) {
      systemDispatch({type: "wrongGuess", data: 'Is this a major or minor chord?'})
      return
    }

    if (chord.isSeventhsEnabled && (guess.seventh !== chord.correctSeventh)) {
      systemDispatch({type: "wrongGuess", data: 'Is this a seventh chord? If so, what kind of seventh?'})
      return
    }

    if (chord.isPitchEnabled && guess.pitch !== chord.correctPitch) {
      systemDispatch({type: "wrongGuess", data: "You're almost there, but your pitch is off."})
      return
    }

    chordDispatch({param: "reset", type: "set"})
    guessDispatch({type: "reset", data: null})

    GetRandomChord(all_notes);
    systemDispatch({type: "nextQuestion"})
    if (system.questionNumber + 1 < NUM_QUESTIONS) {
      PlayChord(chordRef.current);
    }

    
  }


  // useEffect(() => {
  //   setFirstGuess(true);
  //   if (questionNumber === NUM_QUESTIONS && shouldUpdate) {
  //     console.log("Should update!");
  //     UpdateStreak('chord');
  //     setShouldUpdate(false);
  //   }
  // }, [questionNumber, shouldUpdate, multipleOctaves]);

  // Return a start button by default, display everything else when clicked
  if (!system.started) {
    return (
      <>
      <h1>Chords</h1>
      <h2>How would you like to practice?</h2>
      {/* <p>Each item you select will add another layer of specificity required to correctly identify the chord.</p> */}
      <div id="toggle-container">
        <button onClick={() => chordDispatch({param: "pitch", type: "enable", data: !chord.isPitchEnabled})}>Identify the pitch of the chord?</button>
        <button onClick={() => chordDispatch({param: "minor", type: "enable", data: !chord.isMajorMinorEnabled})}>Differentiate major and minor chords?</button>
        <button onClick={() => chordDispatch({param: "diminished", type: "enable", data: !chord.isDiminishedEnabled})}>Identify diminished chords?</button>
        <button onClick={() => chordDispatch({param: "seventh", type: "enable", data: !chord.isSeventhsEnabled})}>Identify seventh chords?</button>
        {/* <OptionToggle isOn={multipleOctaves} text="Chords stretch across multiple octaves?" toggle={setMultipleOctaves}></OptionToggle>
        <OptionToggle isOn={isPitchEnabled} text="Identify the pitch of the chord?" toggle={setIsPitchEnabled}></OptionToggle>
        <OptionToggle isOn={isMajorMinorEnabled} text="Differentiate major and minor chords?" toggle={setIsMajorMinorEnabled}></OptionToggle>
        <OptionToggle isOn={isDiminishedEnabled} text="Identify diminished chords?" toggle={setIsDiminishedEnabled}></OptionToggle>
        <OptionToggle isOn={isSeventhsEnabled} text="Identify seventh chords?" toggle={setIsSeventhsEnabled}></OptionToggle> */}
        {/* <OptionToggle isOn={justDescending} text="Descending notes?" toggle={setJustDescending}></OptionToggle> */}
      </div>
      <button id="start-button" onClick={()=>Start()}>Let's go!</button>
        </>
    )
  }

  return (
    <>  
      <h1 id="title">Chords</h1>
        {system.questionNumber >= NUM_QUESTIONS ? (
          <>
            <h2>You got {system.numCorrect}/{NUM_QUESTIONS}!</h2>
            <button onClick={() => {
              Start();
            }}>Practice more melodies?</button>
            <button onClick={() => {
              Start();
            }}>Practice more chords?</button>
          </>
        ) : (
          <>
          {system.firstGuess === false && <Feedback message={system.errorMessage} correct={false}/>}
          <button onClick={() => systemDispatch({type: "reset"})}>Edit practice</button>
          <div className="quiz-container">
            <div className='progress-bar'>
              <ScoreDisplay questionNumber={system.questionNumber} totalQuestions={NUM_QUESTIONS} />
              <PlayAgain notes={chordRef.current} interval={false} chord={true} />
            </div>
            <div className="chord-buttons">
              <div id="class-types">
                {chord.isMajorMinorEnabled && 
                <>
                <button onClick = {() => guessDispatch({type: "minor", data: !guess.minor})} className = {guess.minor? 'on': ''}>Minor</button>
                <button onClick = {() => guessDispatch({type: "major", data: !guess.major})} className = {guess.major? 'on': ''}>Major</button>
                </>}
                {chord.isDiminishedEnabled && <button onClick = {() => guessDispatch({type: "diminished", data: !guess.diminished})} className = {guess.diminished? 'on': ''}>b5</button>}
                {chord.isSeventhsEnabled && 
                <>
                <button onClick = {() => guessDispatch({type: "seventh", data: guess.seventh === "minor"? null: "minor"})} className = {(guess.seventh === "minor")? 'on': ''}>m7</button>
                <button onClick = {() => guessDispatch({type: "seventh", data: guess.seventh === "major"? null: "major"})} className = {(guess.seventh === "major")? 'on': ''}>M7</button>
                </>}
              </div>
              <div className = "answerChoices">
            {chord.isPitchEnabled && all_notes.map((note) => (
              <button 
                key = {note}
                onClick = {() => guessDispatch({type: "pitch", data: note as Note})}
                className = {guess.pitch === note? 'on': ''}
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

