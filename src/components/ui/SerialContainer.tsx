import React, { useState, useEffect } from "react";
import SerialPortUI from "./SerialPortUI";

const SerialContainer = () => {
  const [canUseSerial] = useState(() => "serial" in navigator);
  const [serialData, setSerialData] = useState<string>("");

  const handleSerialData = (data: string) => {
    setSerialData(data);
    //console.log(data);
  };

  return (
    <div>
      <SerialPortUI
        canUseSerial={canUseSerial}
        initialParams={""}
        onData={handleSerialData}
      />
      <p>{serialData}</p>
    </div>
  );
};

export default SerialContainer;
