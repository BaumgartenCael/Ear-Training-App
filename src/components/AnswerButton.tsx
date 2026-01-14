import './AnswerButton.css'
import {useState} from 'react'
interface AnswerButtonProps {
    answer: string,
    onClick: () => void,
    toggle?: boolean
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, onClick, toggle }) => {
    const [isActive, setIsActive] = useState<boolean>()
    function pushButton() {
        if (toggle) {
            setIsActive(!isActive);
        }
        onClick()
    }
    return (
        <nav className="answer-button">
            <button onClick={pushButton} className={isActive? "on" : ""}>{answer}</button>
        </nav>
    );
}

export default AnswerButton;