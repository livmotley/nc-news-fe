import { useState } from "react";
import { updateArticleVotes } from "../api";

function VoteHandler({article}) {
    const [optimisticVote, setOptimisticVote] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    function handleClick(vote) {
        updateArticleVotes(article.article_id, vote)
        .catch(() => {
            setOptimisticVote((currOptimisticVote) => {
                setHasVoted(false);
                setIsDisabled(false);
                return currOptimisticVote -1
            })
        })
        setOptimisticVote((currOptimisticVote) => {
            setHasVoted(true);
            setIsDisabled(true);
            return currOptimisticVote + vote;
    })
}

    return (
        <section className="vote-section">
            {article.votes + optimisticVote === 1 || article.votes + optimisticVote === -1 ? 
            <p className="vote-count">{article.votes + optimisticVote} vote</p> : 
            <p className="vote-count">{article.votes + optimisticVote} votes</p>}
            <button disabled={isDisabled} className="upvote-button" onClick={()=> handleClick(1)}>Upvote</button>
            <button disabled={isDisabled} className="downvote-button" onClick={()=> handleClick(-1)}>Downvote</button>
            {hasVoted ? <p>Vote added.</p> : null}
        </section>
    )
}

export default VoteHandler;