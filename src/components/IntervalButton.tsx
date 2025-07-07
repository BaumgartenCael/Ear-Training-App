interface IntervalButtonProps {
    interval: string,
    onClick: () => void,
}

const IntervalButton: React.FC<IntervalButtonProps> = ({ interval, onClick }) => {
    return (
        <nav className="intervalButton">
            <button onClick={onClick}>{interval}</button>
        </nav>
    );
}

export default IntervalButton;