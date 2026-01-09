import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (login(userId, password)) {
            navigate('/profile')
        } else {
            setError('Invalid User ID or Password')
        }
    }

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <input
                    type="text"
                    placeholder="User ID (e.g. USER1234)"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>
                    Login
                </button>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                    <span style={{ padding: '0 0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                </div>
                <button
                    type="button"
                    className="google-btn"
                    onClick={() => {
                        // Mock Google Login
                        login('GOOGLE_USER', 'password');
                        navigate('/profile');
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#fff',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        padding: '0.8rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                    Sign in with Google
                </button>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
