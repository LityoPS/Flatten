import { Container } from "@/components/Container";

export const Features = () => {
    const features = [
        {
            title: "AI-Powered",
            description: "Leveraging advanced fine-tuned Flan-T5 models trained on XSUM and CNN/DailyMail datasets to generate intelligent, context-aware summaries.",
            icon: <BrainIcon className="text-indigo-600 dark:text-indigo-400" />,
            cardBg: "bg-indigo-50 dark:bg-indigo-950/30",
            markBg: "bg-indigo-100 dark:bg-indigo-900",
            markText: "text-indigo-800 dark:text-indigo-200",
            markRing: "ring-indigo-100 dark:ring-indigo-900"
        },
        {
            title: "Abstractive",
            description: "Creates truly abstractive summaries that paraphrase and capture the essence of your text, not just extract sentences.",
            icon: <DocumentIcon className="text-red-600 dark:text-red-400" />,
            cardBg: "bg-red-50 dark:bg-red-950/30",
            markBg: "bg-red-100 dark:bg-red-900",
            markText: "text-red-800 dark:text-red-200",
            markRing: "ring-red-100 dark:ring-red-900"
        },
        {
            title: "Customizable",
            description: "Adjust summary length and detail level to perfectly match your needs, from brief overviews to comprehensive condensations.",
            icon: <SettingsIcon className="text-yellow-600 dark:text-yellow-400" />,
            cardBg: "bg-yellow-50 dark:bg-yellow-950/30",
            markBg: "bg-yellow-100 dark:bg-yellow-900",
            markText: "text-yellow-800 dark:text-yellow-200",
            markRing: "ring-yellow-100 dark:ring-yellow-900"
        },
        {
            title: "General-Purpose",
            description: "Summarize articles, research papers, documents, and any text content with consistent high-quality results across domains.",
            icon: <TargetIcon className="text-green-600 dark:text-green-400" />,
            cardBg: "bg-green-50 dark:bg-green-950/30",
            markBg: "bg-green-100 dark:bg-green-900",
            markText: "text-green-800 dark:text-green-200",
            markRing: "ring-green-100 dark:ring-green-900"
        }
    ];

    return (
        <Container>
            <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
                {features.map((feature, index) => (
                    <div key={index} className="lg:col-span-1">
                        <div className={`flex flex-col justify-between items-center text-center w-full h-full ${feature.cardBg} px-8 rounded-2xl py-10`}>
                            <div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    <mark className={`${feature.markText} ${feature.markBg} rounded-md ${feature.markRing} ring-4`}>
                                        {feature.title}
                                    </mark>
                                </h3>
                                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="flex justify-center mt-8">
                                {feature.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

function BrainIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
    );
}

function DocumentIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}

function SettingsIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function TargetIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}