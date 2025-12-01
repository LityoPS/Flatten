interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder = "Paste your text here..."
}) => {
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
    const charCount = value.length;

    return (
        <div className="w-full">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
          w-full h-80 p-6 rounded-lg
          bg-white dark:bg-[#1c1c1c]
          border-2 border-gray-300 dark:border-[#404040]
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
          resize-none
          font-normal text-base leading-relaxed
          transition-colors duration-200
        "
            />
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex gap-4">
                <span>{wordCount} words</span>
                <span>|</span>
                <span>{charCount} characters</span>
            </div>
        </div>
    );
};
