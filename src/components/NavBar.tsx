import NavButton from './NavButton';
import './NavBar.css'

const NavBar: React.FC = ({}) => {
    return (
        <nav className="navbar-container">
            <NavButton to="/home" label="Ear Trainers"/>
            <NavButton to="/home" label="Prev"/>
            <NavButton to="/home" label="Extra"/>
            <div id="sign-out">
                <NavButton to="/home" label="Account"/>
                <NavButton to="/" label="Sign Out"/>
            </div>
        </nav>
    );
}

export default NavBar;