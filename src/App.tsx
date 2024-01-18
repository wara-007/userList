import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader } from "./components/Loader";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import AddUser from "./pages/AddUser";

const { Header, Content, Footer } = Layout;


const App = () => {
  return (
    <>
      <Loader showLoading />
      <Router>
        {/* <Navbar /> */}
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
          </Header>
          <Content style={{ padding: '0 48px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Routes>
              <Route path="/" element={<AddUser />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </>
  );
};

export default App;
