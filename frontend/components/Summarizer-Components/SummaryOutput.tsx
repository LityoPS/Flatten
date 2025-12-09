"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "../Tooltip";

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({
  summary,
  isLoading,
}) => {
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
          className="
            w-full h-48 md:h-60 p-4 md:p-6 pr-12 md:pr-14 rounded-lg
            bg-white dark:bg-[#1c1c1c]
            border border-gray-200 dark:border-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            resize-none
            font-normal text-sm md:text-base leading-relaxed
          "
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
        )}

        {summary && !isLoading && (
          <div className="absolute top-4 right-4">
            <Tooltip content="Copy to clipboard" side="left">
              <button
                onClick={handleCopy}
                className="
                  p-2 rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  text-gray-600 dark:text-gray-300
                "
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-green-400" />
                ) : (
                  <ClipboardDocumentIcon className="w-5 h-5" />
                )}
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};