import { BrowserRouter, Routes, Route } from "react-router";

import SideMenu from "./components/SideMenu/SideMenu";
import TodoListPage from "./pages/TodoListPage";
import Profile from "./components/Profile/Profile";
import "./App.css";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideMenu />}>
          <Route index element={<TodoListPage />} />
          <Route path='/profile' element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
