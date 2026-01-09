import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detect from './pages/Detect'
import Results from './pages/Results'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
    // Shared state for detection flow
    const [uploadedImage, setUploadedImage] = useState(null)
    const [analysisResults, setAnalysisResults] = useState(null)
    const [location, setLocation] = useState(null)

    // Reset all state
    const resetAnalysis = () => {
        setUploadedImage(null)
        setAnalysisResults(null)
        setLocation(null)
    }

    return (
        <AuthProvider>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/detect"
                        element={
                            <Detect
                                uploadedImage={uploadedImage}
                                setUploadedImage={setUploadedImage}
                                setAnalysisResults={setAnalysisResults}
                            />
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <Results
                                uploadedImage={uploadedImage}
                                analysisResults={analysisResults}
                                location={location}
                                setLocation={setLocation}
                                resetAnalysis={resetAnalysis}
                            />
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Dashboard />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App
