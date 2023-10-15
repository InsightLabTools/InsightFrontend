import React from "react";
import { Button, Card, Space } from "antd";
import { PlayCircleFilled, StopFilled } from "@ant-design/icons";

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
        <Card title={"Управление устройством"}>
            <Space wrap direction="vertical">
                <Button onClick={onSelectPort} type="primary">
                    Выбрать порт
                </Button>
                <Button onClick={onStart} type="dashed">
                    <PlayCircleFilled /> Старт
                </Button>
                <Button onClick={onStop} type="dashed">
                    <StopFilled /> Стоп
                </Button>
            </Space>
        </Card>
    );
};

export default SerialControlButtons;
