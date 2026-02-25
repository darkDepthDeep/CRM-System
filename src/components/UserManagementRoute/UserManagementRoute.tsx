import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin, Flex } from "antd";
import type { RootState } from "../../store";
import { ROUTES } from "../../const/routes";
import type { ReactNode } from "react";

interface UserManagementRouteProps {
  children: ReactNode;
}

const UserManagementRoute: React.FC<UserManagementRouteProps> = ({
  children,
}) => {
  const { data: profile, checked } = useSelector(
    (state: RootState) => state.profile
  );

  if (!checked) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  const hasAccess = profile?.roles.some((role) => {
    return ["ADMIN", "MODERATOR"].includes(role);
  });

  if (!profile || !hasAccess) {
    return <Navigate to={ROUTES.APP_TASKS} replace />;
  }

  return <>{children}</>;
};
export default UserManagementRoute;
