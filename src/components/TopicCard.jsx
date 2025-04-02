import { Link, useSearchParams } from "react-router";

function TopicCard({topic}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const topicTitle = topic.slug;

    const titleCaseTopic = topicTitle.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase().concat(word.substr(1))
    }).join(' ');

    return (
        <section className="topic-card">
            <header>
                <h3>{titleCaseTopic}</h3>
            </header>
            <p>{topic.description}</p>
            <Link to={`/articles?topic=${topic.slug}`}>
                <button className="destination-button">See All {titleCaseTopic} Articles</button></Link>
        </section>
    )
}

export default TopicCard;