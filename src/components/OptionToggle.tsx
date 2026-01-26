import "./OptionToggle.css";
interface OptionToggleProps {
    isOn: boolean,
    text: string,
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionToggle: React.FC<OptionToggleProps> = ({ isOn, text, toggle }) => {
    return (
        <nav className="option-toggle">
            <button id="toggle-button" className={isOn? "on" : ""} onClick={() => toggle(!isOn)}></button>
            <h3>{text}</h3>
        </nav>
    );
}

export default OptionToggle;