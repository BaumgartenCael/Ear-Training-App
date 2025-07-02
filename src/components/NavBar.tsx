import NavButton from './NavButton';
import './NavBar.css'

const NavBar: React.FC = ({}) => {
    return (
        <nav id="navBar">
            <NavButton to="/" label="Sign Out"/>
            <NavButton to="/home" label="Home"/>
            <NavButton to="/home" label="Extra"/>
            <NavButton to="/home" label="Extra"/>
        </nav>
    );
}

export default NavBar;