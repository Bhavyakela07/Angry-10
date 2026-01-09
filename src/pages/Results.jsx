import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    MapPin,
    Clock,
    Camera,
    Mic,
    RefreshCw,
    HelpCircle,
    CheckCircle,
    X,
    Navigation // For GPS icon
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Results({ uploadedImage, analysisResults, location, setLocation, resetAnalysis }) {
    const navigate = useNavigate()
    const [severity, setSeverity] = useState(analysisResults?.severity || 'Medium')
    const [subcategory, setSubcategory] = useState('Large Pothole') // Mocked or derived
    const [description, setDescription] = useState('')
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Initialize state from analysis results
    useEffect(() => {
        if (analysisResults) {
            setSeverity(analysisResults.severity)
            // Enhanced subcategory simulation based on detection
            setSubcategory(`${analysisResults.severity} Severity ${analysisResults.issueType}`)
            setDescription(analysisResults.explanation || '')
        } else if (!uploadedImage) {
            navigate('/detect')
        }
    }, [analysisResults, uploadedImage, navigate])

    const getLocation = () => {
        setIsGettingLocation(true)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6),
                        accuracy: position.coords.accuracy.toFixed(0),
                        timestamp: new Date().toISOString(),
                        // Mock address for display
                        address: "Vagodhia Taluka, Vadodara, Gujarat, 391760, India"
                    })
                    setIsGettingLocation(false)
                },
                (error) => {
                    console.error("GPS Error", error)
                    setIsGettingLocation(false)
                },
                { enableHighAccuracy: true }
            )
        }
    }

    const { submitReport } = useAuth()

    const handleSubmit = () => {
        setIsSubmitted(true)

        // Construct report data
        const reportData = {
            issueType: analysisResults.issueType,
            severity: severity,
            description: description,
            location: location,
            subCategory: subcategory
        }

        submitReport(reportData)

        // Simulate backend delay then redirect to Dashboard
        setTimeout(() => {
            // alert("Report Submitted Successfully!") 
            navigate('/profile') // Redirect to dashboard (aliased as profile route)
        }, 1500)
    }

    if (!analysisResults) return null

    return (
        <main className="results-section">
            <div className="container">
                <div className="report-form-card animate-fadeInUp">
                    {/* Header */}
                    <div className="report-form-header">
                        <p className="report-form-instruction">
                            We'll use your current GPS location. You can take live photos after completing this form.
                        </p>
                    </div>

                    <div className="report-form-content">
                        <div className="report-form-grid">
                            {/* LEFT COLUMN */}
                            <div className="form-col-left">
                                {/* Issue Type */}
                                <div className="form-group">
                                    <label className="form-label">Issue Type</label>
                                    <div className="form-input-readonly">
                                        <Camera size={20} className="text-primary" />
                                        {analysisResults.issueType}
                                    </div>
                                </div>

                                {/* Subcategory */}
                                <div className="form-group">
                                    <label className="form-label">Subcategory</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={subcategory}
                                        onChange={(e) => setSubcategory(e.target.value)}
                                    />
                                </div>

                                {/* Severity */}
                                <div className="form-group">
                                    <label className="form-label">Issue Severity</label>
                                    <div className="severity-selector">
                                        {['Low', 'Medium', 'High'].map((level) => (
                                            <button
                                                key={level}
                                                className={`severity-btn ${level.toLowerCase()} ${severity === level ? 'active' : ''}`}
                                                onClick={() => setSeverity(level)}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="helper-text">High severity issues get priority attention</p>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="form-col-right">
                                {/* Description */}
                                <div className="form-group">
                                    <label className="form-label">Description *</label>
                                    <div className="description-card">
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Describe the issue..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={500}
                                        ></textarea>
                                        <div className="textarea-footer">
                                            {description.length}/500 characters
                                        </div>
                                    </div>
                                    <div className="voice-input-row">
                                        <button className="voice-btn">
                                            <Mic size={16} />
                                            Speak Description
                                        </button>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="location-block">
                                    <div className="location-header">
                                        <label className="form-label" style={{ marginBottom: 0 }}>
                                            Current Location (GPS)
                                        </label>
                                        <div className="location-actions">
                                            <button className="link-btn" onClick={getLocation} disabled={isGettingLocation}>
                                                {isGettingLocation ? 'Locating...' : 'Refresh GPS'}
                                            </button>
                                            <button className="link-btn">Fine-tune</button>
                                            <HelpCircle size={16} className="text-light" />
                                        </div>
                                    </div>

                                    <div className="address-box">
                                        <MapPin size={24} className="text-success mt-sm" />
                                        <div>
                                            <p style={{ fontWeight: 500, lineHeight: 1.4 }}>
                                                {location?.address || "Location not yet captured (Click Refresh GPS)"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="coords-row">
                                        <div className="coord-text">
                                            Coordinates: {location?.latitude || '--'}, {location?.longitude || '--'}
                                        </div>
                                        <div className="gps-badge">
                                            GPS Location
                                        </div>
                                    </div>
                                </div>

                                {/* Reported At */}
                                <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
                                    <label className="form-label">Reported At</label>
                                    <div className="timestamp-box">
                                        <Clock size={20} className="text-primary" />
                                        <span style={{ fontWeight: 500 }}>
                                            {new Date().toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="form-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={resetAnalysis}
                            style={{ borderColor: 'rgba(201,169,98,0.3)' }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!location}
                            style={{ minWidth: '160px' }}
                        >
                            {isSubmitted ? 'Submitting...' : 'Continue Report'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Results
