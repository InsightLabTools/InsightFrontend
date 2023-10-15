import React from "react";
import { ReceivedData } from "../../utils/Serial";
import { PushpinOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";

interface WatchedDataProps {
    data: ReceivedData;
}

const WatchedData = ({ data }: WatchedDataProps) => {
    return (
        <Card
            bordered={false}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#468B97",
                color: "white",
            }}
        >
            <Typography.Title style={{ color: "white" }} level={3}>
                {data.name}
            </Typography.Title>
            <span style={{ fontSize: "2vw" }}>{data.value}</span>
        </Card>
    );
};

export default WatchedData;
