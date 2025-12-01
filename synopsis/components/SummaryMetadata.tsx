interface SummaryMetadataProps {
    text: string;
}

export const SummaryMetadata: React.FC<SummaryMetadataProps> = ({ text }) => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const spaceCount = (text.match(/\s/g) || []).length;
    const symbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    return (
        <div className="flex gap-6 text-sm text-gray-700 dark:text-gray-300 font-medium">
            <span>
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{wordCount}</span> Words
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
