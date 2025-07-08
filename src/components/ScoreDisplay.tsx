import './ScoreDisplay.css';
interface ScoreDisplayProps {
    questionNumber: number,
    totalQuestions: number,
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ questionNumber, totalQuestions }) => {
    const fillPercent = questionNumber / totalQuestions * 100;
    return (
        <div className="score-display-container">
            <h1>{questionNumber}</h1>
            <div className="progress-bar">
                <div className="progress-fill"
                     style={{ width: `${fillPercent}%` }}
                />
            </div>
            <h1>{totalQuestions}</h1>
        </div>
    );
};

export default ScoreDisplay;