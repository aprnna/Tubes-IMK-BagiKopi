import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/api";
export const AuthContext = createContext()

export function AuthContextProvider({children}){
  const [user, setUser] = useState({
    id:'',
    email:'',
    name:'',
    role:'',
    age:0,
    signIn:false,
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function getUser(){
      const { error,data: { user } } = await supabase.auth.getUser()
      if (error) return setLoading(false)
      const { data } = await supabase.from('users').select().eq('id', user?.id).single();
      setUser({
        id: user?.id,
        email: user?.email,
        name: data?.name,
        age: data?.age,
        role: data?.role,
        signIn: true,
      })
      setLoading(false)
    }
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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