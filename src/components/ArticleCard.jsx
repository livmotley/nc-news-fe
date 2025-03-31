import { Link, useNavigate } from "react-router";

function ArticleCard({article}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/articles/${article.article_id}`, { state: {article}});
    };

    return (
        <article className="article-card" onClick={handleClick}>
            <Link to="/topic/:slug" className="topic-button">{article.topic}</Link>
            <h3>{article.title}</h3>
            <Link to="/users/:username" className="author-button">{article.author}</Link>
            <section className="article-interactions">
                <button className='votes-button'>{article.votes} votes</button>
                <button className='comment-button'>{article.comment_count} comments</button>
            </section>
        </article>

    )
}

export default ArticleCard;