import { Link, useParams } from "react-router";
import ArticleCard from "./ArticleCard";
import useApiRequest from "../hooks/useApiRequest";
import { getAllArticles, getUserInfo } from "../api";
import { useState } from "react";

function UserProfile() {
    const params = useParams();

    const {data: {user} = {}, isLoading, isError} = useApiRequest(getUserInfo, params.username);

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <>
        <header>
            <h3>My Profile</h3>
        </header>
        <main>
            <img src={user.avatar_url} alt={`${user.username} profile picture`}/>
            <div>
                <h4>{user.name}</h4>
                <h4>{user.username}</h4>
            </div>
            <section>
                <Link to='/articles/new-article' className="buttons-and-links">Post Article</Link>
            </section>
        </main>
        </>
    )
}

export default UserProfile;