"use client";
import { Loader2 } from "lucide-react";

interface DashboardLoaderProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
}

export const DashboardLoader = ({
    message = "Loading...",
    size = "md",
    fullScreen = false,
}: DashboardLoaderProps) => {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };

    const containerClasses = fullScreen
        ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50"
        : "w-full py-12";

    return (
        <div className={`${containerClasses} flex flex-col items-center justify-center`}>
            <div className="relative">
                {/* Outer ring animation */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse" />

                {/* Spinning loader */}
                <Loader2
                    className={`${sizeClasses[size]} text-blue-600 animate-spin`}
                />
            </div>

            {message && (
                <p className="mt-4 text-gray-600 font-medium animate-pulse">{message}</p>
            )}

            {/* Decorative dots */}
            <div className="flex gap-1.5 mt-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    );
};

export default DashboardLoader;
