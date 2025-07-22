import { PlayOneNote, PlayTwoNotes, PlayChord } from "../lib/playNotes";
import type { Note } from '../lib/playNotes';

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
        <div>
            <button onClick={Play}>Repeat Sound</button>
        </div>
    );
}

export default PlayAgain;