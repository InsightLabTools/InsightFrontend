/**
 * Временный компонент. Нужен для смены языка интерфейса.
 */

import React from "react";
import { Select, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const LangSelector = () => {
  const { t, i18n } = useTranslation();
  const handleLangChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <div>
      <Space>
        <GlobalOutlined style={{ color: "#fff", fontSize: 20 }} />
        <Select
          defaultValue="ru"
          style={{ width: 130 }}
          onChange={handleLangChange}
          options={[
            { value: "ru", label: "Русский" },
            { value: "be", label: "Беларуская" },
          ]}
        />
      </Space>
    </div>
  );
};

export default LangSelector;
