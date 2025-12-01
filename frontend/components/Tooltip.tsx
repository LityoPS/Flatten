"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ComponentRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-md bg-indigo-500 px-2 py-1 text-xs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({ children, content, className, side = "top" }: TooltipProps) {
    return (
        <TooltipProvider>
            <TooltipRoot delayDuration={200}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className={className} side={side}>
                    {content}
                    <TooltipPrimitive.Arrow className="fill-indigo-500" />
                </TooltipContent>
            </TooltipRoot>
        </TooltipProvider>
    );
}