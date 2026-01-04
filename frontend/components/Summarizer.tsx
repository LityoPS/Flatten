"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "./Container";
import { Toast } from "./Toast";
import { SummaryStyleSelector } from "./Summarizer-Components/SummaryStyleSelector";
import { TextInput } from "./Summarizer-Components/TextInput";
import { SummaryOutput } from "./Summarizer-Components/SummaryOutput";
import { TextMetadata } from "./Summarizer-Components/TextMetadata";
import { Client } from "@gradio/client";

import { useHistory } from "@/hooks/useHistory";

type SummaryStyle = 'Harsh' | 'Balanced' | 'Detailed';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "lityops/Abstractive-Style-Summarizer";

const STYLE_MAP: Record<SummaryStyle, string> = {
  'Harsh': 'Harsh',
  'Balanced': 'Balanced',
  'Detailed': 'Detailed',
};

export const Summarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<SummaryStyle>('Balanced');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [gradioClient, setGradioClient] = useState<Client | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const { addHistoryItem } = useHistory();

  useEffect(() => {
    const initClient = async () => {
      try {
        setModelStatus('loading');
        const client = await Client.connect(API_URL);
        setGradioClient(client);
        setModelStatus('ready');
      } catch (err) {
        console.error("Failed to connect to Gradio space:", err);
        setModelStatus('error');
      }
    };

    initClient();
  }, []);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    const wordCount = inputText.trim().split(/\s+/).length;
    if (wordCount < 100) {
      setError("Input must at least be 100 words long");
      return;
    }
    if (wordCount > 512) {
      setError("Input must at most be 512 words long");
      return;
    }

    if (!gradioClient) {
      setError("Model is still loading. Please wait...");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const result = await gradioClient.predict("/generate_summary", {
        text: inputText,
        style: STYLE_MAP[selectedStyle],
      });

      const data = result.data as string[];
      const generatedSummary = data?.[0] || "";

      if (!generatedSummary) {
        throw new Error("No summary was generated. Please try again.");
      }

      if (generatedSummary.trim() === "Please enter a longer text to summarize.") {
        setError("Please enter a longer text to summarize.");
        return;
      }

      setSummary(generatedSummary);

      addHistoryItem({
        inputText: inputText,
        style: selectedStyle,
        summary: generatedSummary
      });

      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err) {
      console.error("Summarization error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to generate summary. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-8 relative">
        <div className="absolute -top-4 right-0 z-10">
          {modelStatus === 'loading' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="w-2 h-2 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Loading Model...</span>
            </div>
          )}
          {modelStatus === 'error' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-red-700 dark:text-red-400">Connection Error</span>
            </div>
          )}
          {modelStatus === 'ready' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Model Ready</span>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <SummaryStyleSelector
            selectedStyle={selectedStyle}
            onSelect={setSelectedStyle}
          />
        </div>

        <TextInput
          value={inputText}
          onChange={setInputText}
          placeholder="Paste your article, document, or any text you want to summarize..."
        />

        <div className="flex justify-center">
          <button
            onClick={handleSummarize}
            disabled={isLoading || !inputText.trim() || modelStatus !== 'ready'}
            className="
              px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-lg
              bg-indigo-500 hover:bg-indigo-600
              dark:bg-indigo-600 dark:hover:bg-indigo-700
              text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              shadow-lg hover:shadow-xl
              transform hover:scale-105
            "
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </span>
            ) : (
              'Generate Summary'
            )}
          </button>
        </div>

        {error && (
          <Toast
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {summary && (
          <div ref={summaryRef} className="space-y-4 scroll-mt-24 max-w-5xl mx-auto">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Here's your generated summary!
            </h3>
            <SummaryOutput summary={summary} isLoading={isLoading} />

            {!isLoading && (
              <TextMetadata text={summary} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};