import { useEffect, useState } from "react";
import { deleteComment, getArticleById, getCommentsByArticle } from "../api";
import CommentCard from "./CommentCard";
import useApiRequest from "../hooks/useApiRequest";
import VoteHandler from "./VoteHandler";
import NewCommentForm from "./NewCommentForm";
import { Link, useParams } from "react-router";
import Popup from "reactjs-popup";
import PageNav from "./PageNav";

function SingleArticlePage() {
    const { article_id } = useParams();
    const [newComment, setNewComment] = useState(false);
    const [hasPosted, setHasPosted] = useState(false);
    const [localComments, setLocalComments] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [commentPage, setCommentPage] = useState(1);

    const {data: {article} = {}, isLoading: articleLoading, isError: articleError} = useApiRequest(getArticleById, article_id)
    const {data: {comments} = {}, isLoading: commentLoading, isError: commentError} = useApiRequest(getCommentsByArticle, article_id, commentPage);

    useEffect(() => {
        if(comments && comments.length > 0 && localComments.length <= comments.length) {
            setLocalComments(comments);
            setCommentCount(comments.length);}
    }, [comments])

    const totalComments = localComments.length;

    function handleCommentButton() {
        setHasPosted(false);
        setNewComment(true);
    }
    
    function handleNewComment(newComment) {
        setLocalComments(prevComments => [newComment, ...prevComments])
        setCommentCount(prev => prev + 1);
    }

    function handleDelete(commentId) {
        const updatedComments = localComments.filter(comment => comment.comment_id !== commentId)
        setLocalComments(updatedComments);
        setCommentCount(updatedComments.length);
        setDeleteConfirmation(true);
        deleteComment(commentId)
        .catch(() => {
            setLocalComments(comments);
            setDeleteConfirmation(false);
            setCommentCount(comments.length);
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
                <h4 className="comment-header">Comments: {commentCount}</h4>
                <button className="add-comment-button" onClick={handleCommentButton}>Add Comment</button>
            </header>
            {deleteConfirmation ? <Popup open={deleteConfirmation} closeOnDocumentClick={false} onClose={() => setDeleteConfirmation(false)}>
                <div className="modal-message">
                    <button className="close" onClick={() => setDeleteConfirmation(false)}>&times;</button>
                    <p>Comment Deleted.</p>
                </div>
            </Popup> : null}
            {newComment ? <NewCommentForm setNewComment={setNewComment} setHasPosted={setHasPosted} article={article} handleNewComment={handleNewComment}/> : null}
            {hasPosted ? <p>Comment Posted!</p> : null}
            {localComments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} handleDelete={handleDelete}/>
            })}
            {totalComments > 0 ? <PageNav currentPage={commentPage} setCurrentPage={setCommentPage} total={totalComments}/> : null}
        </section>
        </>
    )
}

export default SingleArticlePage;