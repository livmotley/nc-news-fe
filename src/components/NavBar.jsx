import { Link } from "react-router";
import {slide as Menu} from "react-burger-menu";
import '../unique-css/NavBar.css';
import { useEffect, useState } from "react";

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    }

    return (
        <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
            <Menu
                isOpen={menuOpen} 
                onStateChange={handleStateChange}>
                <Link to="/articles" className="bm-item" onClick={closeMenu}>News Feed</Link>
                <Link to="/topics" className="bm-item" onClick={closeMenu}>Browse Topics</Link>
                <Link to="/articles/new-article" className="bm-item" onClick={closeMenu}>Write an Article</Link>
                <Link to="/users/grumpy19" className="bm-item" onClick={closeMenu}>My Profile</Link>
            </Menu>
        </div>
    )
}

export default NavBar;