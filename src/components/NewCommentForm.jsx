import { useState } from "react";
import useApiRequest from "../hooks/useApiRequest";
import { addNewComment } from "../api";

function NewCommentForm({setNewComment, article}) {
    const [comment, setComment] = useState('');
    const {data} = useApiRequest(addNewComment, 'comment', article.article_id);

    function handleSubmit(event) {
        event.preventDefault();
        request(comment);
        setNewComment(false);
    }

    function handleCommentChange(event) {
        setComment(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-comment">Your Comment</label>
            <input id="new-comment" type="text" onChange={handleCommentChange}/>
            <button>Post</button>
        </form>
    )

}

export default NewCommentForm;