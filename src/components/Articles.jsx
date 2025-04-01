import { Link } from "react-router";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import useApiRequest from "../hooks/useApiRequest";

function Articles() {
    const { data: articles, isLoading, isError } = useApiRequest(getAllArticles, 'articles');
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <main className="article-list">
            <h2>News Feed</h2>
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

export default Articles;