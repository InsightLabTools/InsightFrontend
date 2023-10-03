import React from "react";

import { Card, FloatButton } from "antd";
import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { ReceivedData } from "../../utils/Serial";
import WatchedData from "./WatchedData";
import { Rnd } from "react-rnd";

interface WatchedDataListProps {
    watchedDataArray: ReceivedData[];
}

const WatchedDataList = ({ watchedDataArray }: WatchedDataListProps) => {
    return (
        <>
            <Card title={"Отслеживаемые значения"}>
                <div style={{ width: "100%", height: "70vh" }}>
                    {watchedDataArray.map((item) => (
                        <Rnd
                            key={item.name}
                            default={{ x: 0, y: 0, width: 200, height: 100 }}
                            minWidth={200}
                            minHeight={100}
                            dragGrid={[10, 10]}
                            resizeGrid={[50, 50]}
                            bounds={"parent"}
                        >
                            <WatchedData data={item} />
                        </Rnd>
                    ))}
                </div>
            </Card>

            <FloatButton.Group shape="square">
                <FloatButton
                    icon={<QuestionCircleOutlined />}
                    tooltip={<div>Добавить график</div>}
                />
                <FloatButton />
                <FloatButton
                    icon={<SyncOutlined />}
                    tooltip={<div>Добавить параметр</div>}
                />
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
        </>
    );
};

export default WatchedDataList;
