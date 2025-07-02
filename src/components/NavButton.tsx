import { Link } from 'react-router-dom';

interface NavButtonProps {
    to: string;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label }) => {
    return (
        <Link to={to}>
            <button>{label}</button>
        </Link>
    );
}

export default NavButton;