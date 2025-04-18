import { Link } from "react-router";
import logo from "../assets/nc-news-logo.png";

function Header() {
    return (
        <header className="logo-container">
            <Link to="/articles"><img src={logo} className="nc-news-logo" alt="nc news logo"/></Link>
        </header>
    );
}

export default Header;