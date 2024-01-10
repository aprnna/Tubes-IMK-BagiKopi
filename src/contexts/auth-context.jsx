import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/api";
export const AuthContext = createContext()

export function AuthContextProvider({children}){
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function getUser(){
      const { data: { user } } = await supabase.auth.getUser().finally(()=>setLoading(false))
      setUser(user)
    }
    getUser()
  }, [])
  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}