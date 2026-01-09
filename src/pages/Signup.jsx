import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [credentials, setCredentials] = useState(null)
    const { signup } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name && email) {
            const result = signup(name, email)
            setCredentials(result)
        }
    }

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Create Account</h2>
            {!credentials ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>
                        Generate ID & Password
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                        <span style={{ padding: '0 0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const result = signup("Google User", "google@example.com");
                            setCredentials(result);
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
                            fontWeight: '500',
                            width: '100%'
                        }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                        Sign up with Google
                    </button>
                    <p>
                        Already have an ID? <Link to="/login">Login here</Link>
                    </p>
                </form>
            ) : (
                <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '500px', margin: '2rem auto 0' }}>
                    <div style={{ backgroundColor: '#ecfdf5', padding: '2rem', borderRadius: '12px', border: '1px solid #10b981', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: '#10b981', borderRadius: '50%', padding: '0.5rem', color: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <div>
                                <h3 style={{ color: '#065f46', margin: 0 }}>Secure Account Created</h3>
                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#047857' }}>Credentials generated successfully</p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d1fae5' }}>
                            <p style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                IMPORTANT: Save these now. They will not be shown again.
                            </p>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.7rem', color: '#6b7280', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Civic ID</label>
                                <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#111827' }}>
                                    {credentials.userId}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.7rem', color: '#6b7280', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>One-Time Password</label>
                                <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#111827' }}>
                                    {credentials.password}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <button className="cta-button" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    I Have Saved My Credentials
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signup
