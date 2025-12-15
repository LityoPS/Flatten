import { Tooltip } from "../Tooltip";

type SummaryStyle = "extreme" | "detailed";

interface SummaryStyleSelectorProps {
  selectedStyle: SummaryStyle;
  onSelect: (style: SummaryStyle) => void;
}

const styleConfig = {
  extreme: {
    label: "Extreme",
    tooltip: "Shortest - Get the core message in a few sentences",
    activeClass:
      "bg-red-600 dark:bg-red-400 text-white hover:bg-red-700 dark:hover:bg-red-500",
  },
  detailed: {
    label: "Detailed",
    tooltip: "Comprehensive - Capturing more nuances",
    activeClass:
      "bg-green-600 dark:bg-green-400 text-white hover:bg-green-700 dark:hover:bg-green-500",
  },
};

export const SummaryStyleSelector: React.FC<SummaryStyleSelectorProps> = ({
  selectedStyle,
  onSelect,
}) => {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 gap-1">
      {(Object.keys(styleConfig) as SummaryStyle[]).map((style) => (
        <Tooltip key={style} content={styleConfig[style].tooltip}>
          <button
            onClick={() => onSelect(style)}
            className={`
              w-20 md:w-32 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-md
              ${selectedStyle === style
                ? `${styleConfig[style].activeClass} shadow-sm`
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
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