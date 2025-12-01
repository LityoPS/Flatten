"use client";

import { useState } from "react";

interface SummaryOutputProps {
    summary: string;
    isLoading: boolean;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (summary) {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full relative">
            <div className="relative">
                <textarea
                    value={isLoading ? "" : summary}
                    readOnly
                    placeholder={isLoading ? "Generating summary..." : "Your summary will appear here..."}
                    className="
            w-full h-48 p-6 pr-14 rounded-lg
            bg-white dark:bg-[#1c1c1c]
            border-2 border-gray-300 dark:border-[#404040]
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            resize-none
            font-normal text-base leading-relaxed
            transition-colors duration-200
          "
                />

                {/* Loading spinner inside textarea */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Copy button - semi-transparent overlay */}
                {summary && !isLoading && (
                    <button
                        onClick={handleCopy}
                        className="
              absolute top-4 right-4
              p-2 rounded-md
              bg-gray-800/70 dark:bg-gray-700/70
              hover:bg-gray-800/90 dark:hover:bg-gray-700/90
              text-white
              transition-all duration-200
              backdrop-blur-sm
              shadow-lg
            "
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
