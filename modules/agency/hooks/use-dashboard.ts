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
            } catch (err: any) {
                setError(err.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, loading, error };
};
