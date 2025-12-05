import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, Flex } from "antd";
import type { RootState } from "./store";
import { ROUTES } from "./const/routes";

import TodoListPage from "./pages/TodoListPage";
import Profile from "./components/Profile/Profile";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import AuthForm from "./components/AuthForm/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AppInitalizer from "./components/AppInitializer/AppInitializer";
import AuthLayout from "./Layout/AuthLayout";
import MainLayout from "./Layout/MainLayout";
import "./App.css";

const RootRedirect = () => {
  const { isAuthenticated, authChecked } = useSelector(
    (state: RootState) => state.auth
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

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitalizer />
        <Routes>
          <Route path={ROUTES.ROOT} element={<RootRedirect />} />

          <Route element={<AuthLayout />}>
            <Route path={ROUTES.AUTH} element={<AuthForm />} />
            <Route path={ROUTES.REGISTRATION} element={<RegistrationForm />} />
          </Route>

          <Route path={ROUTES.APP_ROOT} element={<MainLayout />}>
            <Route
              path="tasks"
              element={
                <ProtectedRoute>
                  <TodoListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
