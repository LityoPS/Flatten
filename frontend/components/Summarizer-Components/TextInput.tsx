import { TextMetadata } from "./TextMetadata";

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
    return (
        <div className="w-full space-y-2">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full h-100 p-6 rounded-lg
                    bg-white dark:bg-[#1c1c1c]
                    border border-gray-200 dark:border-gray-800
                    text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                    resize-none
                    font-normal text-base leading-relaxed
                "
            />
            <TextMetadata text={value} />
        </div>
    );
};