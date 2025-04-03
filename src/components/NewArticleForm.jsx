import { useEffect, useState } from "react";
import { addNewArticle, getAllTopics } from "../api";
import useApiRequest from "../hooks/useApiRequest";
import { useNavigate } from "react-router";

function NewArticleForm() {
    const [successfulPost, setSuccessfulPost] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [topicInput, setTopicInput] = useState('');
    const [bodyInput, setBodyInput] = useState('');
    const [avatarInput, setAvatarInput] = useState('');
    const [missingField, setMissingField] = useState(false);

    const { data: {topics} = {} } = useApiRequest(getAllTopics);
    const navigate = useNavigate();

    function handleChange(event) {
        switch (event.target) {
            case 'article-title':
                setTitleInput(event.value);
                break;
            case 'article-body':
                setTitleInput(event.value);
                break;
            case 'article-img-url':
                setTitleInput(event.value);
                break;
        }

    }

    function handleTopicChange(topic) {
        setTopicInput(topic);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!titleInput || !topicInput || !bodyInput || !avatarInput) {
            setMissingField(true);
        }

        addNewArticle({
            author: "grumpy19",
            title: titleInput,
            body: bodyInput,
            topic: topicInput,
            article_img_url: avatarInput,
        })
        .then(() => {
            setTitleInput('');
            setTopicInput('');
            setBodyInput('');
            setAvatarInput('');

            setSuccessfulPost(true);

            setTimeout(() => {
                setSuccessfulPost(false)
                navigate(`/articles`), 3000;
                })
        })

    }

    return (
        <>
        <header>
            <h2>Write Article</h2>
        </header>
        <main>
            <form>
                {missingField ? <em>Please fill in all fields</em> : null}
                <label htmlFor="article-title">Title:</label>
                <input
                    id="article-title"
                    type="text"
                    onChange={handleChange}/>
                <h4>Topic:</h4>
                {Array.isArray(topics) && topics.length > 0 ? (
                <ul>
                    {topics.map((topic, i) => {
                        return (
                            <li key={topic.slug}>
                                <label htmlFor={`topic-${topic.slug}`}>{topic.slug}</label>
                                <input
                                    type="radio"
                                    id={`topic-${topic.slug}`}
                                    name='topic'
                                    onChange={() => {
                                        handleTopicChange(topic.slug);
                                    }} />
                            </li>
                        )
                    })}
                </ul> ): ( <p>No topics available</p>)}
                <label htmlFor="article-body">Body:</label>
                <textarea
                    id="article-body"
                    type="text"
                    onChange={handleChange}/>
                <label htmlFor="article-topic">Image URL:</label>
                <input
                    id="article-img-url"
                    type="text"
                    onChange={handleChange}/>
                <button className="buttons-and-links" onSubmit={handleSubmit}>Post</button>
                {successfulPost ? <p>Post Successful! Redirecting you to the News Feed.</p> : null}
            </form>
        </main>
        </>
    )
}

export default NewArticleForm;
{/* <label htmlFor="article-topic">Topic:</label>
<input
    id="article-topic"
    type="text"
    onChange={handleChange}/> */}