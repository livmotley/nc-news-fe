import { Link, useSearchParams } from "react-router";
import { getAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import useApiRequest from "../hooks/useApiRequest";
import SortByButton from "./SortByButton";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import PageNav from "./PageNav";
import "../unique-css/ArticleCard.css"

function Articles() {
    const [ascOrder, setAscOrder] = useState('desc');
    const [searchParams] = useSearchParams();
    const selectedTopic = searchParams.get('topic');
    const selectedSortOption = searchParams.get('sort_by');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: {articles, total_count: totalArticles} = {}, isLoading, isError } = useApiRequest(getAllArticles, selectedTopic || null, selectedSortOption || null, ascOrder === 'asc' ? 'asc' : 'desc', null, currentPage);

    if(isLoading) return <p>Loading...</p>
    if(isError) return (
        <>
            <p>Oh no! Something went wrong!</p>
            <p>There may be typos in your URL or the article/topic you're looking for doesn't exist.</p>
        </>
    )

    return (
        <main className="article-list">
            <h2>News Feed</h2>
            <div className="feed-button-container">
                <SortByButton/>
                <ToggleSwitch ascOrder={ascOrder} setAscOrder={setAscOrder}/>
                <Link to='/articles/new-article' as="button" className="buttons-and-links">Post Article</Link>
            </div>
            <br/>
            <br/>
            <section className="article-gallery">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </section>
            <br/>
            <PageNav currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalArticles} />
        </main>
        
    )

}

export default Articles;