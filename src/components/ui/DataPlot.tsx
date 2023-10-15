import React from "react";

import {
    VictoryChart,
    VictoryTheme,
    VictoryLine,
    VictoryZoomContainer,
} from "victory";

interface DataPlotProps {
    data: any;
}

const DataPlot = ({ data }: DataPlotProps) => {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            //containerComponent={<VictoryZoomContainer zoomDimension="x" />}
        >
            <VictoryLine
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" },
                }}
                data={data.slice(-50)}
                interpolation={"cardinal"}
            />
        </VictoryChart>
    );
};

export default DataPlot;
