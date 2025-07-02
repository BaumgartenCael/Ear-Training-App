import './Practice.css'

function PlayNote() {
  const audio = new Audio('../.././public/sounds/piano_c6.mp3')
  audio.play();
};

function Practice() {
  return (
    <>
        <h1>Practice!</h1>
        <button onClick={PlayNote}>C</button>
    </>
  )
}

export default Practice

