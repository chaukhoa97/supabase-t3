import Account from '../components/auth/Account'
import Auth from '../components/auth/Auth'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const session = useAuth()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}
