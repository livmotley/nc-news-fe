import { Link, useSearchParams } from "react-router";
import useApiRequest from "../hooks/useApiRequest";
import { getAllTopics } from "../api";
import TopicCard from "./TopicCard";
import "../unique-css/Topics.css";
import TopicSort from "./TopicSort";

function Topics() {
    const { data: {topics} = {}, isLoading, isError } = useApiRequest(getAllTopics);
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');

    if(isLoading) return <p className="loading-container">Loading...</p>
    if(isError) return <p className="error-container">Oh no! Something went wrong!</p>

    let sortedTopics = [...topics];
    
    if(sortBy === 'slug') {
        sortedTopics.sort((a, b) => {
            if (order === 'asc') {
                return a.slug.localeCompare(b.slug);
            } else if (order === 'desc') {
                return b.slug.localeCompare(a.slug);
            } else {
                return 0;
            }
        });
    }

    return (
        <main className="topics-page">
            <div className="topics-header">
                <h2>Browse Topics</h2>
                <div className="topic-actions">
                    <TopicSort/>
                </div>
            </div>
            <section className="topics-gallery">
                {sortedTopics.map((topic) => {
                    return <TopicCard key={topic.slug} topic={topic}/>
                })}
            </section>
        </main>
        
    )
}

export default Topics;