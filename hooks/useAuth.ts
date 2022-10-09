import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function useAuth() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }
      }
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return session
}
