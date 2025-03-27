// src/components/DemoPage/DemoPage.tsx

import React, { useState, useRef, useCallback } from 'react';
import Tag from './Tag';
import CompanyInfoForm from './CompanyInfoForm';


const DemoPage: React.FC = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [inputValue, setInputValue] = useState('');
    const [overlayActive, setOverlayActive] = useState(false);
    const dropZoneRef = useRef<HTMLDivElement>(null);


    const handleTagClick = useCallback((tag: string) => {
        setSelectedTags(prevSelectedTags => {
            const newSelectedTags = new Set(prevSelectedTags);
            if (newSelectedTags.has(tag)) {
                newSelectedTags.delete(tag);
            } else {
                newSelectedTags.add(tag);
            }
            return newSelectedTags;
        });
    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dropZoneRef.current) {
            dropZoneRef.current.classList.add('drag-over');
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dropZoneRef.current) {
            dropZoneRef.current.classList.remove('drag-over');
        }
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dropZoneRef.current) {
            dropZoneRef.current.classList.remove('drag-over');
        }
        setOverlayActive(true);
        const files = e.dataTransfer.files;
        console.log('Dropped files:', files);

        // Simulate processing
        setTimeout(() => {
            setOverlayActive(false);
            setSuggestedTags(['AI', 'Machine Learning', 'Data Science']);
        }, 2000);
    };


    return (
        <div className="demo-page relative z-10 w-full min-h-screen flex flex-col items-center pt-20 md:pt-24">

            <CompanyInfoForm />

            <div className="tag-cloud flex flex-wrap justify-center gap-3 p-6 mb-8">
                {tags.map((tag) => (
                  <Tag key={tag} tag={tag} isSelected={selectedTags.has(tag)} onClick={handleTagClick}/>
                ))}
                {suggestedTags.map((tag) => (
                    <Tag key={tag} tag={tag} isSelected={selectedTags.has(tag)} isSuggested onClick={handleTagClick} />
                ))}
                <div className="flex items-center mt-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Add tag..."
                        className="border rounded p-2 mr-3 text-black font-source-sans"
                    />
                    <button onClick={handleAddTag} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors duration-200 font-source-sans">
                        Add
                    </button>
                </div>
            </div>


            <div
                ref={dropZoneRef}
                className="drop-zone border-2 border-dashed border-gray-400 min-h-[150px] p-6 rounded-lg text-center mt-4 bg-black bg-opacity-20 transition-colors duration-200 hover:border-blue-500 hover:bg-opacity-30 w-full max-w-3xl"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <h2 className="text-gray-300 text-xl md:text-2xl font-source-sans">Drag & Drop Files Here</h2>
            </div>
            <div className={`overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 text-white text-2xl md:text-4xl font-source-sans ${overlayActive ? 'flex' : 'hidden'}`}>
                Processing...
            </div>
        </div>
    );
};
export default DemoPage;