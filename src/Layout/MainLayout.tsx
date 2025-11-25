import React from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import { Layout } from "antd";
import { Outlet } from "react-router";
import { theme } from 'antd';
import AppInitalizer from "../components/AppInitializer/AppInitializer";

const { Content } = Layout;

const MainLayout: React.FC = () => {

const {
    token: { colorBgContainer },
} = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
            <Content style={{ 
                margin: '0', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: colorBgContainer,
            }}>
                <AppInitalizer />
                <Outlet />
            </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;