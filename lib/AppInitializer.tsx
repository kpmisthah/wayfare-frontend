// components/AppInitializer.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/Auth'
import { User } from '../modules/admin/types/user.type'
import { useCallListeners } from '../modules/user/hooks/use-call-listener'

export default function AppInitializer({
  user,
  children
}: {
  user: User | null
  children: React.ReactNode
}) {
  const [loaded, setLoaded] = useState(false)
  const setAuthUser = useAuthStore((state) => state.setAuthUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  useCallListeners(user?.id);
  useEffect(() => {
    if (user) {
      setAuthUser(user)
    } else {
      // Clear persisted auth state when server confirms no user is authenticated
      clearAuth()
    }
    setLoaded(true)
  }, [user, setAuthUser, clearAuth])

  if (!loaded) return null
  return <>{children}</>
}
