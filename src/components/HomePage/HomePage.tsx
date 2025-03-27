// src/components/HomePage/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Rename Link to RouterLink to avoid confusion with section IDs
import Section from './Section';
import InsightCard from './InsightCard';
import ApproachSection from './ApproachSection';
import TeamSection from './TeamSection';

const HomePage: React.FC = () => {
    const [insights, setInsights] = useState<{ id: string; title: string; snippet: string; imageUrl?: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('public/insights/list.json')
            .then(response => response.json())
            .then(data => setInsights(data))
            .catch(error => console.error("Error loading insights:", error));
    }, []);

    const handleInsightClick = (insightId: string) => {
        navigate(`/insights/${insightId}`);
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col">
            <Section id="home" className="hero flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 w-full">
                {/* Hero section already has its own background gradient */}
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-source-sans">Democratizing Technological Insights</h1>
                <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-10 font-source-sans">Affordable, reliable, and accessible Technological and Scientific insights. Stay ahead of emerging threats and opportunities, make informed decisions, and maintain your competitive edge.</p>
                <RouterLink to="/demo" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded-full font-bold transition-colors duration-300 border border-blue-600 hover:border-blue-700 uppercase tracking-wider text-sm md:text-base font-source-sans">Schedule a Demo</RouterLink>
            </Section>

            <Section id="why-us" className="hero flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 w-full backdrop-blur-sm bg-gray-900/10"> {/* Added backdrop-blur and subtle background */}
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 font-source-sans">Why AsturLabs AI?</h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-4xl leading-relaxed font-source-sans">Critical insights to empower your business decisions, identify market trends, and navigate the rapidly evolving technological landscape.</p>
            </Section>

            <ApproachSection id="approach" /> {/* ID for Approach */}

            <TeamSection id="team" /> {/* ID for Team */}

            <Section id="insights" className="bg-blue bg-opacity-20 py-20 md:py-24"> {/* ID for Insights */}
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 font-source-sans">Latest Insights</h1>
                <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {insights.map(insight => (
                        <InsightCard key={insight.id} insight={insight} onClick={handleInsightClick} />
                    ))}
                </ul>
            </Section>
        </div>
    );
};

export default HomePage;