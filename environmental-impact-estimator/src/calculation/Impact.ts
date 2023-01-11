export class Impact {
  private readonly _kWh: number;
  private readonly _gC02eq: number;
  private readonly _children: Map<string, Impact>;

  constructor(kWh: number = 0, gC02eq: number = 0) {
    this._kWh = kWh;
    this._gC02eq = gC02eq;
    this._children = new Map<string, Impact>();
  }

  get kWh(): number {
    if (this._kWh !== 0) {
      return this._kWh;
    } else {
      let sum = 0;
      for (let value of this._children.values()) {
        if (value) {
          sum += value._kWh;
        }
      }
      return sum;
    }
  }

  get gC02eq(): number {
    if (this._gC02eq !== 0) {
      return this._gC02eq;
    } else {
      let sum = 0;
      for (let value of this._children.values()) {
        if (value) {
          sum += value._gC02eq;
        }
      }
      return sum;
    }
  }

  add(keyAndImpact: [string, Impact]): void {
    if (this._kWh === 0 && this._gC02eq == 0) {
      this._children.set(keyAndImpact[0], keyAndImpact[1]);
    } else {
      throw new Error("can not add to leaf impact");
    }
  }

  print(key: string, parentKWh: number = 0, parentGC02eq: number = 0): string {
    let lines = [];
    let childKWhPercentage = parentKWh === 0 ? 1 : this.kWh / parentKWh;
    let childGC02eqPercentage = parentGC02eq === 0 ? 1 : this.gC02eq / parentGC02eq;
    lines.push(`${key},${this.kWh},${childKWhPercentage},${this.gC02eq},${childGC02eqPercentage}`);
    for (let [childKey, value] of this._children) {
      if (value) {
        lines.push(value.print(`${key} > ${childKey}`, this.kWh, this.gC02eq));
      }
    }
    return lines.join("\n");
  }

  get(key: string) {
    return this._children.get(key);
  }
}
