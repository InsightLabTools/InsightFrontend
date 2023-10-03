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
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFB84C",
                color: "white",
            }}
        >
            <Paragraph editable={{ onChange: setName }}>{name}</Paragraph>

            <InputNumber
                defaultValue={0}
                onChange={(value) => {
                    setValue(value ?? 0);
                }}
            />

            <Button onClick={() => onDelete(data.id)}>x</Button>
        </Card>
    );
};

export default InputParams;
