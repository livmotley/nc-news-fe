import { Link } from "react-router";

function WelcomePage() {
    return (
        <section className="welcome-grid">
            <Link to="/articles" className="welcome-buttons">News Feed</Link>
            <Link to="/topics" className="welcome-buttons">Topics</Link>
            <Link to="username/grumpy19" className="welcome-buttons">My Profile</Link>
        </section>
    )
}

export default WelcomePage;