import { useCallback, useEffect, useRef, useState } from "react";
import { deleteComment, getArticleById, getCommentsByArticle } from "../api";
import CommentCard from "./CommentCard";
import useApiRequest from "../hooks/useApiRequest";
import VoteHandler from "./VoteHandler";
import NewCommentForm from "./NewCommentForm";
import { Link, useLocation, useParams } from "react-router";
import Popup from "reactjs-popup";
import PopUp from "./PopUpBox";

function SingleArticlePage() {
    const { article_id } = useParams();
    const location = useLocation();
    const commentSectionRef = useRef(null);
    const [newComment, setNewComment] = useState(false);
    const [hasPosted, setHasPosted] = useState(false);
    const [localComments, setLocalComments] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [commentPage, setCommentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [hasAttemptedScroll, setHasAttemptedScroll] = useState(false);

    const {data: {article} = {}, isLoading: articleLoading, isError: articleError} = useApiRequest(getArticleById, article_id)
    const {data: {comments} = {}, isLoading: commentLoading, isError: commentError} = useApiRequest(getCommentsByArticle, article_id, commentPage);

    const scrollToComments = useCallback(() => {
        if(commentSectionRef.current) {
            commentSectionRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});

            const yOffset = commentSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 20;
            window.scrollTo({
                top: yOffset,
                behavior: 'smooth'
            });
        }
    }, [commentSectionRef]);

    useEffect(() => {
        if(comments && comments.length > 0 && localComments.length <= comments.length) {
            setLocalComments(comments);
            setCommentCount(comments.length);}
    }, [comments])

    useEffect(() => {
        const shouldScrollToComments = location.state?.scrollToComments;

        if(shouldScrollToComments && !articleLoading && !commentLoading && comments?.length > 0 && !hasAttemptedScroll) {
            setHasAttemptedScroll(true);

            setTimeout(scrollToComments, 300);

            setTimeout(scrollToComments, 800);

            setTimeout(scrollToComments, 1500);
        }
    }, [location.state, articleLoading, commentLoading, comments, hasAttemptedScroll, scrollToComments]);

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
        .then(() => {
            getCommentsByArticle(article_id)
        })
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
            </header>
                <div className="article-meta-data-container">
                    <h5 className="article-topic-button">{article.author}</h5>
                    <h5 className="article-topic-button">{new Date(article.created_at).toLocaleDateString()}</h5>
                    <Link to={`articles?topic=${article.topic}`}><h5 className="article-topic-button">{article.topic}</h5></Link>
                </div>
                <PopUp open={open} setOpen={setOpen} handleYes={() => handleArticleDelete()}/>
                <img src={article.article_img_url} alt={article.title} className="article-image-single"/>
                <div className="body-container">
                    <VoteHandler article={article}/>
                    {article.body ? <p className='article-body'>{article.body}</p> : <p>Looks like this article is empty!</p>}
                </div>
            <section id="comments" ref={commentSectionRef} className='comment-container' style={{scrollMarginTop: '20px'}}>
                <header className="comment-intro">
                    <h4 className="comment-header">COMMENTS: {commentCount}</h4>
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
            </section>
            </>
        )
}

export default SingleArticlePage;