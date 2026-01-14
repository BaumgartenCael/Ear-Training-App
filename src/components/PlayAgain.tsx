import './PlayAgain.css';
import { PlayOneNote, PlayTwoNotes, PlayChord } from "../lib/playNotes";
import type {Note} from '../types/note.ts'
import { all_notes, noteAudio, noteString} from '../types/note.ts'

interface PlayAgainProps {
    notes: Note[],
    interval: boolean,
    chord: boolean,
}


const PlayAgain: React.FC<PlayAgainProps> = ({ notes, interval, chord }) => {
    function Play() {
        if (interval) {
            PlayTwoNotes(notes[0], notes[1]);
        }
        else if (chord) {
            PlayChord(notes);
        }
        else {
            PlayOneNote(notes[0]);
        }
    }
    return (
        <button id="play-again" onClick={Play}>Repeat Sound</button>
    );
}

export default PlayAgain;