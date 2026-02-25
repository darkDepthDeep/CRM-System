import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import {Spin, Flex} from 'antd';
import type { RootState } from '../../store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated, authChecked} = useSelector((state: RootState) => state.auth)

    if (!authChecked) {
        return (
            <Flex align="center" justify="center" style={{height: "100vh"}}>
                <Spin size="large"/>
            </Flex>
        );
    }

    if (isAuthenticated) {
        return children ? <>{children}</> : <Outlet />
    }

    return <Navigate to="/auth" replace ></Navigate>
}

export default ProtectedRoute