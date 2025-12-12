"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import debounce from "lodash.debounce";

interface Place {
    display_name: string;
    lat: string;
    lon: string;
    type: string;
    importance: number;
}

interface DestinationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const DestinationAutocomplete: React.FC<DestinationAutocompleteProps> = ({
    value,
    onChange,
    placeholder = "Where do you want to go?",
    className = "",
}) => {
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch suggestions from Nominatim (OpenStreetMap)
    const fetchSuggestions = debounce(async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?` +
                new URLSearchParams({
                    q: query,
                    format: "json",
                    addressdetails: "1",
                    limit: "5",
                }),
                {
                    headers: {
                        "Accept-Language": "en-US,en;q=0.9",
                        "User-Agent": "Wanderly-Travel-App",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Place[] = await response.json();
            // Filter for cities, towns, and major locations
            const filtered = data.filter(
                (place) =>
                    place.type === "city" ||
                    place.type === "town" ||
                    place.type === "village" ||
                    place.type === "administrative" ||
                    place.importance > 0.4
            );
            setSuggestions(filtered.length > 0 ? filtered : data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            // Don't show error to user, just fail silently
            // User can still type and submit their destination
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoading(false);
        }
    }, 500);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        fetchSuggestions(newValue);
    };

    const handleSelectSuggestion = (place: Place) => {
        onChange(place.display_name);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className={className}
                />
                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((place, index) => (
                        <button
                            key={`${place.lat}-${place.lon}-${index}`}
                            type="button"
                            onClick={() => handleSelectSuggestion(place)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-100 last:border-b-0"
                        >
                            <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {place.display_name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5 capitalize">
                                    {place.type}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message */}
            {showSuggestions && !loading && value.length >= 3 && suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                    <p className="text-sm text-gray-500 text-center">
                        No destinations found. Please try a different search term.
                    </p>
                </div>
            )}
        </div>
    );
};
