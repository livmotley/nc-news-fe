import { Link } from "react-router";

function ArticleCard({article, children}) {

    return (
            <article className="article-card">
                <Link to={`/articles?topic=${article.topic}`} className="topic-button">{article.topic}</Link>
                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                <Link to={`/users/${article.author}`} className="author-button">{article.author}</Link>
                <section className="article-interactions">
                    <button className='votes-button'>{article.votes} votes</button>
                    <button className='comment-button'>{article.comment_count} comments</button>
                </section>
            </article>

    )
}

export default ArticleCard;
