import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState({}); // Map userId -> token
    const [registeredUsers, setRegisteredUsers] = useState(() => {
        const stored = localStorage.getItem('site_users');
        return stored ? JSON.parse(stored) : [];
    });

    // Load session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
            // Verify token "signature" (mock verification)
            try {
                const [header, payload, signature] = storedToken.split('.');
                if (signature === 'secure_mock_signature') {
                    setUser(JSON.parse(storedUser));
                } else {
                    logout();
                }
            } catch (e) {
                logout();
            }
        }
    }, []);

    const saveUsers = (users) => {
        setRegisteredUsers(users);
        localStorage.setItem('site_users', JSON.stringify(users));
    };

    const signup = (name, email, role = 'citizen') => {
        // Generate Mock Secure ID
        const userId = `CIVIC${Math.floor(1000 + Math.random() * 9000)}`;
        // Generate Secure Mock Password
        const password = Math.random().toString(36).slice(-8).toUpperCase() + Math.random().toString(36).slice(-4).toUpperCase(); // Stronger mock password
        // Mock Hash
        const passwordHash = btoa(password).split('').reverse().join('');

        const newUser = {
            id: userId,
            passwordHash, // Store hash, not plain text
            name,
            email,
            role,
            submissions: [], // Array of submission objects
            karmaPoints: 50, // Welcome bonus
            joinedDate: new Date().toISOString()
        };

        const updatedUsers = [...registeredUsers, newUser];
        saveUsers(updatedUsers);

        return { userId, password }; // Return plain text once for display
    };

    const login = (userId, password) => {
        // Verify against hash
        const inputHash = btoa(password).split('').reverse().join('');

        const foundUser = registeredUsers.find(
            u => u.id === userId && u.passwordHash === inputHash
        );

        if (foundUser) {
            // Generate Mock JWT
            const header = btoa(JSON.stringify({ alg: "HS256", type: "JWT" }));
            const payload = btoa(JSON.stringify({ sub: foundUser.id, role: foundUser.role, exp: Date.now() + 3600000 }));
            const signature = "secure_mock_signature";
            const token = `${header}.${payload}.${signature}`;

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(foundUser));
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    };

    const addSubmission = (submissionData) => {
        if (!user) return;

        const newSubmission = {
            id: Date.now().toString().slice(-6),
            timestamp: new Date().toISOString(),
            status: 'Pending', // Pending, In Progress, Resolved
            pointsAwarded: 100,
            ...submissionData
        };

        const updatedUser = {
            ...user,
            submissions: [newSubmission, ...user.submissions],
            karmaPoints: user.karmaPoints + 100
        };

        updateUserRecord(updatedUser);
    };

    const resolveSubmission = (submissionId) => {
        if (!user) return;

        const updatedSubmissions = user.submissions.map(sub => {
            if (sub.id === submissionId && sub.status !== 'Resolved') {
                return {
                    ...sub,
                    status: 'Resolved',
                    resolvedAt: new Date().toISOString()
                };
            }
            return sub;
        });

        const updatedUser = { ...user, submissions: updatedSubmissions };
        updateUserRecord(updatedUser);
    };

    const updateUserRecord = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user_data', JSON.stringify(updatedUser));

        const updatedRegistry = registeredUsers.map(u =>
            u.id === updatedUser.id ? updatedUser : u
        );
        saveUsers(updatedRegistry);
    };

    const getUserSubmissions = () => {
        return user ? user.submissions : [];
    };

    const getStats = () => {
        if (!user || !user.submissions) return { active: 0, completed: 0, categories: 0, total: 0, avgResolutionTime: '0h' };

        const total = user.submissions.length;
        const active = user.submissions.filter(s => s.status !== 'Resolved').length;
        const completed = user.submissions.filter(s => s.status === 'Resolved').length;

        // Unique categories
        const categories = new Set(user.submissions.map(s => s.issueType || 'General')).size;

        // Calculate Average Resolution Time
        let totalTimeMs = 0;
        let resolvedCount = 0;

        user.submissions.forEach(s => {
            if (s.status === 'Resolved' && s.resolvedAt && s.timestamp) {
                const start = new Date(s.timestamp);
                const end = new Date(s.resolvedAt);
                totalTimeMs += (end - start);
                resolvedCount++;
            }
        });

        let avgResolutionTime = 'N/A';
        if (resolvedCount > 0) {
            const avgMs = totalTimeMs / resolvedCount;
            const hours = Math.floor(avgMs / (1000 * 60 * 60));
            const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));
            avgResolutionTime = `${hours}h ${minutes}m`;
        }

        return {
            active,
            completed,
            categories,
            total,
            avgResolutionTime
        };
    };

    const value = {
        user,
        signup,
        login,
        logout,
        addSubmission,
        resolveSubmission,
        getUserSubmissions,
        getStats
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
