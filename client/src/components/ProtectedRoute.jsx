import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect to login if not authenticated
const ProtectedRoute = ({ children, role }) => {
    const { user, token } = useSelector(state => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
