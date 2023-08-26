import React from "react";
import { ReceivedData } from "../../utils/Serial";
import { Card } from "antd";
import { PushpinOutlined } from "@ant-design/icons";

interface WatchedDataProps {
  data: ReceivedData;
}

const WatchedData = ({ data }: WatchedDataProps) => {
  return (
    <Card title={data.name} bordered={false} extra={<PushpinOutlined />}>
      <p>{data.value}</p>
    </Card>
  );
};

export default WatchedData;
