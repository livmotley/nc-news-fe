import { Link } from "react-router";

function Header() {
    return (
        <Link to="/articles">
        <header>
            <h1 className="header">NC News</h1>
        </header>
        </Link>
    )
}

export default Header;