import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/api'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    }).finally(() => setLoading(false))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])
  if (!session && !loading) {
    return <Navigate to="/login" />
  }
  else {
    return children ? children : <Outlet/>
  }
}
