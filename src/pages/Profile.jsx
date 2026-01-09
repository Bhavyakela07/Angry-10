import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    if (!user) return null

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>User Profile</h2>
                <button
                    onClick={() => { logout(); navigate('/'); }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem', marginBottom: '1rem' }}>Personal Details</h3>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#6b7280' }}>Name:</strong>
                        <span>{user.name}</span>
                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#6b7280' }}>Email:</strong>
                        <span>{user.email}</span>
                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#6b7280' }}>User ID:</strong>
                        <span style={{ fontFamily: 'monospace' }}>{user.id}</span>
                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#6b7280' }}>Member Since:</strong>
                        <span>{user.joinedDate}</span>
                    </p>
                </div>

                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem', marginBottom: '1rem' }}>Activity Stats</h3>
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#10b981', lineHeight: '1' }}>
                            {user.submissions}
                        </div>
                        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Total Potholes Reported</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
