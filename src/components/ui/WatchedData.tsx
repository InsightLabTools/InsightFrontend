import React from "react";
import { ReceivedData } from "../../utils/Serial";
import { PushpinOutlined } from "@ant-design/icons";
import { Card } from "antd";

interface WatchedDataProps {
    data: ReceivedData;
}

const WatchedData = ({ data }: WatchedDataProps) => {
    return (
        <Card
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "greenyellow",
            }}
        >
            <PushpinOutlined /> <span>{data.name}</span>:
            <span>{data.value}</span>
        </Card>
    );
};

export default WatchedData;
