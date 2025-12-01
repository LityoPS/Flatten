interface TextMetadataProps {
    text: string;
}

export const TextMetadata: React.FC<TextMetadataProps> = ({ text }) => {
    const paragraphCount = text.trim() ? text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const sentenceCount = text.trim() ? (text.trim().match(/[.!?]+/g) || []).length : 0;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const spaceCount = (text.match(/\s/g) || []).length;
    const symbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    return (
        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700 dark:text-gray-300 justify-center md:justify-start text-center md:text-left">
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{paragraphCount}</span> Paragraphs
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{sentenceCount}</span> Sentences
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{wordCount}</span> Words
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{charCount}</span> Characters
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{spaceCount}</span> Spaces
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{symbolCount}</span> Symbols
            </span>
        </div>
    );
};