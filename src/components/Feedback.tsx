import './Feedback.css'
import {useState} from 'react'
interface FeedbackProps {
    message: string,
    correct: boolean
}

const Feedback: React.FC<FeedbackProps> = ({ message, correct }) => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    return (   

        <div className="feedback">
            <h2>{correct? "Correct!": "Incorrect!"}</h2>

            {!correct && (
            <>

                <button className={isHidden?"hint-button": 'off'} onClick={() => setIsHidden(!isHidden)}>Show Hint</button>
                {!isHidden && <p>{message}</p>}

            </> )}
        </div>
    );
}

export default Feedback;