import React from "react";
import "./App.css";
import { Layout, ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import HeaderLayout from "./components/ui/HeaderLayout";

const { Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 15,
          colorPrimary: "#5C8984",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderLayout />
        <Content style={{ margin: 32 }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Content>
        <Footer>
          <span>Разработчик: Хорошевич Павел</span>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
