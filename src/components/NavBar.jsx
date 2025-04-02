import { Link } from "react-router";
import {slide as Menu} from "react-burger-menu";
import '../unique css/NavBar.css';

function NavBar() {
    return (
        <Menu>
            <Link to="/articles" className="bm-item">News Feed</Link>
            <Link to="/topics" className="bm-item">Browse Topics</Link>
            <Link to="/articles/new-article" className="bm-item">Write an Article</Link>
            <Link to="/users/grumpy19" className="bm-item">My Profile</Link>
        </Menu>
    )
}

export default NavBar;