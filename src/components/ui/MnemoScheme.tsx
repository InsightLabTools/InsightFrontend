import React from "react";

import { Card, FloatButton } from "antd";
import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { ReceivedData, StartingParam } from "../../utils/Serial";
import WatchedData from "./WatchedData";
import { Rnd } from "react-rnd";
import InputParams from "./InputParams";
import DataPlot from "./DataPlot";

interface WatchedDataListProps {
    watchedData: ReceivedData[];
    startingParams: StartingParam[];
    onUpdateParam: (data: StartingParam) => void;
    onCreateParam: () => void;
    onDeleteParam: (id: string) => void;
    plotData: any;
}

const MnemoScheme = ({
    watchedData,
    startingParams,
    onCreateParam,
    onUpdateParam,
    onDeleteParam,
    plotData,
}: WatchedDataListProps) => {
    return (
        <>
            <Card
                title={"Отслеживаемые значения"}
                style={{
                    backgroundColor: "#F1EFEF",
                }}
            >
                <div style={{ width: "100%", height: "70vh" }}>
                    {watchedData.map((item) => (
                        <Rnd
                            key={item.name}
                            default={{ x: 0, y: 0, width: 200, height: 100 }}
                            minWidth={200}
                            minHeight={200}
                            dragGrid={[25, 25]}
                            resizeGrid={[50, 50]}
                            bounds={"parent"}
                        >
                            <WatchedData data={item} />
                        </Rnd>
                    ))}
                    {startingParams.map((item) => (
                        <Rnd
                            key={item.id}
                            default={{ x: 0, y: 0, width: 200, height: 100 }}
                            minWidth={200}
                            minHeight={200}
                            dragGrid={[25, 25]}
                            resizeGrid={[50, 50]}
                            bounds={"parent"}
                        >
                            <InputParams
                                onUpdate={onUpdateParam}
                                onDelete={onDeleteParam}
                                data={item}
                            />
                        </Rnd>
                    ))}

                    {/* <Rnd
                        default={{ x: 0, y: 0, width: 200, height: 100 }}
                        minWidth={200}
                        minHeight={200}
                        dragGrid={[25, 25]}
                        resizeGrid={[50, 50]}
                        bounds={"parent"}
                        style={{ border: "1px solid black" }}
                    >
                        <DataPlot data={plotData} />
                    </Rnd> */}
                </div>
            </Card>

            <FloatButton.Group shape="square">
                <FloatButton
                    icon={<QuestionCircleOutlined />}
                    tooltip={<div>Добавить график</div>}
                />
                <FloatButton
                    icon={<SyncOutlined />}
                    onClick={onCreateParam}
                    tooltip={<div>Добавить параметр</div>}
                />
            </FloatButton.Group>
        </>
    );
};

export default MnemoScheme;
