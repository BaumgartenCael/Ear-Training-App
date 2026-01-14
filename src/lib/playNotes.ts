import type {Note} from '../types/note.ts'
import { all_notes, noteAudio, noteString} from '../types/note.ts'
  
export async function PlayOneNote(note: Note) {
    let audio1 = new Audio(noteAudio[note]);
    audio1.play();
}
    
export async function PlayTwoNotes(note1: Note, note2: Note) {
    console.log("Play again: ", note1, note2);
    let audio1 = new Audio(noteAudio[note1]);
    let audio2 = new Audio(noteAudio[note2]);
    audio1.onended = () => {
        audio2.play();
    };
    audio1.play();
}

export async function PlayChord(notes: Note[]) {
    console.log("Chord: ", notes);
    for (let i = 0; i < notes.length; i++) {
        let newAudio = new Audio(noteAudio[notes[i]]);
        newAudio.play();
    }
}
