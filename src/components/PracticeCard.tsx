import './PracticeCard.css';
import NavButton from './NavButton';
import NoteDisplay from './NoteDisplay';

interface PracticeCardProps {
    label: string,
    practiceRoute: string,
    statsRoute: string,
    text: string,
    img: string,
    streak: number

}

const PracticeCard: React.FC<PracticeCardProps> = ({ label, practiceRoute, statsRoute, text, img, streak }) => {
    return (
        <div className="card-container">   
            <img src={img}/>
            <div id="inside-card">
                <div id="card-title">
                    <h1>{label}</h1>
                </div>
                <div id="information">
                    <div className="info-chunk">
                        <h3>{text}</h3>
                        <NavButton to={practiceRoute} label="Practice"/>
                    </div>
                    <div className="info-chunk">
                        <NavButton to={statsRoute} label="Stats"/>
                        <h3>View your progress over time</h3>
                    </div>
                    <div id="bottom-chunk" className="info-chunk">
                        {streak? <h3>You have practiced {label} <span id="streak">{streak}</span> days in a row! Keep it up!</h3>: 
                        <h3>Loading your data...</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PracticeCard;