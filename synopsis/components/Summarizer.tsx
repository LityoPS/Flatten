"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "./Container";
import { SummaryStyleButton } from "./SummaryStyleButton";
import { TextInput } from "./TextInput";
import { SummaryOutput } from "./SummaryOutput";
import { SummaryMetadata } from "./SummaryMetadata";

type SummaryStyle = 'harsh' | 'balanced' | 'detailed';

export const Summarizer = () => {
    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [selectedStyle, setSelectedStyle] = useState<SummaryStyle>('balanced');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    const handleSummarize = async () => {
        if (!inputText.trim()) {
            setError("Please enter some text to summarize");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSummary("");

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    summary_style: selectedStyle,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate summary');
            }

            const data = await response.json();
            setSummary(data.summary);

            // Auto-scroll to summary section
            setTimeout(() => {
                summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Summarization error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Input Text
                    </h3>
                    <TextInput
                        value={inputText}
                        onChange={setInputText}
                        placeholder="Paste your article, document, or any text you want to summarize..."
                    />
                </div>

                {/* Style Selection */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Summary Style
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                        <SummaryStyleButton
                            style="harsh"
                            selected={selectedStyle === 'harsh'}
                            onClick={() => setSelectedStyle('harsh')}
                        />
                        <SummaryStyleButton
                            style="balanced"
                            selected={selectedStyle === 'balanced'}
                            onClick={() => setSelectedStyle('balanced')}
                        />
                        <SummaryStyleButton
                            style="detailed"
                            selected={selectedStyle === 'detailed'}
                            onClick={() => setSelectedStyle('detailed')}
                        />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedStyle === 'harsh' && '💥 Shortest summary - Get the core message in a few sentences'}
                        {selectedStyle === 'balanced' && '⚖️ Medium length - Perfect balance of detail and brevity'}
                        {selectedStyle === 'detailed' && '📝 Comprehensive - Detailed summary capturing more nuances'}
                    </p>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSummarize}
                        disabled={isLoading || !inputText.trim()}
                        className="
              px-8 py-4 rounded-lg font-semibold text-lg
              bg-indigo-500 hover:bg-indigo-600
              dark:bg-indigo-600 dark:hover:bg-indigo-700
              text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              shadow-lg hover:shadow-xl
              transform hover:scale-105
            "
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </span>
                        ) : (
                            'Generate Summary'
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}

                {/* Output Section */}
                <div ref={summaryRef} className="space-y-4 scroll-mt-24">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Summary
                    </h3>
                    <SummaryOutput summary={summary} isLoading={isLoading} />

                    {/* Metadata */}
                    {summary && !isLoading && (
                        <div className="pt-2">
                            <SummaryMetadata text={summary} />
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};
