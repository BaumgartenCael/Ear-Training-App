import React, { useEffect, useRef } from 'react';
import './NoteDisplay.css';
// import { Link } from 'react-router-dom';
import { Factory, Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';


const NoteDisplay: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(1000, 1000);
        const context = renderer.getContext();

        const stave = new Stave(10, 40, 125);

        // stave.addClef("treble").addTimeSignature("4/4");
        context.scale(2, 2);

        stave.addClef("treble");
        stave.setContext(context).draw();

        const notes = [
            new StaveNote({ keys: ["f/4"], duration: "w"}),
            new StaveNote({ keys: ["c/5"], duration: "w"}),
        ]
        const voice = new Voice({numBeats: 2, beatValue: 1});
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
