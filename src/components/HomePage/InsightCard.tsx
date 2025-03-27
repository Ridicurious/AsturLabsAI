// src/components/HomePage/InsightCard.tsx
import React from 'react';

interface InsightCardProps {
    insight: { id: string; title: string; snippet: string; imageUrl?: string }; // Added snippet and imageUrl
    onClick: (id: string) => void;
}

// Placeholder Image Component
const PlaceholderInsightImage = ({ className = "w-full h-40" }: { className?: string }) => (
    <div className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg ${className}`} />
);

const InsightCard: React.FC<InsightCardProps> = ({ insight, onClick }) => {
    return (
        <li className="mb-4">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg flex flex-col transform transition duration-300 hover:scale-105 hover:bg-opacity-70">
                <PlaceholderInsightImage className="rounded-t-lg" /> {/* Placeholder Image */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-white font-source-sans">{insight.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow font-source-sans">{insight.snippet}</p>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onClick(insight.id); }}
                        className="text-blue-400 hover:text-blue-300 font-semibold self-start no-underline hover:underline transition-colors duration-200 font-source-sans"
                    >
                        Read More →
                    </a>
                </div>
            </div>
        </li>
    );
};

export default InsightCard;