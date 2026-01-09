import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Sparkles,
    Camera,
    Cpu,
    MapPin,
    FileText,
    Shield,
    Zap,
    BarChart3,
    Upload,
    Brain,
    CheckCircle
} from 'lucide-react'

function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-bg-shape hero-bg-shape-1"></div>
                    <div className="hero-bg-shape hero-bg-shape-2"></div>
                    <div className="hero-bg-shape hero-bg-shape-3"></div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="hero-badge">
                                <Sparkles size={16} />
                                <span>AI-Powered Detection</span>
                            </div>

                            <h1 className="hero-title">
                                Smart <span className="gradient-text">Pothole</span> Detection System
                            </h1>

                            <p className="hero-description">
                                Upload road images and get instant AI-powered analysis. Our YOLOv8 model
                                detects potholes with high accuracy, providing severity assessments and
                                actionable insights for safer roads.
                            </p>

                            <div className="hero-buttons">
                                <Link to="/detect" className="btn btn-primary btn-lg">
                                    Start Scanning
                                    <ArrowRight size={20} />
                                </Link>
                                <a href="#how-it-works" className="btn btn-secondary btn-lg">
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-image-container">
                                <div className="hero-image">
                                    <div className="hero-image-placeholder">
                                        <Camera size={64} />
                                        <span>Road Analysis Preview</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-floating-card hero-floating-card-1">
                                <div className="flex items-center gap-sm">
                                    <CheckCircle size={20} className="text-success" />
                                    <span style={{ fontWeight: 600 }}>Pothole Detected</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                                    Confidence: 94%
                                </div>
                            </div>

                            <div className="hero-floating-card hero-floating-card-2">
                                <div className="flex items-center gap-sm">
                                    <Shield size={20} className="text-warning" />
                                    <span style={{ fontWeight: 600 }}>Medium Severity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <div className="features-header">
                        <h2>Why Choose RoadScan AI?</h2>
                        <p className="mt-md">
                            Advanced computer vision technology meets intuitive design for
                            seamless road condition monitoring.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="card feature-card animate-fadeInUp">
                            <div className="feature-icon">
                                <Cpu size={32} />
                            </div>
                            <h3 className="feature-title">YOLOv8 Detection</h3>
                            <p className="feature-description">
                                State-of-the-art object detection model trained specifically for
                                identifying road damage and potholes with high precision.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-100">
                            <div className="feature-icon">
                                <Zap size={32} />
                            </div>
                            <h3 className="feature-title">Instant Analysis</h3>
                            <p className="feature-description">
                                Get results in seconds. Upload an image and receive detailed
                                analysis with bounding boxes and confidence scores.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-200">
                            <div className="feature-icon">
                                <Brain size={32} />
                            </div>
                            <h3 className="feature-title">LLM Explanation</h3>
                            <p className="feature-description">
                                AI-generated explanations help you understand the severity
                                and recommended actions for each detected issue.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-300">
                            <div className="feature-icon">
                                <MapPin size={32} />
                            </div>
                            <h3 className="feature-title">GPS Geotagging</h3>
                            <p className="feature-description">
                                Automatically capture location data or manually confirm
                                coordinates for precise road condition mapping.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-400">
                            <div className="feature-icon">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="feature-title">Severity Scoring</h3>
                            <p className="feature-description">
                                Smart algorithms calculate risk levels based on pothole size,
                                depth, and detection confidence.
                            </p>
                        </div>

                        <div className="card feature-card animate-fadeInUp delay-500">
                            <div className="feature-icon">
                                <FileText size={32} />
                            </div>
                            <h3 className="feature-title">Detailed Reports</h3>
                            <p className="feature-description">
                                Generate comprehensive reports with all detection data,
                                ready for city authorities and road maintenance teams.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
                <div className="container">
                    <div className="features-header">
                        <h2>How It Works</h2>
                        <p className="mt-md">
                            Simple, fast, and accurate. Just four steps to detect and report road issues.
                        </p>
                    </div>

                    <div className="steps-container">
                        <div className="card step-card">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <Upload size={28} />
                            </div>
                            <h4 className="step-title">Upload Image</h4>
                            <p className="step-description">
                                Take a photo of the road or upload an existing image from your device.
                            </p>
                        </div>

                        <div className="card step-card">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <Cpu size={28} />
                            </div>
                            <h4 className="step-title">AI Analysis</h4>
                            <p className="step-description">
                                Our YOLOv8 model scans the image for potholes and road damage.
                            </p>
                        </div>

                        <div className="card step-card">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <Brain size={28} />
                            </div>
                            <h4 className="step-title">Get Insights</h4>
                            <p className="step-description">
                                Receive severity scores and AI-generated explanations instantly.
                            </p>
                        </div>

                        <div className="card step-card">
                            <div className="step-number">4</div>
                            <div className="step-icon">
                                <MapPin size={28} />
                            </div>
                            <h4 className="step-title">Add Location</h4>
                            <p className="step-description">
                                Geotag the issue for accurate reporting and future reference.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-value">95%</div>
                            <div className="stat-label">Detection Accuracy</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">&lt;2s</div>
                            <div className="stat-label">Analysis Time</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">10K+</div>
                            <div className="stat-label">Images Analyzed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">Cities Covered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to Improve Road Safety?</h2>
                        <p className="cta-description">
                            Start detecting potholes today and contribute to safer roads in your community.
                        </p>
                        <Link to="/detect" className="btn btn-lg cta-button">
                            Start Scanning Now
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
