interface SummaryStyleButtonProps {
    style: 'harsh' | 'balanced' | 'detailed';
    selected: boolean;
    onClick: () => void;
}

const styleConfig = {
    harsh: {
        label: 'Harsh',
        bgColor: 'bg-red-500 dark:bg-red-600',
        hoverColor: 'hover:bg-red-600 dark:hover:bg-red-700',
        selectedColor: 'ring-2 ring-red-700 dark:ring-red-500',
        textColor: 'text-white'
    },
    balanced: {
        label: 'Balanced',
        bgColor: 'bg-orange-500 dark:bg-orange-600',
        hoverColor: 'hover:bg-orange-600 dark:hover:bg-orange-700',
        selectedColor: 'ring-2 ring-orange-700 dark:ring-orange-500',
        textColor: 'text-white'
    },
    detailed: {
        label: 'Detailed',
        bgColor: 'bg-green-500 dark:bg-green-600',
        hoverColor: 'hover:bg-green-600 dark:hover:bg-green-700',
        selectedColor: 'ring-2 ring-green-700 dark:ring-green-500',
        textColor: 'text-white'
    }
};

export const SummaryStyleButton: React.FC<SummaryStyleButtonProps> = ({
    style,
    selected,
    onClick
}) => {
    const config = styleConfig[style];

    return (
        <button
            onClick={onClick}
            className={`
        px-6 py-3 rounded-lg font-semibold
        transition-all duration-200
        ${config.bgColor}
        ${config.hoverColor}
        ${config.textColor}
        ${selected ? config.selectedColor : ''}
        ${selected ? 'scale-105 shadow-lg' : 'shadow-md'}
      `}
        >
            {config.label}
        </button>
    );
};
