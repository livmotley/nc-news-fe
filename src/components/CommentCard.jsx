import { useState } from 'react';
import deleteIcon from '../assets/delete-icon.png';
import PopUp from './PopUpBox';

function CommentCard({comment, handleDelete}) {
    const [open, setOpen] = useState(false);

    return (
        <section className="comment-card">
        <p className="comment-body">{comment.body}</p>
        <div className="comment-details">
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <button className="comment-vote-button">{comment.votes} votes</button>
            {comment.author === 'grumpy19' ? 
                <img 
                    className="delete-button" 
                    src={deleteIcon} 
                    alt="delete button icon" 
                    onClick={() => setOpen(true)}/>
            : null}
            <p className="author-on-comment">{comment.author}</p>
        </div>
            <PopUp open={open} setOpen={setOpen} handleYes={() => handleDelete(comment.comment_id)}/>
        </section>
    )

}

export default CommentCard;