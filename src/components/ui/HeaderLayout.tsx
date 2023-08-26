import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
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
        backgroundColor: "#5C8984",
      }}
    >
      <NavLink to="/">
        <span
          style={{
            height: "100%",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          ИнсайтЛаб
        </span>
      </NavLink>
      <Menu
        mode={"horizontal"}
        defaultSelectedKeys={["1"]}
        theme={"dark"}
        style={{ flex: "auto", backgroundColor: "#5C8984" }}
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
