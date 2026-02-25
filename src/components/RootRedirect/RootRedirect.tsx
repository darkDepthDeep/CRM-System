import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin, Flex } from "antd";
import type { RootState } from "../../store";
import { ROUTES } from "../../const/routes";

const RootRedirect = () => {
  const { isAuthenticated, authChecked } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!authChecked) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return isAuthenticated ? (
    <Navigate to={ROUTES.APP_TASKS} replace />
  ) : (
    <Navigate to={ROUTES.AUTH} replace></Navigate>
  );
};

export default RootRedirect;
