// src/components/HomePage/ApproachSection.tsx
import React from 'react';

// Placeholder Icon Component (You can replace this with actual icons)
const PlaceholderApproachIcon = () => (
    <div className="bg-sky-100 border-2 border-dashed border-sky-300 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
);

const ApproachSection: React.FC = () => {
    const approachItems = [
        { title: 'Scale', description: 'We analyze vast datasets from scientific publications, patents, and technological databases continuously.' },
        { title: 'Customization', description: 'Insights tailored to your specific industry, research questions, and business objectives.' },
        { title: 'Speed', description: 'Receive actionable intelligence rapidly, accelerating your decision-making and innovation cycles.' },
        { title: 'Actionable', description: 'Focus on delivering insights that are not just informative but directly applicable to your strategic goals.' },
    ];

    return (
        <section id="approach" className="py-20 md:py-24 px-8 bg-blue-900 opacity-80 text-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-source-sans">Our Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {approachItems.map((item) => (
                        <div key={item.title} className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:bg-white/20">
                            <div className="flex justify-center mb-4">
                                <PlaceholderApproachIcon />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 font-source-sans">{item.title}</h3>
                            <p className="text-gray-200 font-source-sans">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ApproachSection;