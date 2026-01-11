import { useEffect, useState } from "react";
import { getTopNews } from "../../services/newsService";
import Loader from "../common/Loader";

const NewsWidget = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const articles = await getTopNews();
                setNews(articles.slice(0, 5)); // limit for clean UI
            } catch (err) {
                setError("Failed to load news");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <Loader />;
    if (error)
        return <p className="text-sm text-red-500 font-medium">{error}</p>;

    return (
        <div className="flex flex-col h-full">

            {/* Header */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    News
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                    Top Headlines
                </p>
            </div>

            {/* News List */}
            <ul className="space-y-4">
                {news.map((item, index) => (
                    <li
                        key={index}
                        className="group border-b border-gray-200 pb-3 last:border-b-0"
                    >
                        <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-indigo-600 transition">
                            {item.title}
                        </p>

                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400">
                                {item.source?.name || "News"}
                            </span>

                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-indigo-600 font-medium hover:underline"
                                >
                                    Read →
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default NewsWidget;
