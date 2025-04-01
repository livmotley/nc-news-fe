import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCommentsByArticle } from "../api";
import CommentCard from "./CommentCard";
import useApiRequest from "../hooks/useApiRequest";
import VoteHandler from "./VoteHandler";

function SingleArticlePage() {
    const location = useLocation();
    const { article } = location.state || {};

    const {data: comments, isLoading, isError} = useApiRequest(getCommentsByArticle, 'comments', article.article_id);

    if(isLoading) return <p>Loading article...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <>
        <header>
            <h3 className="article-header">{article.title}</h3>
            <h4>By <span className="author-button">{article.author}</span> | {new Date(article.created_at).toLocaleDateString()}</h4>
            <h5 className="article-topic-button">{article.topic}</h5>
        </header>
            <img src={article.article_img_url} alt={article.title} className="article-image"/>
            {article.body ? <p>{article.body}</p> : <p>Looks like this article is empty!</p>}
        <section className="article-interactions">
            <VoteHandler article={article}/>
        </section>
        <section className="comments-on-article">
            <h4 className="comment-header">Comments: {article.comment_count}</h4>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment}/>
            })}
        </section>
        </>
    )
}

export default SingleArticlePage;