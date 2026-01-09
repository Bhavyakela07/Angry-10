import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    Activity,
    CheckCircle,
    MapPin,
    Award,
    Shield,
    TrendingUp,
    AlertTriangle,
    Clock
} from 'lucide-react'
import LiveMap from '../components/LiveMap'

const Dashboard = () => {
    const { user, logout, getUserSubmissions, getStats, resolveSubmission } = useAuth()
    const navigate = useNavigate()
    const [recentActivity, setRecentActivity] = useState([])
    const [stats, setStats] = useState({ active: 0, completed: 0, categories: 0, total: 0, avgResolutionTime: '0h' })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        setRecentActivity(getUserSubmissions())
        setStats(getStats())
    }, [user, navigate, getUserSubmissions, getStats])

    if (!user) return null

    // Determine badge color based on severity
    const getSeverityColor = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    }

    // Determine status badge style
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Resolved': return { bg: '#dcfce7', color: '#166534' }; // Green
            case 'In Progress': return { bg: '#dbeafe', color: '#1e40af' }; // Blue
            default: return { bg: '#f3f4f6', color: '#374151' }; // Gray (Pending)
        }
    }

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '3rem' }}>
            {/* Top Bar / Header */}
            <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>My Civic Impact</h1>
                        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Welcome back, {user.name}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {/* Karma Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid #bfdbfe' }}>
                            <Award size={20} color="#2563eb" />
                            <div>
                                <span style={{ fontWeight: '700', color: '#1e3a8a' }}>{user.karmaPoints || 0}</span>
                                <span style={{ fontSize: '0.8rem', color: '#3b82f6', marginLeft: '0.25rem' }}>XP</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ textAlign: 'right', display: 'block' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user.id}</p>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Citizen Level {user.level || 1}</p>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem' }}>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {/* Active Submissions */}
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Active Submissions</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1 }}>{stats.active}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={12} /> Pending Review
                            </p>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', borderRadius: '8px', color: '#ea580c' }}>
                            <Activity size={24} />
                        </div>
                    </div>

                    {/* Avg Resolution Time */}
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Avg Resolution Time</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1 }}>{stats.avgResolutionTime || '0h'}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <TrendingUp size={12} /> Efficiency
                            </p>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', borderRadius: '8px', color: '#059669' }}>
                            <TrendingUp size={24} />
                        </div>
                    </div>

                    {/* Completed / Total Impact */}
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Resolved Issues</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1 }}>{stats.completed}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                Total Impact Score: {stats.completed * 5}
                            </p>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#2563eb' }}>
                            <CheckCircle size={24} />
                        </div>
                    </div>

                    {/* Impact Areas */}
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Impact Areas</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1 }}>{stats.categories}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>Types Detected</p>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: '#f5f3ff', borderRadius: '8px', color: '#7c3aed' }}>
                            <MapPin size={24} />
                        </div>
                    </div>
                </div>

                {/* Live Tracking Map */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', margin: 0 }}>Community Real-Time Logic</h3>
                        <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                            Live System Active
                        </span>
                    </div>
                    <LiveMap />
                </div>

                {/* Main Content Area: Recent Activity */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>

                    {/* Left Column: Activity Feed */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Recent Activity</h3>
                            <button className="link-btn" style={{ fontSize: '0.9rem' }}>View All</button>
                        </div>

                        {recentActivity.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                                <Activity size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No submissions yet. Start detecting to make an impact!</p>
                                <button
                                    onClick={() => navigate('/detect')}
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Start New Detection
                                </button>
                            </div>
                        ) : (
                            <div className="activity-list">
                                {recentActivity.map((item) => {
                                    const statusStyle = getStatusStyle(item.status);
                                    return (
                                        <div key={item.id} style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '50%',
                                                    backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#6b7280'
                                                }}>
                                                    <AlertTriangle size={20} color={getSeverityColor(item.severity)} />
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '500', color: '#111827', margin: 0 }}>
                                                        {item.issueType || 'Issue'} Report
                                                        <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: '0.5rem', fontWeight: 'normal' }}>#{item.id}</span>
                                                    </p>
                                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.85rem', color: '#6b7280' }}>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <MapPin size={12} /> {item.location?.address?.split(',')[0] || 'Unknown Location'}
                                                        </span>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <Clock size={12} /> {new Date(item.timestamp).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{
                                                    display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600',
                                                    backgroundColor: statusStyle.bg, color: statusStyle.color
                                                }}>
                                                    {item.status}
                                                </span>
                                                <div style={{ marginTop: '0.5rem' }}>
                                                    {item.status !== 'Resolved' && (
                                                        <button
                                                            style={{
                                                                fontSize: '0.75rem',
                                                                textDecoration: 'underline',
                                                                color: '#3b82f6',
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                resolveSubmission(item.id);
                                                                setRecentActivity(getUserSubmissions()); // Force Refresh
                                                                setStats(getStats());
                                                            }}
                                                        >
                                                            Mark Resolved
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar / Profile Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Profile Details</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem' }}>Full Name</label>
                                    <p style={{ fontWeight: '500' }}>{user.name}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem' }}>Email</label>
                                    <p style={{ fontWeight: '500' }}>{user.email}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem' }}>Role</label>
                                    <p style={{ fontWeight: '500', textTransform: 'capitalize' }}>{user.role}</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem' }}>Member Since</label>
                                    <p style={{ fontWeight: '500' }}>{new Date(user.joinedDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.9rem' }}>Edit Profile</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
