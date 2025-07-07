interface ScoreDisplayProps {
    questionNumber: number,
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ questionNumber }) => {
    return (
        <div className="scoreDisplay">
            <h1>{questionNumber}</h1>
        </div>
    );
};

export default ScoreDisplay;