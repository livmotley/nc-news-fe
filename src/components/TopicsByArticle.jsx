import { useSearchParams } from "react-router";
import useApiRequest from "../hooks/useApiRequest";
import { getAllArticles } from "../api";

function TopicsByArticle() {
    const [searchParams] = useSearchParams();
    const selectedTopic = searchParams.get("topic");
    console.log(searchParams);

    const {data: articles, isLoading, isError} = useApiRequest(getAllArticles, 'articles', selectedTopic);
    console.log(articles);

    const titleCaseTopic = selectedTopic.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase().concat(word.substr(1))
    }).join(' ');

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <main className="topic-list">
            <h2>{titleCaseTopic} Articles</h2>
            <button className="buttons-and-links">Sort & Filter</button>
            <Link to='/articles/new-article' className="buttons-and-links">Post Article</Link>
            <section className="article-gallery">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </section>
        </main>
        
    )
}

export default TopicsByArticle;