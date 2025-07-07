import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

interface NoteDisplayProps {
    note1: string,
    note2: string,
    chord: boolean,
}
const NoteDisplay: React.FC<NoteDisplayProps> = ({note1, note2, chord}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(1000, 1000);
        const context = renderer.getContext();

        const staveWidth = chord ? 80: 127
        const stave = new Stave(10, 40, staveWidth);
        context.scale(2, 2);

        stave.addClef("treble");
        stave.setContext(context).draw();
        let notes, voice;
        if (chord) {
            notes = [
                new StaveNote({ keys: [note1, note2], duration: "w"}),
            ]
            voice = new Voice({numBeats: 1, beatValue: 1});
        }
        else {
            notes = [
                new StaveNote({ keys: [note1], duration: "w"}),
                new StaveNote({ keys: [note2], duration: "w"}),
            ]  
            voice = new Voice({numBeats: 2, beatValue: 1});
        }
        voice.addTickables(notes);
        new Formatter().joinVoices([voice]).format([voice], 80);

        voice.draw(context, stave);

    }, []);
    return( 
        <div>
            <div id="vf-container" ref={containerRef}></div>
        </div>
    );
};
export default NoteDisplay;
