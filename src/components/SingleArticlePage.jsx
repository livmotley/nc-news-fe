import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCommentsByArticle } from "../api";
import CommentCard from "./CommentCard";

function SingleArticlePage() {
    const location = useLocation();
    const { article } = location.state || {};
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentsByArticle(article.article_id)
        .then((response) => {
            setComments(response.data.comments)
        })
    }, [article])

    return (
        <>
        <header>
            <h3 className="article-header">{article.title}</h3>
        </header>
        <section className="article-details">
            <img src={article.article_img_url} alt={article.title} className="article-image"/>
            <h4>{article.author}</h4>
            <div className="article-meta">
                <h5>{article.topic}</h5>
                <h5>{new Date(article.created_at).toLocaleDateString()}</h5>
            </div>
        </section>
        {article.body ? <p>{article.body}</p> : <p>Looks like this article is empty!</p>}
        <section className="article-interactions">
            <button className="votes-button">{article.votes} votes</button>
            <button className="comment-button">{article.comment_count} comments</button>
        </section>
        <section className="comments-on-article">
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })}
        </section>
        </>
    )
}

export default SingleArticlePage;