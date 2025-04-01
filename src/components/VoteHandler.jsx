import { useState } from "react";
import { updateArticleVotes } from "../api";

function VoteHandler({article}) {
    const [optimisticVote, setOptimisticVote] = useState(0);

    function handleClick(vote) {
        updateArticleVotes(article.article_id, vote)
        .catch(() => {
            setOptimisticVote((currOptimisticVote) => {
                return currOptimisticVote -1
            })
        })
        setOptimisticVote((currOptimisticVote) => {
            return currOptimisticVote + vote;
    })
}

    return (
        <section class="vote-section">
            <p className="vote-count">{article.votes + optimisticVote} votes</p>
            <button className="upvote-button" onClick={()=> handleClick(1)}>Upvote</button>
            <button className="downvote-button" onClick={()=> handleClick(-1)}>Downvote</button>
        </section>
    )
}

export default VoteHandler;