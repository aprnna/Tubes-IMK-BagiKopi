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
  console.log(session)
  if (!session) {
    return !loading && <Navigate to="/login" />
  }
  else {
    return !loading && children ? children : <Outlet/>
  }
}
