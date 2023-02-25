export class Impact {
  private readonly _gC02eq: number;
  private readonly _children: Map<string, Impact>;

  constructor(gC02eq: number = 0) {
    this._gC02eq = gC02eq;
    this._children = new Map<string, Impact>();
  }

  get gC02eq(): number {
    if (this._gC02eq !== 0) {
      return this._gC02eq;
    } else {
      let sum = 0;
      for (let value of this._children.values()) {
        if (value) {
          sum += value.gC02eq;
        }
      }
      return sum;
    }
  }

  add(key: string, impact: Impact): void {
    if (this._gC02eq === 0) {
      this._children.set(key, impact);
    } else {
      throw new Error("can not add to leaf impact");
    }
  }

  print(key: string, parentGC02eq: number = 0): string {
    let lines = [];
    let childPercentage = parentGC02eq === 0 ? 1 : this.gC02eq / parentGC02eq;
    lines.push(`${key},${this.gC02eq},${childPercentage}`);
    for (let [childKey, value] of this._children) {
      if (value) {
        lines.push(value.print(`${key} > ${childKey}`, this.gC02eq));
      }
    }
    return lines.join("\n");
  }

  get(key: string) {
    return this._children.get(key);
  }
}
