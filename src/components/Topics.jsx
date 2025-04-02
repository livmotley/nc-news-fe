import { Link } from "react-router";
import useApiRequest from "../hooks/useApiRequest";
import { getAllTopics } from "../api";
import TopicCard from "./TopicCard";

function Topics() {
    const { data: topics, isLoading, isError } = useApiRequest(getAllTopics, 'topics');
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <main className="topics-page">
            <h2>Browse Topics</h2>
            <div className="topic-button-container">
                <Link to="topics/new-topic"><button className="buttons-and-links">Add New Topic</button></Link>
                <button className="buttons-and-links">Sort</button>
            </div>
            <section className="topics-gallery">
                {topics.map((topic) => {
                    return <TopicCard key={topic.slug} topic={topic}/>
                })}
            </section>
        </main>
        
    )
}

export default Topics;