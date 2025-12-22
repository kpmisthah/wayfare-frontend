
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '../modules/admin/types/user.type';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setAuthUser: (user: User) => void;
    clearAuth: () => void
    setUpdateUser: (updateFields: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            setAuthUser: (user) => {
                set({
                    user: user,
                    isAuthenticated: true
                })
            },
            clearAuth: () => {
                set({
                    user: null,
                    isAuthenticated: false
                })
            },
            setUpdateUser: (updateFields: Partial<User>) => {

                const currentUser = get().user

                if (!currentUser) return
                set({
                    user: {
                        ...currentUser,
                        ...updateFields
                    }
                })
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

