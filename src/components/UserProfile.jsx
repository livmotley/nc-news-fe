import { Link, useParams } from "react-router";
import useApiRequest from "../hooks/useApiRequest";
import { getUserInfo } from "../api";
import "../unique-css/UserProfile.css";
import defaultAvatar from "../assets/default-avatar.png";

function UserProfile() {
    const params = useParams();

    const {data: {user} = {}, isLoading, isError} = useApiRequest(getUserInfo, params.username);

    if(isLoading) return <p className="loading-container">Loading...</p>
    if(isError) return <p className="error-container">Oh no! Something went wrong!</p>

    return (
        <div className="profile=container">
            <div className="profile-image-container">
                <img 
                    src={defaultAvatar}
                    alt={`${user.username} profile picture`}
                    className="profile-image"
                    />
            </div>
            <div className="profile-card">
                <div className="profile-content">
                    <h2 className="profile-name">
                        {user.name}
                    </h2>
                    <p className="profile-username">
                        @{user.username}
                    </p>
                    <div className="profile-actions">
                        <Link to="/articles/new-article" className="profile-button">
                        Post Article</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;