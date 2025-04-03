import { useState } from "react";
import { addNewComment } from "../api";

function NewCommentForm({setHasPosted, setNewComment, article, handleNewComment}) {
    const [commentInput, setCommentInput] = useState({username: "grumpy19", body: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    
    function handleCommentChange(event) {
        setCommentInput({...commentInput, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setIsError(false);
        addNewComment(article.article_id, commentInput)
        .then((response) => {
            handleNewComment(response.data.comment)
            setCommentInput({
                username: "grumpy19",
                body: ""
            });
            setIsLoading(false);
            setHasPosted(true);
            setIsDisabled(false);
            setNewComment(false);

            setTimeout(() => setHasPosted(false), 3000);
        })
        .catch(() => {
            setIsError(true);
            setIsDisabled(false);
            setIsLoading(false);
        })
    }

    if(isLoading) return <p>Posting comment...</p>

    return (
        <>
        {isError && <p>Error posting comment. Please Try again</p>}

        <form onSubmit={handleSubmit} className="new-comment-input">
            <input className="form-input"
                placeholder="Write your comment here..." 
                name="body" id="new-comment" 
                type="text" onChange={handleCommentChange} 
                value={commentInput.body}
                required/>
            <button disabled={isDisabled} className="form-button" type="submit">Post</button>
        </form>
        </>
    )

}

export default NewCommentForm;