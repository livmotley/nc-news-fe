import { Link, useSearchParams } from "react-router";
import "../unique-css/TopicCard.css"

function TopicCard({topic}) {

    const topicTitle = topic.slug;

    const titleCaseTopic = topicTitle.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase().concat(word.substr(1))
    }).join(' ');

    const topicImages = {
        coding: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
        cooking: "https://images.pexels.com/photos/2899682/pexels-photo-2899682.jpeg?auto=compress&cs=tinysrgb&w=800",
        football: "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800",
        default: "https://images.pexels.com/photos/4467632/pexels-photo-4467632.jpeg?auto=compress&cs=tinysrgb&w=600"
    };

    const topicImage = topicImages[topic.slug.toLowerCase()] || topicImages.default;

    return (
        <article className="topic-card">
            <div className="topic-image">
                <img
                    src={topicImage}
                    alt={`${titleCaseTopic} topic`}
                    className="thumbnail" />
            </div>
            <div className="topic-content">
                <h3 className="topic-title">{titleCaseTopic}</h3>
                <p className="topic-description">{topic.description}</p>
                <div className="topic-action">
                    <Link 
                        to={`/articles?topic=${topic.slug}`}
                        className="topic-button">See All {titleCaseTopic} Articles
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default TopicCard;