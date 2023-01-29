import React, { useEffect, useState } from 'react'
import {
  AndroidOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import hinh from '../../assets/image/check-list.png'
import { Link, Outlet } from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import Loadding from 'login/component/Loadding';
import { fetchGetAllProjectAction, fetchTestTokenActtion } from 'project/redux/action';
import { useDispatch } from 'react-redux';
const { Header, Sider, Content } = Layout;
const ProjectManager = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchTestTokenActtion)
    dispatch(fetchGetAllProjectAction)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  return (
    <div>
      <DrawerComponent />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width="220px" style={{ height: window.innerHeight }} >
          <div className="logo text-white text-center py-5" >
            <img width={"40%"} src={hinh} alt='logo' ></img>
          </div>
          <Menu

            className='font-semibold '
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <AppstoreAddOutlined />,
                label: <Link to={'/projectmanager'} >Project Management</Link>,
              },
              {
                key: '2',
                icon: <FileAddOutlined />,
                label: <Link to={'/projectmanager/createproject'} >Create Project</Link>,
              },
              {
                key: '3',
                icon: <AndroidOutlined />,
                label: 'User Profile',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {loading ? <Loadding /> : <Outlet />}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default ProjectManager
