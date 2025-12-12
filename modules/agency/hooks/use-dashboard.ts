import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../services/dashboard.api';
import { AgencyDashboardData } from '../types/dashboard.type';

export const useAgencyDashboard = () => {
    const [data, setData] = useState<AgencyDashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await fetchDashboardData();
                setData(result);
                setError(null);
            } catch (err: any) {
                // If it's a 404, the profile doesn't exist yet - don't show error
                if (err?.response?.status === 404) {
                    setData(null);
                    setError(null);
                } else {
                    setError(err.message || 'Failed to load dashboard data');
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, loading, error };
};
