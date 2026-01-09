import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Upload,
    Camera,
    Image as ImageIcon,
    X,
    Cpu,
    ArrowRight,
    RefreshCw
} from 'lucide-react'

function Detect({ uploadedImage, setUploadedImage, setAnalysisResults }) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)

        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            processFile(file)
        }
    }, [])

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            processFile(file)
        }
    }

    const processFile = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setUploadedImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const clearImage = () => {
        setUploadedImage(null)
        setAnalysisResults(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const simulateAnalysis = () => {
        setIsAnalyzing(true)
        setAnalysisProgress(0)

        // Simulate YOLO analysis with progress
        const progressInterval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 200)

        // Simulate analysis completion
        setTimeout(() => {
            clearInterval(progressInterval)
            setAnalysisProgress(100)

            // Generate simulated results
            const severityOptions = ['Low', 'Medium', 'High']
            const severity = severityOptions[Math.floor(Math.random() * 3)]
            const confidence = Math.floor(Math.random() * 20) + 80 // 80-99%

            const mockResults = {
                issueType: 'Pothole',
                confidence: confidence,
                severity: severity,
                boundingBox: {
                    x: Math.floor(Math.random() * 100) + 50,
                    y: Math.floor(Math.random() * 100) + 50,
                    width: Math.floor(Math.random() * 100) + 80,
                    height: Math.floor(Math.random() * 80) + 60,
                },
                explanation: generateExplanation(severity, confidence),
                timestamp: new Date().toISOString(),
            }

            setAnalysisResults(mockResults)
            setIsAnalyzing(false)
            navigate('/results')
        }, 2500)
    }

    const generateExplanation = (severity, confidence) => {
        const explanations = {
            Low: `A minor road surface irregularity has been detected with ${confidence}% confidence. This pothole appears to be relatively shallow and small in size. While it may cause slight discomfort to vehicle occupants, it poses minimal risk to vehicle integrity. Recommended action: Monitor for expansion and schedule routine maintenance.`,
            Medium: `A moderate pothole has been identified with ${confidence}% confidence. Based on the detected dimensions, this issue could potentially cause discomfort to drivers and may lead to minor vehicle damage if driven over at high speeds. Recommended action: Report to local authorities for scheduled repair within 2-4 weeks.`,
            High: `A significant road hazard has been detected with ${confidence}% confidence. This pothole shows characteristics of severe road damage that could pose risks to vehicle suspension, tires, and overall road safety. Recommended action: Immediate reporting to city authorities is advised. Temporary warning signage may be necessary.`,
        }
        return explanations[severity]
    }

    return (
        <main className="upload-section">
            <div className="container upload-container">
                <div className="upload-header animate-fadeIn">
                    <h1>Detect Road Issues</h1>
                    <p className="mt-md" style={{ fontSize: '1.1rem' }}>
                        Upload a road image and let our AI analyze it for potholes and damage.
                    </p>
                </div>

                {!uploadedImage ? (
                    <div
                        className={`upload-zone animate-fadeInUp ${isDragOver ? 'dragover' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-zone-icon">
                            <Upload size={36} />
                        </div>
                        <h3 className="upload-zone-title">Drop your image here</h3>
                        <p className="upload-zone-subtitle">
                            or click to browse • Supports JPG, PNG, WEBP
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="upload-input"
                        />

                        <div className="flex gap-md justify-center mt-xl" style={{ flexWrap: 'wrap' }}>
                            <div className="badge badge-gold">
                                <ImageIcon size={14} />
                                <span>JPG/PNG</span>
                            </div>
                            <div className="badge badge-gold">
                                <Camera size={14} />
                                <span>Camera</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-scaleIn">
                        <div className="card upload-preview">
                            <img
                                src={uploadedImage}
                                alt="Uploaded road"
                                className="upload-preview-image"
                            />
                        </div>

                        {!isAnalyzing ? (
                            <div className="upload-preview-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={clearImage}
                                >
                                    <RefreshCw size={18} />
                                    Change Image
                                </button>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={simulateAnalysis}
                                >
                                    <Cpu size={20} />
                                    Analyze Image
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="analysis-loading card mt-xl">
                                <div className="analysis-loading-icon">
                                    <div className="analysis-loading-circle"></div>
                                    <div className="analysis-loading-inner">
                                        <Cpu size={28} />
                                    </div>
                                </div>
                                <h3>Analyzing Image...</h3>
                                <p className="mt-sm" style={{ color: 'var(--color-text-light)' }}>
                                    YOLOv8 is scanning for road damage
                                </p>
                                <div className="progress-bar mt-lg" style={{ maxWidth: '300px', margin: '0 auto' }}>
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${Math.min(analysisProgress, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="mt-md" style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                                    {analysisProgress < 30 && 'Loading model...'}
                                    {analysisProgress >= 30 && analysisProgress < 60 && 'Detecting objects...'}
                                    {analysisProgress >= 60 && analysisProgress < 90 && 'Analyzing severity...'}
                                    {analysisProgress >= 90 && 'Generating report...'}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tips Section */}
                {!uploadedImage && (
                    <div className="mt-2xl animate-fadeInUp delay-200">
                        <h4 className="text-center mb-lg">Tips for Best Results</h4>
                        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <Camera size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Take photos in good lighting conditions</p>
                            </div>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <ImageIcon size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Capture the full pothole in frame</p>
                            </div>
                            <div className="card" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
                                <Cpu size={24} className="text-gold mb-sm" style={{ margin: '0 auto var(--space-sm)' }} />
                                <p style={{ fontSize: '0.9rem' }}>Higher resolution = better detection</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Detect
