import { Tooltip } from "../Tooltip";

type SummaryStyle = "Harsh" | "Balanced" | "Detailed";

interface SummaryStyleSelectorProps {
  selectedStyle: SummaryStyle;
  onSelect: (style: SummaryStyle) => void;
}

const styleConfig = {
  Harsh: {
    label: "Harsh",
    tooltip: "Shortest - Get the core message in a few sentences",
    activeClass:
      "bg-rose-500 text-white shadow-md ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-[#1c1c1c]",
    inactiveClass:
      "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20",
  },
  Balanced: {
    label: "Balanced",
    tooltip: "Standard - A happy medium between details and brevity",
    activeClass:
      "bg-amber-500 text-white shadow-md ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-[#1c1c1c]",
    inactiveClass:
      "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
  },
  Detailed: {
    label: "Detailed",
    tooltip: "Comprehensive - Capturing more nuances",
    activeClass:
      "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-[#1c1c1c]",
    inactiveClass:
      "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
  },
};

export const SummaryStyleSelector: React.FC<SummaryStyleSelectorProps> = ({
  selectedStyle,
  onSelect,
}) => {
  return (
    <div className="flex bg-white dark:bg-zinc-900 rounded-xl p-1.5 gap-1.5 border border-gray-200 dark:border-zinc-800">
      {(Object.keys(styleConfig) as SummaryStyle[]).map((style) => (
        <Tooltip key={style} content={styleConfig[style].tooltip}>
          <button
            onClick={() => onSelect(style)}
            className={`
              w-24 md:w-32 py-2 text-xs md:text-sm font-semibold rounded-lg
              ${selectedStyle === style
                ? styleConfig[style].activeClass
                : styleConfig[style].inactiveClass
              }
            `}
          >
            {styleConfig[style].label}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};