import React from "react";
import {
  UserOutlined,
  ScheduleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Spin, Flex } from "antd";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ROUTES } from "../../const/routes";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const SideMenu: React.FC = () => {
  const location = useLocation();
  const { loading, data: profile } = useSelector(
    (state: RootState) => state.profile
  );

  if (loading) {
    return (
      <Sider theme="light" collapsedWidth="0">
        <Flex align="center" justify="center" style={{ height: "100vh" }}>
          <Spin size="small" />
        </Flex>
      </Sider>
    );
  }

  const hasUserManagementAccess = profile?.roles.some((role) => {
    return ["ADMIN", "MODERATOR"].includes(role);
  });

  const items: MenuItem[] = [
    {
      key: ROUTES.APP_PROFILE,
      label: <Link to={"profile"}>Профиль</Link>,
      icon: React.createElement(ScheduleOutlined),
    },
    {
      key: ROUTES.APP_TASKS,
      label: <Link to={"tasks"}>Список задач</Link>,
      icon: React.createElement(UserOutlined),
    },
  ];

  if (hasUserManagementAccess) {
    items.push({
      key: ROUTES.APP_USERS,
      label: <Link to="users">Пользователи</Link>,
      icon: React.createElement(TeamOutlined),
    });
  }

  return (
    <Sider breakpoint="xxl" collapsedWidth="0" theme="light">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        theme="dark"
        style={{ height: "100%" }}
      />
    </Sider>
  );
};

export default SideMenu;
