import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Scan } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const { user } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path) => location.pathname === path

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/home" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Scan size={22} />
                    </div>
                    <span>RoadScan AI</span>
                </Link>

                <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <Link
                            to="/home"
                            className={`navbar-link ${isActive('/home') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/detect"
                            className={`navbar-link ${isActive('/detect') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Detect
                        </Link>
                    </li>
                    {!user ? (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="btn btn-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link
                                to="/profile"
                                className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>
                        </li>
                    )}
                </ul>

                <button
                    className="navbar-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
