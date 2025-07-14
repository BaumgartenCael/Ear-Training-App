import { Link } from 'react-router-dom';
import './NavButton.css'

interface NavButtonProps {
    to: string;
    label: string;
    streak?: number;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label, streak }) => {
    return (
        <Link to={to} className="navButton">
            <h2>{label}</h2>
            {typeof streak === 'number' && <h2>{streak}</h2>}
        </Link>
    );
}

export default NavButton;