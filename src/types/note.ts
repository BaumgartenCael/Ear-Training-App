
export type Note = 'c/4' | 'c#/4' | 'd/4' | 'd#/4' | 'e/4' | 'f/4' | 
            'f#/4' | 'g/4'| 'g#/4' | 'a/4'| 'a#/4'| 'b/4' | 'c/5';

export const all_notes: Note[] = ['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5'];

export const noteAudio: Record<Note, string> = {
    'c/4': '../.././public/sounds/piano_c4.mp3',
    'c#/4': '../.././public/sounds/piano_cs4.mp3',
    'd/4': '../.././public/sounds/piano_d4.mp3',
    'd#/4': '../.././public/sounds/piano_ds4.mp3',
    'e/4': '../.././public/sounds/piano_e4.mp3',
    'f/4': '../.././public/sounds/piano_f4.mp3',
    'f#/4': '../.././public/sounds/piano_fs4.mp3',
    'g/4': '../.././public/sounds/piano_g4.mp3',
    'g#/4': '../.././public/sounds/piano_gs4.mp3',
    'a/4': '../.././public/sounds/piano_a4.mp3',
    'a#/4': '../.././public/sounds/piano_as4.mp3',
    'b/4': '../.././public/sounds/piano_b4.mp3',
    'c/5': '../.././public/sounds/piano_c5.mp3',
  };

export const noteString: Record<Note, string> = {
    'c/4': 'C',
    'c#/4': 'C#',
    'd/4': 'D',
    'd#/4': 'D#',
    'e/4': 'E',
    'f/4': 'F',
    'f#/4': 'F#',
    'g/4': 'G',
    'g#/4': 'G#',
    'a/4': 'A',
    'a#/4': 'A#',
    'b/4': 'B',
    'c/5': 'C',
  };