// src/components/DemoPage/Tag.tsx

import React from 'react';

interface TagProps {
    tag: string;
    isSelected: boolean;
    isSuggested?: boolean;
    onClick: (tag: string) => void;
}
const Tag: React.FC<TagProps> = ({ tag, isSelected, isSuggested = false, onClick }) => {

  let tagClasses = `tag px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 select-none m-1 font-source-sans`;

    if (isSelected) {
        tagClasses += ' bg-pink-600 hover:bg-pink-700';
    } else if (isSuggested) {
        tagClasses += ' bg-purple-600 hover:bg-purple-800';
    } else {
        tagClasses += ' bg-blue-500 hover:bg-blue-700';
    }
  return (
    <span
      className={tagClasses}
      onClick={() => onClick(tag)}
    >
      {tag}
    </span>
  )
}

export default Tag;