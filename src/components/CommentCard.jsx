import { useState } from 'react';
import { deleteComment } from '../api';
import deleteIcon from '../assets/delete-icon.png';

function CommentCard({comment, handleDelete}) {

    return (
        <section className="comment-card">
        <p className="comment-body">{comment.body}</p>
        <div className="comment-details">
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <button className="comment-vote-button">{comment.votes} votes</button>
            {comment.author === 'grumpy19' ? <img className="delete-button" src={deleteIcon} alt="delete button icon" onClick={() => {
                handleDelete(comment.comment_id)}}/> : null}
        </div>
        </section>
    )

}

export default CommentCard;