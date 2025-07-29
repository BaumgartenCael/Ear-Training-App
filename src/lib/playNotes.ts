export type Note = 'c/4' | 'c#/4' | 'd/4' | 'd#/4' | 'e/4' | 'f/4' | 'f#/4' | 'g/4'| 'g#/4' | 'a/5'| 'a#/5'| 'b/5' | 'c/5';

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
