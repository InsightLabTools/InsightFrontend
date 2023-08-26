import React from "react";
import { Layout, ConfigProvider, Menu, FloatButton } from "antd";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSelector from "./LangSelector";

const { Header } = Layout;

const HeaderLayout = () => {
  const { t } = useTranslation();
  return (
    <Header
      style={{
        display: "inline-flex",
        gap: "12px",
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "#fea458",
      }}
    >
      <NavLink to="/">
        <span
          style={{
            display: "inline-block",
            height: "100%",
            verticalAlign: "middle",
          }}
        >
          ИнсайтЛаб
        </span>
      </NavLink>
      <Menu
        mode={"horizontal"}
        defaultSelectedKeys={["1"]}
        theme={"dark"}
        style={{ flex: "auto", backgroundColor: "#fea458" }}
      >
        <Menu.Item key={1}>
          <NavLink to="/">{t("ui.menuMainPage")}</NavLink>
        </Menu.Item>
      </Menu>

      <LangSelector />
    </Header>
  );
};

export default HeaderLayout;
