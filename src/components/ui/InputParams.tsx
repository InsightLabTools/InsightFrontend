import React, { useState, useEffect } from "react";
import { Card, Typography, InputNumber, Button } from "antd";
import { StartingParam } from "../../utils/Serial";

interface inputParamsProps {
    data: StartingParam;
    onUpdate: (data: StartingParam) => void;
    onDelete: (id: string) => void;
}

const { Paragraph } = Typography;

const InputParams = ({ data, onUpdate, onDelete }: inputParamsProps) => {
    const [name, setName] = useState(data.name);
    const [value, setValue] = useState(data.value);

    useEffect(() => {
        onUpdate({ id: data.id, name: name, value: value });
    }, [name, value]);

    return (
        <Card
            bordered={false}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFB84C",
                color: "white",
            }}
        >
            <Typography.Title
                style={{ color: "white" }}
                level={3}
                editable={{ onChange: setName }}
            >
                {name}
            </Typography.Title>

            <InputNumber
                style={{ fontSize: "2vw", width: "100%" }}
                defaultValue={0}
                onChange={(value) => {
                    setValue(value ?? 0);
                }}
            />

            <p>
                <a onClick={() => onDelete(data.id)}>Удалить</a>
            </p>
        </Card>
    );
};

export default InputParams;
