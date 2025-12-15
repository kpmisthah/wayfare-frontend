'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent leading-none animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                    </div>
                </div>

                {/* Main message */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        The page you&apos;re looking for seems to have wandered off.
                        Let&apos;s get you back on track!
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg
                                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Home
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                        Go Back
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
