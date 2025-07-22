import './AnswerButton.css'
interface AnswerButtonProps {
    answer: string,
    onClick: () => void,
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, onClick }) => {
    return (
        <nav className="answer-button">
            <button onClick={onClick}>{answer}</button>
        </nav>
    );
}

export default AnswerButton;