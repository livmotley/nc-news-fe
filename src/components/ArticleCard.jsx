import { Link } from "react-router";

function ArticleCard({article}) {

    return (
            <article className="article-card">
                <Link to={`/articles?topic=${article.topic}`} className="topic-button">{article.topic}</Link>
                <h3 className="article-title">
                    <Link to={`/articles/${article.article_id}`} className="article-title-link">
                        {article.title}
                    </Link>
                </h3>
                <Link to={`/users/${article.author}`} className="author-button">{article.author}</Link>
                <section className="article-interactions">
                    <button className='votes-button'>{article.votes} votes</button>
                    <button className='comment-button'>{article.comment_count} comments</button>
                </section>
            </article>

    )
}

export default ArticleCard;
