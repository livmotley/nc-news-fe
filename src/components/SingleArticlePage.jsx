import { useEffect, useState } from "react";
import { deleteComment, getArticleById, getCommentsByArticle } from "../api";
import CommentCard from "./CommentCard";
import useApiRequest from "../hooks/useApiRequest";
import VoteHandler from "./VoteHandler";
import NewCommentForm from "./NewCommentForm";
import { Link, useParams } from "react-router";
import PopUp from "./PopUpBox";
import Popup from "reactjs-popup";

function SingleArticlePage() {
    const { article_id } = useParams();
    const [newComment, setNewComment] = useState(false);
    const [hasPosted, setHasPosted] = useState(false);
    const [localComments, setLocalComments] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const {data: article, isLoading: articleLoading, isError: articleError} = useApiRequest(getArticleById, 'article', article_id)
    const {data: comments, isLoading: commentLoading, isError: commentError} = useApiRequest(getCommentsByArticle, 'comments', article_id);

    useEffect(() => {
        if(comments) setLocalComments(comments)
    }, [comments])

    function handleCommentButton() {
        setNewComment(true);
    }

    function handleDelete(commentId) {
        const updatedComments = localComments.filter(comment => comment.comment_id !== commentId)
        setLocalComments(updatedComments);
        setDeleteConfirmation(true);
        deleteComment(commentId)
        .catch(() => {
            setLocalComments(comments);
            setDeleteConfirmation(false);
        })
    }
    if(articleLoading || commentLoading) return <p>Loading article...</p>
    if(articleError || commentError) return <p>Oh no! Something went wrong!</p>


    return (
        <>
        <header>
            <h3 className="article-header">{article.title}</h3>
            <h4>By <span className="author-button">{article.author}</span> | {new Date(article.created_at).toLocaleDateString()}</h4>
            <Link to={`articles?topic=${article.topic}`}><h5 className="article-topic-button">{article.topic}</h5></Link>
        </header>
            <img src={article.article_img_url} alt={article.title} className="article-image"/>
            {article.body ? <p className='article-body'>{article.body}</p> : <p>Looks like this article is empty!</p>}
        <section className="article-interactions">
            <VoteHandler article={article}/>
        </section>
        <section>
            <header className="comment-intro">
                <h4 className="comment-header">Comments: {article.comment_count}</h4>
                <button className="add-comment-button" onClick={handleCommentButton}>Add Comment</button>
            </header>
            {deleteConfirmation ? <Popup open={deleteConfirmation} closeOnDocumentClick={false} onClose={() => setDeleteConfirmation(false)}>
                <div className="modal-message">
                    <button className="close" onClick={() => setDeleteConfirmation(false)}>&times;</button>
                    <p>Comment Deleted.</p>
                </div>
            </Popup> : null}
            {newComment ? <NewCommentForm setNewComment={setNewComment} setHasPosted={setHasPosted} article={article}/> : null}
            {hasPosted ? <p>Comment Posted!</p> : null}
            {localComments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} handleDelete={handleDelete}/>
            })}
        </section>
        </>
    )
}

export default SingleArticlePage;