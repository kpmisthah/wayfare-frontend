"use client"
import { useEffect, useState, useCallback } from "react"
import { Travellers } from "../types/Ai-trip-plan.type"
import { matchedConnection } from "../services/matched-connection.api"

interface UseMatchedTravellersReturn {
    travelers: Travellers[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useMatchedTravellers = (): UseMatchedTravellersReturn => {
    const [travelers, setTravellers] = useState<Travellers[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMatchedTravellers = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const result = await matchedConnection()
            if (result) {
                setTravellers(result)
            } else {
                setTravellers([])
            }
        } catch (err) {
            console.error('Error fetching travelers:', err)
            setError('Failed to load travelers. Please try again.')
            setTravellers([])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMatchedTravellers()
    }, [fetchMatchedTravellers])

    return {
        travelers,
        isLoading,
        error,
        refetch: fetchMatchedTravellers
    }
}