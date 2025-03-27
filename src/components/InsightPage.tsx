// src/components/InsightPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface InsightData {
  report_content: string;
}

const InsightPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [insightData, setInsightData] = useState<InsightData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Insight ID not found.');
            setLoading(false);
            return;
        }

        fetch(`insights/${id}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setInsightData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-white text-center p-5 font-source-sans">Loading...</div>;
    }

    if (error) {
        return <div className="text-white text-center p-5 font-source-sans">{error}</div>;
    }

    if (!insightData) {
        return <div className="text-white text-center p-5 font-source-sans">Insight not found.</div>;
    }

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
            <div className="report text-gray-300 leading-relaxed max-w-3xl mx-auto p-6 md:p-8 lg:p-10 bg-gray-800 bg-opacity-50 rounded-lg font-source-sans">
                <div id="report-content" dangerouslySetInnerHTML={{ __html: insightData.report_content }} />
            </div>
        </div>
    );
};

export default InsightPage;