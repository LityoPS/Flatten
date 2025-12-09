import { Container } from "./Container";

export const HowToUse = () => {
    const steps = [
        {
            number: "1",
            title: "Input Text",
            description:
                "Paste or type the text you want to summarize into the input field. Any length of content works, from short paragraphs to lengthy documents.",
        },
        {
            number: "2",
            title: "Adjust Style",
            description:
                "Select your preferred summary style from the three options: Harsh for brevity, Standard for a middle ground, or Detailed for comprehensive coverage.",
        },
        {
            number: "3",
            title: "Get Summary",
            description:
                'Click the "Generate Summary" button to create your summary instantly. Review the result and copy it for use wherever you need it.',
        },
    ];

    return (
        <Container className="pb-8 md:pb-16 lg:pb-24">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-3 md:gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="mb-2 md:mb-6">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center">
                                    <span className="text-white text-base md:text-2xl font-bold">
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-4">
                                {step.title}
                            </h3>

                            <p className="text-[10px] md:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-snug md:leading-relaxed">
                                {step.description}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-8.5 transform -translate-y-1/2">
                                    <span className="text-3xl font-semibold text-gray-300 dark:text-gray-600">
                                        &gt;
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};