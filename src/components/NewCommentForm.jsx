import { useState } from "react";
import { addNewComment } from "../api";

function NewCommentForm({setNewComment, article}) {
    const [commentInput, setCommentInput] = useState({username: "grumpy19", body: ""});
    const [isError, setIsError] = useState(false);

    function handleCommentChange(event) {
        setCommentInput({...commentInput, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(commentInput)
        addNewComment(article.article_id, commentInput)
        .then(() => {
            setCommentInput({
                username: "grumpy19",
                body: ""
            });
            setNewComment(false);
        })
        .catch(() => {
            setIsError(true);
        })
    }

    if(isError) return <p>Error posting comment. Please try again.</p>


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-comment">Your Comment</label>
            <input 
                placeholder="Write your comment here..." 
                name="body" id="new-comment" 
                type="text" onChange={handleCommentChange} 
                value={commentInput.body}/>
            <button type="submit">Post</button>
            {!setNewComment ? <p>Comment Posted!</p> : null}
        </form>
    )

}

export default NewCommentForm;