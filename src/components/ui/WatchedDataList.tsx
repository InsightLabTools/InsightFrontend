import React from "react";
import { Card, List } from "antd";
import { ReceivedData } from "../../utils/Serial";
import WatchedData from "./WatchedData";
import { Rnd } from "react-rnd";

interface WatchedDataListProps {
    watchedDataArray: ReceivedData[];
}

const WatchedDataList = ({ watchedDataArray }: WatchedDataListProps) => {
    return (
        <Card title={"Отслеживаемые значения"}>
            <div style={{ width: "100%", height: "70vh" }}>
                {watchedDataArray.map((item) => (
                    <Rnd
                        key={item.name}
                        default={{ x: 0, y: 0, width: 200, height: 100 }}
                        minWidth={200}
                        minHeight={100}
                        dragGrid={[25, 25]}
                        resizeGrid={[50, 50]}
                        bounds={"parent"}
                    >
                        <WatchedData data={item} />
                    </Rnd>
                ))}
            </div>
        </Card>
    );
};

export default WatchedDataList;
