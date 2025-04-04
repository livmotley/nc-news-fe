import { Link } from "react-router";

function WelcomePage() {
    return (
        <section className="welcome-grid">
            <Link to="/articles" className="buttons-and-links" >News Feed</Link>
            <Link to="/topics" className="buttons-and-links">Topics</Link>
            <Link to="username/grumpy19" className="buttons-and-links">My Profile</Link>
        </section>
    )
}

export default WelcomePage;