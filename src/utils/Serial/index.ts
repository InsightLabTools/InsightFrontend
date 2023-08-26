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

export { LineBreakTransformer };
