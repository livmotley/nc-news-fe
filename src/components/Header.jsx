import { Link } from "react-router";
import logo from "../assets/nc-news-logo.png";
import { useEffect, useState } from "react";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`logo-container ${scrolled ? "scrolled" : ""}`}>
            <Link to="/articles" className="header-link">
                <img src={logo} className="nc-news-logo" alt="nc news logo"/>
            </Link>
        </header>
    );
}

export default Header;