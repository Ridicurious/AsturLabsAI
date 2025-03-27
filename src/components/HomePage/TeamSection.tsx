// src/components/HomePage/TeamSection.tsx
import React from 'react';

// ... (PlaceholderTeamImage component)

const TeamSection: React.FC = () => {
    const teamMembers = [
        { name: 'Omar Mrabet', title: 'CTO/CPO', imageUrl: '/images/team/evelyn-reed.jpg' },
        { name: 'Youness Raouank', title: 'CEO/COO', imageUrl: '/images/team/ben-carter.jpg' },
        // ... more team members
    ];

    return (
        <section className="hero flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 w-full backdrop-blur-sm bg-gray-900/10" id="team">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-indigo-600 dark:text-indigo-400 font-source-sans">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center">
                            {member.imageUrl ? (
                                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mb-4" />
                            ) : (
                                <PlaceholderTeamImage className="rounded-full mb-4" /> // Fallback to placeholder if no image URL
                            )}
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 font-source-sans">{member.name}</h3>
                            <p className="text-indigo-500 dark:text-indigo-400 font-source-sans">{member.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;