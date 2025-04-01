function CommentCard({comment}) {

    return (
        <section className="comment-card">
        <p className="comment-body">{comment.body}</p>
        <div className="comment-details">
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <button className="comment-vote-button">{comment.votes} votes</button>
        </div>
        </section>
    )

}

export default CommentCard;