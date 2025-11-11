import React from 'react';
import { UserOutlined, ScheduleOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

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

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content style={{ 
          margin: '0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: colorBgContainer,
          }}>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
    )
}

export default SideMenu;