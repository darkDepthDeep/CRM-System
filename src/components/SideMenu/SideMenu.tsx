import React from 'react';
import { UserOutlined, ScheduleOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
    key: "/app/profile",
    label: <Link to={"profile"}>Профиль</Link>,
    icon: React.createElement(ScheduleOutlined),
  },
  {
    key: "/app/tasks",
    label: <Link to={"tasks"}>Список задач</Link>,
    icon: React.createElement(UserOutlined),
  }
];

const SideMenu: React.FC = () => {
    const location = useLocation();

    return (
    <Sider
        breakpoint="xxl"
        collapsedWidth="0"
        theme="light"
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          theme="dark"
          style={{height: '100vh'}}
        />
      </Sider>
    )
}

export default SideMenu;