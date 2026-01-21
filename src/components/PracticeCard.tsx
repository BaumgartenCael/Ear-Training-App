import './PracticeCard.css';
import NavButton from './NavButton';
import NoteDisplay from './NoteDisplay';

interface PracticeCardProps {
    label: string,
    practiceRoute: string,
    statsRoute: string,
    text: string,
    img: string

}

const PracticeCard: React.FC<PracticeCardProps> = ({ label, practiceRoute, statsRoute, text, img }) => {
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
                    <div className="info-chunk">
                        <h3>Extra extra extra extra extra</h3>
                        <NavButton to={statsRoute} label="Extra"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PracticeCard;