import { Link } from 'react-router-dom'
import { Scan, Github, Twitter, Linkedin } from 'lucide-react'

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <div className="footer-logo-icon">
                        <Scan size={18} />
                    </div>
                    <span>RoadScan AI</span>
                </div>

                <ul className="footer-links">
                    <li><Link to="/" className="footer-link">Home</Link></li>
                    <li><Link to="/detect" className="footer-link">Detect</Link></li>
                    <li><a href="#about" className="footer-link">About</a></li>
                    <li><a href="#contact" className="footer-link">Contact</a></li>
                </ul>

                <p className="footer-copyright">
                    © 2026 RoadScan AI. Built for Hackathon.
                </p>
            </div>
        </footer>
    )
}

export default Footer
