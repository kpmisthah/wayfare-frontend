import { useState, useEffect } from 'react';
import { getAgencyProfile } from '../services/agency.api';

export const useAgencyProfileStatus = () => {
    const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkProfile = async () => {
            try {
                setLoading(true);
                const profile = await getAgencyProfile();
                const hasProfile = profile &&
                    profile.description &&
                    profile.address &&
                    profile.licenseNumber &&
                    profile.ownerName;

                setIsProfileComplete(!!hasProfile);
            } catch (error) {
                setIsProfileComplete(false);
            } finally {
                setLoading(false);
            }
        };

        checkProfile();
    }, []);

    return { isProfileComplete, loading };
};
