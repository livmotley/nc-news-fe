import { useState } from "react";
import { addNewArticle, getAllTopics } from "../api";
import useApiRequest from "../hooks/useApiRequest";
import { useNavigate } from "react-router";
import "../unique-css/NewArticleForm.css";

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
            setIsDisabled(false);
            return;
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
                {missingField && <p className = "error-message">Please fill in all fields</p>}
                <div>
                <label className="form-labels" htmlFor="article-title">Title:</label>
                <input
                    className="article-input"
                    id="article-title"
                    name="title"
                    type="text"
                    value={articleInput.title}
                    onChange={handleChange}
                    placeholder="Enter article title"/>
                </div>

                <div className="topics-container">
                    <h4 className="form-labels">Topic:</h4>
                    {Array.isArray(topics) && topics.length > 0 ? (
                        <div className="select-container">
                            <select
                                name="topic"
                                value={articleInput.topic}
                                onChange={handleChange}
                                className="article-input"
                                >
                                    <option value="" className="article-input">Select...</option>
                                    {topics.map((topic) => {
                                        return <option className="article-input" key={topic.slug} value={topic.slug}>{topic.slug}
                                        </option>
                                    })}
                            </select>
                        </div>
                ): ( <p>No topics available</p>)}
                </div>
                <div>
                <label className="form-labels" htmlFor="article-body">Body:</label>
                <textarea
                    className="article-input"
                    id="article-body"
                    name="body"
                    type="text"
                    value={articleInput.body}
                    onChange={handleChange}
                    placeholder="Type your message"/>
                </div>

                <div>
                    <label className="form-labels" htmlFor="article-img-url">Image URL:</label>
                    <input
                        className="article-input"
                        id="article-img-url"
                        name="article_img_url"
                        type="text"
                        value={articleInput.article_img_url}
                        onChange={handleChange}
                        placeholder="Enter image URL"/>
                </div>

                <button 
                    disabled={isDisabled} 
                    className="submit-button" 
                    type="submit">
                        <span>Post Article </span>
                        <span className = "arrow-icon">→</span>
                </button>

                {successfulPost && ( 
                    <p className="success-message">Post Successful! Redirecting you to the News Feed.</p>)}
            </form>
        </main>
        </>
    )
}

export default NewArticleForm;