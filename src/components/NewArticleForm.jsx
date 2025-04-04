import { useState } from "react";
import { addNewArticle, getAllTopics } from "../api";
import useApiRequest from "../hooks/useApiRequest";
import { useNavigate } from "react-router";

function NewArticleForm() {
    const [successfulPost, setSuccessfulPost] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [missingField, setMissingField] = useState(false);
    const [articleInput, setArticleInput] = useState({author: "grumpy19", title: "", body: "", topic: "", article_img_url: ""})

    const { data: {topics} = {} } = useApiRequest(getAllTopics);
    const navigate = useNavigate();

    function handleChange(event) {
        setArticleInput({...articleInput, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsDisabled(true);

        const {title, body, topic, article_img_url} = articleInput;
        if(!title || !body || !topic || !article_img_url) {
            setMissingField(true);
        }

        addNewArticle(articleInput)
        .then(() => {
            setArticleInput({author: "grumpy19", title: "", body: "", topic: "", article_img_url: ""})
;
            setSuccessfulPost(true);

            setTimeout(() => 
                navigate(`/articles`), 2000
            );
        })
        .catch((err) => {
            setIsDisabled(false);
            console.error("Failed to post article:", err);
        })

    }

    return (
        <>
        <header>
            <h2 className="page-title">New Article</h2>
        </header>
        <main>
            <form onSubmit={handleSubmit} className="new-article-form">
                {missingField ? <em>Please fill in all fields</em> : null}
                <label className="form-labels" htmlFor="article-title">Title:</label>
                <input
                    className="article-input"
                    id="article-title"
                    name="title"
                    type="text"
                    value={articleInput.title}
                    onChange={handleChange}/>
                <h4 className="form-labels">Topic:</h4>
                {Array.isArray(topics) && topics.length > 0 ? (
                <ul>
                    {topics.map((topic) => {
                        return (
                            <li key={topic.slug}>
                                <label className="topic-input" htmlFor={`topic-${topic.slug}`}>{topic.slug}</label>
                                <input
                                    type="radio"
                                    id={`topic-${topic.slug}`} 
                                    name='topic'
                                    value={topic.slug}
                                    onChange={handleChange}
                                    />
                            </li>
                        )
                    })}
                </ul> ): ( <p>No topics available</p>)}
                <label className="form-labels" htmlFor="article-body">Body:</label>
                <textarea
                    className="article-input"
                    id="article-body"
                    name="body"
                    type="text"
                    value={articleInput.body}
                    onChange={handleChange}/>
                <label className="form-labels" htmlFor="article-img-url">Image URL:</label>
                <input
                    className="article-input"
                    id="article-img-url"
                    name="article_img_url"
                    type="text"
                    value={articleInput.article_img_url}
                    onChange={handleChange}/>
                <button disabled={isDisabled} className="buttons-and-links" type="submit">Post</button>
                {successfulPost ? <p>Post Successful! Redirecting you to the News Feed.</p> : null}
            </form>
        </main>
        </>
    )
}

export default NewArticleForm;