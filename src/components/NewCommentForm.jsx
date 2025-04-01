import { useState } from "react";
import { addNewComment } from "../api";

function NewCommentForm({setHasPosted, setNewComment, article}) {
    const [commentInput, setCommentInput] = useState({username: "grumpy19", body: ""});
    const [isError, setIsError] = useState(false);
    
    function handleCommentChange(event) {
        setCommentInput({...commentInput, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        addNewComment(article.article_id, commentInput)
        .then(() => {
            setCommentInput({
                username: "grumpy19",
                body: ""
            });
            setHasPosted(true);
            setNewComment(false);
        })
        .catch(() => {
            setHasPosted(false);
            setIsError(true);
        })
    }

    if(isError) return <p>Error posting comment. Please try again.</p>


    return (
        <form onSubmit={handleSubmit} className="new-comment-input">
            <input className="form-input"
                placeholder="Write your comment here..." 
                name="body" id="new-comment" 
                type="text" onChange={handleCommentChange} 
                value={commentInput.body}/>
            <button className="form-button" type="submit">Post</button>
        </form>
    )

}

export default NewCommentForm;