import NavButton from './NavButton';
import './NavBar.css'

const NavBar: React.FC = ({}) => {
    return (
        <nav id="navbar-container">
            <div id = "header-title">
                <h2>Ear Training App</h2>
            </div>
            <NavButton to="/" label="Sign Out"/>
            <NavButton to="/home" label="Home"/>
            <NavButton to="/home" label="Extra"/>
            <NavButton to="/home" label="Extra"/>
        </nav>
    );
}

export default NavBar;