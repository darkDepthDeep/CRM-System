import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../const/routes";

import TodoListPage from "../pages/TodoListPage";
import Profile from "../components/Profile/Profile";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import AuthForm from "../components/AuthForm/AuthForm";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import UserProfileEditPage from "../pages/UserProfileEditPage";
import UsersPage from "../pages/UserPage";
import UserManagementRoute from "../components/UserManagementRoute/UserManagementRoute";
import RootRedirect from "../components/RootRedirect/RootRedirect";

const AppRouter = () => {
  return (
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
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <UserManagementRoute>
                <UsersPage />
              </UserManagementRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="users/:id/edit"
          element={
            <ProtectedRoute>
              <UserManagementRoute>
                <UserProfileEditPage />
              </UserManagementRoute>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
