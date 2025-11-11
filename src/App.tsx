import { Provider } from 'react-redux';
import { store } from './store'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useSelector } from 'react-redux';
import { Spin, Flex } from 'antd';
import type { RootState } from './store';

import SideMenu from "./components/SideMenu/SideMenu";
import TodoListPage from "./pages/TodoListPage";
import Profile from "./components/Profile/Profile";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import AuthForm from "./components/AuthForm/AuthForm";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AppInitalizer from './components/AppInitializer/AppInitializer';
import "./App.css";

const RootRedirect = () => {
  const { isAuthenticated, authChecked } = useSelector((state: RootState) => state.auth);

  if (!authChecked) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    )
  }

  return isAuthenticated ? (
    <Navigate to="/app/profile" replace/>
  ) : (
    <Navigate to="/auth" replace></Navigate>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitalizer />
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/auth" element={<AuthForm />}/>
          <Route path="/registration" element={<RegistrationForm />}/>

          <Route path="/app" element={<SideMenu />}>
            <Route path="tasks" element={
              <ProtectedRoute>
                <TodoListPage/>
              </ProtectedRoute> } 
              />

            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>}
              />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
