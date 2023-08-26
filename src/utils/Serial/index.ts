class LineBreakTransformer {
  container: string;
  constructor() {
    this.container = "";
  }

  transform(chunk: string, controller: any) {
    this.container += chunk;
    const lines = this.container.split("\r\n");
    this.container = lines.pop() ?? "";
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller: any) {
    controller.enqueue(this.container);
  }
}

export type ReceivedData = {
  type: "pin" | "var";
  name: string;
  value: number;
};

export type StartingParam = {
  name: string;
  value: number;
};

const prepareStartingParams = (data: StartingParam[]) => {
  const values = data.reduce((previousValue, currentParam) => {
    return previousValue + `${currentParam.name}:${currentParam.value}|`;
  }, "");

  return `p<${values};`;
};

const parseReceivedData = (data: string): ReceivedData[] => {
  const result: ReceivedData[] = [];

  if (data.length < 2) return [];

  const dataPart = data.slice(2);
  const dataList = dataPart.split("|");
  dataList.forEach((entry) => {
    const entryFields = entry.split(":");
    if (entryFields.length === 3) {
      try {
        result.push({
          type: entryFields[0] as any,
          name: entryFields[1],
          value: Number(entryFields[2]),
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  return result;
};

export { LineBreakTransformer, parseReceivedData, prepareStartingParams };
