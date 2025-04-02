import { Link, useSearchParams } from "react-router";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import useApiRequest from "../hooks/useApiRequest";
import SortByButton from "./SortByButton";
import ToggleSwitch from "./ToggleSwitch";
import { useMemo, useState } from "react";

function Articles() {
    const [ascOrder, setAscOrder] = useState('desc');
    const [searchParams] = useSearchParams();
    const selectedTopic = searchParams.get('topic');
    const selectedSortOption = searchParams.get('sort_by');

    const { data: articles, isLoading, isError } = useApiRequest(getAllArticles, 'articles', selectedTopic || null, selectedSortOption || null, ascOrder === 'asc' ? 'asc' : 'desc');

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Oh no! Something went wrong!</p>

    return (
        <main className="article-list">
            <h2>News Feed</h2>
            <div className="feed-button-container">
                <SortByButton/>
                <ToggleSwitch ascOrder={ascOrder} setAscOrder={setAscOrder}/>
                <Link to='/articles/new-article' className="buttons-and-links">Post Article</Link>
            </div>
            <section className="article-gallery">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </section>
        </main>
        
    )

}

export default Articles;