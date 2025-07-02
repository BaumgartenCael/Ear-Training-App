import { Link } from 'react-router-dom';

interface NavButtonProps {
    to: string;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label }) => {
    return (
        <nav className="navButton">
        <Link to={to}>
            <button>{label}</button>
        </Link>
        </nav>
    );
}

export default NavButton;