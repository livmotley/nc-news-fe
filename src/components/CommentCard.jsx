function CommentCard({comment}) {

    return (
        <>
        <p>{comment.body}</p>
        <p>{new Date(comment.created_at).toLocaleDateString()}</p>
        <button>{comment.votes} votes</button>
        </>
    )

}

export default CommentCard;