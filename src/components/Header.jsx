import { Link } from "react-router";

function Header() {
    return (
        <header>
            <h1 className="header">
                <Link to="/articles" className="header-link">NC News</Link>
            </h1>
        </header>
    );
}

export default Header;