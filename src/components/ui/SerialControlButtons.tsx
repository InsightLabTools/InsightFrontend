import React from "react";
import { Button, Space } from "antd";

interface SerialControlButtonsProps {
  onSelectPort: () => void;
  onStart: () => void;
  onStop: () => void;
}

const SerialControlButtons = ({
  onSelectPort,
  onStart,
  onStop,
}: SerialControlButtonsProps) => {
  return (
    <Space wrap>
      <Button onClick={onSelectPort} type="primary">
        Выбрать порт
      </Button>
      <Button onClick={onStart} type="dashed">
        Старт
      </Button>
      <Button onClick={onStop} type="dashed">
        Стоп
      </Button>
    </Space>
  );
};

export default SerialControlButtons;
