import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import AccessDenied from '../pages/access/accessDenied';

interface Props {}

export const ProtectedRoute: React.FC<Props> = () => {
    let { isLoggedIn } = useAppSelector((state) => state.data.auth);

    if (isLoggedIn) {
        return <AccessDenied />;
    }
    if (isLoggedIn) {
        return <Outlet />;
    }
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return null;
};