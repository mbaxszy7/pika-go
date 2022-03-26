export class Project {
  constructor(private type: string, private name: string) {}
  public getType(): string {
    return this.type;
  }
  public getName(): string {
    return this.name;
  }
}
