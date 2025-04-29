import { Link } from "react-router";
import '../unique-css/ArticleCard.css';
import { ThumbsUp, MessageCircle } from 'lucide-react';

const TruncatedText = ({ text, maxLength }) => {
    if (!text) return null;
    if (text.length <= maxLength) return <>{text}</>;
    return <>{text.slice(0, maxLength)}...</>;
  };

function ArticleCard({article}) {

    return (
        <article className="article-card">
            <div className="article-image">
                <img
                src={article.article_img_url} alt="article thumbnail" className="thumbnail" />
            </div>
            <div className="article-content">
            <Link to={`/articles?topic=${article.topic}`} className="topic-button">{article.topic}</Link>
            <h3 className="article-title">
                    <Link to={`/articles/${article.article_id}`} className="article-title-link">
                        {article.title}
                    </Link>
                </h3>
                <p className="article-description">
                    <TruncatedText text={article.body || ""} maxLength={100}/>
                </p>
                <div className="article-meta">
                <Link to={`/users/${article.author}`} className="author-button">{article.author}</Link>
                {article.created_at && <span className="article-date"> {new Date(article.created_at).toLocaleDateString()}</span>}
                </div>
                <section className="article-interactions">
                    <button className="votes-button">
                        <ThumbsUp size={16}/>
                        <span>{article.votes} votes</span>
                    </button>
                    <Link 
                        to={`/articles/${article.article_id}`} 
                        state={{scrollToComments: true}}
                        className="comment-button">
                        <MessageCircle size={16}/>
                        <span>{article.comment_count} comments</span>
                    </Link>
                </section>
            </div>
        </article>
    )
}

export default ArticleCard;
