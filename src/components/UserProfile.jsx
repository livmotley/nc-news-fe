import { Link, useParams } from "react-router";
import useApiRequest from "../hooks/useApiRequest";
import { getUserInfo } from "../api";

function UserProfile() {
    const params = useParams();

    const {data: {user} = {}, isLoading, isError} = useApiRequest(getUserInfo, params.username);

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <>
        <header>
            <h3 className="user-profile-header">My Profile</h3>
        </header>
        <main>
            <img className="profile-picture" src={user.avatar_url} alt={`${user.username} profile picture`}/>
            <div className="user-names">
                <h4 className='user-name'>{user.name}</h4>
                <h4 className='user-name'>{user.username}</h4>
            </div>
            <section>
                <Link to='/articles/new-article' className="buttons-and-links">Post Article</Link>
            </section>
        </main>
        </>
    )
}

export default UserProfile;