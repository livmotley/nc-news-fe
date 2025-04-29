import { Link } from "react-router";

function Footer() {
    return (
        <footer className="footer-container">
            <Link to="/articles" className="footer-links">News Feed</Link>
            <Link to="/topics" className="footer-links">Topics</Link>
            <Link to="/users/grumpy19" className="footer-links">My Profile</Link>
        </footer>
    )
}

export default Footer;